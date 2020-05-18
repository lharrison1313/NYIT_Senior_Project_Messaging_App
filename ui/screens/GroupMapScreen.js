import React, { Component } from 'react';
import {View, StyleSheet, Dimensions, SafeAreaView } from 'react-native';
import CircleButton from "../components/CircleButton";
import MapView,{PROVIDER_GOOGLE,Marker} from 'react-native-maps';
import GroupBar from '../components/GroupBar'
import Icon from 'react-native-vector-icons/FontAwesome';
import {getAllGroups} from "../../api/MessagingAppAPI";
import { FlatList, TextInput } from 'react-native-gesture-handler';
import Geolocation from '@react-native-community/geolocation';
import GooglePlacesButton from '../components/GooglePlacesButton';
import {AppStyles, color_a, color_b, color_c, color_e} from "../styles/AppStyles"



const currentLocationIcon =<Icon name="map-marker" size={25} color={color_a} />
const plusIcon = <Icon name="plus-circle" size={25} color={color_a} />;

export default class GroupMapScreen extends Component{

    constructor(props){
        super(props)
        this.state = {
            coordinates: {
                latitude: 40.769027,
                longitude: -73.982317,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            },
            groups: [],
        }
        
    }

    componentDidMount(){
        getAllGroups(this.retrieveGroups).then((unsub) => {this.unsubscribe = unsub})
        this.locationFocus()
        
    }

    componentWillUnmount(){
        this.unsubscribe()
    }

    locationFocus = () =>{
        Geolocation.getCurrentPosition((info) =>{
            this.setState({
                coordinates:{
                    latitude: info.coords.latitude,
                    longitude: info.coords.longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                }
            })
        } 
        );
    }

    locationSearch = (place) => {
        this.setState({
            coordinates: {
                latitude: place.location.latitude,
                longitude: place.location.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            },
        })
    }

    retrieveGroups = (groups) =>{
        var allowedGroups = []
        groups.forEach(element => {
            if(element.Info.Coordinates != null){
                allowedGroups.push(element)
            }
        });
        this.setState({
            groups: allowedGroups
        })
        
    }

    textChanged = (input) =>{
        this.setState({groups:[]})
        if(input == ""){
            this.unsubscribe()
            getAllGroups(this.retrieveGroups).then((unsub) => this.unsubscribe = unsub )
        }
        else{
            this.unsubscribe()
            getAllGroups(this.retrieveGroups,input).then((unsub) => this.unsubscribe = unsub )
        }
    }
    
    renderBar = (item) =>{
        var color = ""
        if(!item.Info.Visible){
            color = "orange"
        }
        else if(item.Info.Private){
            color = color_e   
        }
        else{
            color = color_b
        }
        var style = {
            flexDirection:'column',
            flex:1,
            padding:10,
            width: window.width,
            height:120,
            backgroundColor: color,
            borderRadius: 20
            
        }

        return(<GroupBar
            info = {item.Info}
            date = {item.Date}
            id = {item.id}
            bar_style = {style}
            navigation = {this.props.navigation}
        />)
    }


    renderMarker = (group) =>{
        //setting group color based on privacy
        var color = ""
        if(!group.Info.Visible){
            color = "orange"
        }
        else if(group.Info.Private){
            color = color_e
        }
        else{
            color = color_b
        }

        //rendering marker
        return(
            <Marker
                key = {group.id} 
                coordinate = {group.Info.Coordinates}
                onPress = {() => this.flatListRef.scrollToIndex({index: group.index, animated:true})}
                pinColor = {color}
            />
        )
    }

    render(){
        return(
            
            <SafeAreaView style={{flex:1}}>
                <View style = {AppStyles.screen}>
                    <MapView
                        style = {styles.map}
                        provider = {PROVIDER_GOOGLE}
                        initialRegion={this.state.coordinates}
                        region = {this.state.coordinates} 
                        showsUserLocation ={true}
                        showsMyLocationButton = {false}
                    >
                        {this.state.groups.map( group =>(
                            this.renderMarker(group)
                        ))}

                    </MapView>
                    
                    <FlatList
                        ref={(ref) => { this.flatListRef = ref; }}
                        style = {styles.list_container}
                        horizontal = {true}
                        data = {this.state.groups}
                        scrollEnabled = {false}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item }) => (
                            this.renderBar(item)
                        )}
                        keyExtractor = {item => item.id}
                    />

                    <View style = {styles.location_button}>
                        <GooglePlacesButton shape="circle" retrieveLocation = {this.locationSearch} />
                    </View>

                    <View style = {styles.focus_button}>
                        <CircleButton icon = {currentLocationIcon} handler={this.locationFocus}/>
                    </View>

                    <View style = {styles.new_group_button}>
                        <CircleButton icon = {plusIcon} handler={() => this.props.navigation.navigate('CreateGroup')}/>
                    </View>

                    <TextInput
                    style = {styles.search_bar}
                    onChangeText = {(input)=>{this.textChanged(input)}}
                    placeholder = {"Search"}
                    />
                    
                </View>
            </SafeAreaView>
        );
    }

}

const window = Dimensions.get('window');
const styles = StyleSheet.create({
    list_container:{
        backgroundColor: color_b,
        position: "absolute",
        height: 120,
        bottom: 5,
        borderRadius: 20,
        marginHorizontal: 2,
    },

    map:{
        flex:1
    },

    new_group_container:{
        flex:.10,
    },

    location_button:{
        position: "absolute",
        top: 10,
        right:60
    },

    search_bar:{
        backgroundColor: color_c,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        height:40,
        width: window.width-120,
        borderRadius: 30,
        top: 10,
        left: 5
    },

    new_group_button:{
        position: "absolute",
        top: 10,
        right: 5
    },

    focus_button:{
        position: "absolute",
        top: 65,
        right: 5
    }

})