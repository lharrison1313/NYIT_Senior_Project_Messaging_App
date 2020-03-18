import React, { Component } from 'react';
import {View, StyleSheet, Dimensions, TouchableOpacity, SafeAreaView } from 'react-native';
import MapView,{PROVIDER_GOOGLE,Marker, Callout} from 'react-native-maps';
import GroupBar from './GroupBar'
import Icon from 'react-native-vector-icons/FontAwesome';
import {getAllGroups,requestLocationPermission} from "../api/MessagingAppAPI";
import { FlatList, TextInput } from 'react-native-gesture-handler';
import RNGooglePlaces from 'react-native-google-places';
import Geolocation from '@react-native-community/geolocation';



const locationIcon = <Icon name="globe" size={25} color="grey" />;
const currentLocationIcon =<Icon name="map-marker" size={25} color="grey" />
const plusIcon = <Icon name="plus-circle" size={25} color="grey" />;

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

    locationSearch = () => {
        RNGooglePlaces.openAutocompleteModal()
        .then((place) => {
            console.log(place)
            this.setState({
                coordinates: {
                    latitude: place.location.latitude,
                    longitude: place.location.longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                },
            })
        })
        .catch(error => console.log(error.message)); 
    }

    retrieveGroups = (groups) =>{
        var allowedGroups = []
        groups.forEach(element => {
            if(element.Coordinates != null){
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

    render(){
        return(
            
            <SafeAreaView>
                <View style = {{flex: 1}}>
                    <MapView
                        style = {styles.map}
                        provider = {PROVIDER_GOOGLE}
                        initialRegion={this.state.coordinates}
                        region = {this.state.coordinates} 
                        showsUserLocation ={true}
                    >
                        {this.state.groups.map( group =>(
                            
                            <Marker
                                key = {group.id} 
                                coordinate = {group.Coordinates}
                                onPress = {() => this.flatListRef.scrollToIndex({index: group.index, animated:true})}
                            />
                            
                        ))}

                    </MapView>
                    
                    <FlatList
                        ref={(ref) => { this.flatListRef = ref; }}
                        style = {styles.list_container}
                        horizontal = {true}
                        data = {this.state.groups}
                        scrollEnabled = {false}
                        renderItem={({ item }) => (
                            <GroupBar
                                group_name = {item.GroupName} 
                                date = {item.Date}
                                location = {item.Location}
                                interests = {item.Interests}
                                id = {item.id}
                                bar_style = {styles.bar_container}
                                navigation = {this.props.navigation}
                            />
                        )}
                        keyExtractor = {item => item.id}
                    />

                    <TouchableOpacity 
                    style={styles.location_button}  
                    onPress={() => this.locationSearch()}>
                        {locationIcon}
                    </TouchableOpacity>

                    <TouchableOpacity 
                    style={styles.focus_button}  
                    onPress={() => this.locationFocus()}>
                        {currentLocationIcon}
                    </TouchableOpacity>

                    <TouchableOpacity 
                    style = {styles.new_group_button} 
                    onPress={() => this.props.navigation.navigate('CreateGroup')}>
                        {plusIcon}
                    </TouchableOpacity>

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
        backgroundColor: '#00BED6',
        position: "absolute",
        height: 120,
        bottom: 5,
        borderRadius: 20,
        marginHorizontal: 2,
    },

    bar_container:{
        flexDirection:'column',
        flex:1,
        padding:10,
        width: window.width,
        height:120
    },

    map:{
        flex:1
    },

    new_group_container:{
        flex:.10,
    },

    location_button:{
        backgroundColor: "#00BED6",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        height:50,
        width: 50,
        borderRadius: 25,
        top: 10,
        right:60
    },

    search_bar:{
        backgroundColor: "#dedede",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        height:50,
        width: window.width-120,
        borderRadius: 30,
        top: 10,
        left: 5
    },

    new_group_button:{
        backgroundColor: "#00BED6",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        height:50,
        width: 50,
        borderRadius: 25,
        top: 10,
        right: 5
    },

    focus_button:{
        backgroundColor: "#00BED6",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        height:50,
        width: 50,
        borderRadius: 25,
        top: 65,
        right: 5
    }

})