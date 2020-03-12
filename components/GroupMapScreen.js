import React, { Component } from 'react';
import {View, StyleSheet, Dimensions, TouchableOpacity, Text } from 'react-native';
import MapView,{PROVIDER_GOOGLE,Marker, Callout} from 'react-native-maps';
import GooglePlacesButton from './GooglePlacesButton'
import GroupBar from './GroupBar'
import {withNavigation} from "react-navigation";
import {getAllGroups} from "../api/MessagingAppAPI";
import { FlatList } from 'react-native-gesture-handler';

class GroupMapScreen extends Component{

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
    }

    componentWillUnmount(){
        this.unsubscribe()
    }

    retrieveGroups = (groups) =>{
        this.setState({
            groups: groups
        })
    }
    
    retrieveLocation = (place) =>{
        this.setState({
            coordinates:{
                latitude: place.location.latitude,
                longitude: place.location.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            }
        })
    }

    render(){
        return(
            <View style = {{flex: 1}}>
                
                <MapView
                    style = {styles.map}
                    provider = {PROVIDER_GOOGLE}
                    initialRegion={this.state.coordinates}
                    region = {this.state.coordinates} 
                >
                    {this.state.groups.map( group =>(
                        <Marker
                            key = {group.id} 
                            coordinate = {group.Coordinates}
                            onPress = {() => this.flatListRef.scrollToIndex({index: group.index, animated:true})}
                        />
                    ))}
                </MapView>

                <GooglePlacesButton button_style = {styles.location_button} retrieveLocation = {this.retrieveLocation} />
                
                <FlatList
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
                        />
                    )}
                    keyExtractor = {item => item.id}
                    ref={(ref) => { this.flatListRef = ref; }}
                />

                <TouchableOpacity 
                style = {styles.new_group_button} 
                onPress={() => this.props.navigation.navigate('CreateGroup')}>
                    <Text>Create New Group</Text>
                </TouchableOpacity>

                
                
            </View>
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
        margin: 5,
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
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 100,
        top: 10,
        left:5,
        right:5
        
    },

    new_group_button:{
        backgroundColor: "#00BED6",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 100,
        bottom: 140,
        right: 15
    }

})

export default withNavigation(GroupMapScreen)