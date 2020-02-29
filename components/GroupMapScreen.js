import React, { Component } from 'react';
import {View, StyleSheet, Dimensions, TouchableOpacity, Text } from 'react-native';
import MapView,{PROVIDER_GOOGLE,Marker} from 'react-native-maps';
import GooglePlacesButton from './GooglePlacesButton'
import {withNavigation} from "react-navigation";
import {getAllGroups} from "../api/MessagingAppAPI"

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
            groups: []
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
                <View style={{flex:.10}}>
                    <GooglePlacesButton button_style = {styles.button} retrieveLocation = {this.retrieveLocation} />
                </View>
                <MapView
                    style = {styles.map}
                    provider = {PROVIDER_GOOGLE}
                    initialRegion={this.state.coordinates}
                    region = {this.state.coordinates}
                >
                    {this.state.groups.map( group =>(
                        <Marker 
                            coordinate = {group.Coordinates}
                            title = {group.GroupName}
                        />
                    ))}
                </MapView>
                <View style={styles.new_group_container}>
                    <TouchableOpacity 
                    style = {styles.button} 
                    onPress={() => this.props.navigation.navigate('CreateGroup')}>
                        <Text>Create New Group</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

}

const window = Dimensions.get('window');
const styles = StyleSheet.create({
    map:{
        //height: window.height,
        flex:1
    },
    new_group_container:{
        flex:.10,
    },
    button:{
        flex: 1,
        backgroundColor: "grey",
        justifyContent: "center",
        alignItems: "center"
    }

})

export default withNavigation(GroupMapScreen)