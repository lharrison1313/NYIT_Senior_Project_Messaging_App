import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, ScrollView, Alert} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import {addUserToGroup,getCurrentUserID, createGroupRequest, deleteGroup, removeUserFromGroup} from "../../api/MessagingAppAPI";
import Icon from 'react-native-vector-icons/FontAwesome';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import {AppStyles, color_b, color_c} from "../styles/AppStyles"
import OvalButton from "../components/OvalButton"




export default class GroupInfoScreen extends Component{
    
    constructor(props) {
        super(props)
        this.state = {
        }
        this.gid = this.props.route.params.id;
        this.info = this.props.route.params.info;
        this.date = this.props.route.params.date;
        
    }

    handlejoin = () => {
        addUserToGroup(getCurrentUserID(),this.gid)
        this.props.navigation.navigate('Message',{id: this.gid});
    }

    handleSendRequest = () =>{
        createGroupRequest(getCurrentUserID(),this.gid,this.info.GroupOwner);
    }

    handleDelete = () =>{
        Alert.alert(
            "Confirm Delete",
            "Are you sure you want to delete the group? This action is permanant.",
            [
                { text: "Cancel", style:"cancel"},
                { text: "Delete", onPress: ()=>{
                    deleteGroup(this.gid,getCurrentUserID());
                    this.props.navigation.goBack();
                } }

            ]

        )
        
    }

    handleLeave = () =>{
        Alert.alert(
            "Confirm Leave",
            "Are you sure you want to leave the group?",
            [
                { text: "Cancel", style:"cancel"},
                { text: "Leave", onPress: ()=>{
                    removeUserFromGroup(getCurrentUserID(),this.gid);
                    this.props.navigation.goBack();
                } }

            ]

        )
    }

    handleMessage = () =>{
        this.props.navigation.navigate('Message',{id: this.gid});
    }
    

    renderButtons = () =>{
        var uid = getCurrentUserID()
        var users = this.info.GroupUsers;
        if(uid == this.info.GroupOwner){
            return(
                <View>
                    <OvalButton text = "Messages" handler = {() => this.handleMessage()}/>
                    <OvalButton text = "Delete Group" handler = {() => this.handleDelete()}/>
                </View>
            );
        }
        else if(users.includes(uid)){
            return(
                <View>
                    <OvalButton text = "Messages" handler = {() => this.handleMessage()}/>
                    <OvalButton text = "Leave Group" handler = {() => this.handleLeave()}/>
                </View>
            )
        }
        else if(this.info.Private){
            return(
            <View>
                <OvalButton text = "Send a Join Request" handler = {() => this.handleSendRequest()} />
            </View>
            );
        }
        else{
            return(
                <OvalButton text = "Join Group" handler = {() => this.handlejoin()}/>
            );
        }
    }

    renderMap(){
        if(this.info.Coordinates != null){
            
            var initialCoordinates = {
                latitude: this.info.Coordinates.latitude,
                longitude: this.info.Coordinates.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            }
            
            return(
            <MapView
                provider = {PROVIDER_GOOGLE}
                style = {styles.map}
                scrollEnabled = {false}
                zoomEnabled = {false}
                zoomControlEnabled = {false}
                zoomTapEnabled = {false}
                pitchEnabled = {false}
                rotateEnabled = {false}
                initialRegion={initialCoordinates}
                
            >
                <Marker
                    coordinate = {this.info.Coordinates}
                />
            </MapView>
            )
        }
    }

    
    render() {
        return (
            <SafeAreaView style = {{flex:1}}>
            <ScrollView contentContainerStyle = {AppStyles.screen} >
                <ScrollView contentContainerStyle = {styles.content_container}>
                    <Icon name="group" size={100} color={color_c}/>
                    
                    <Text>
                        {this.info.GroupName}
                    </Text>

                    <Text>
                        {this.info.Location}
                    </Text>

                    <Text>
                        {this.date}
                    </Text>
                   
                    <Text>
                        {this.info.Interests}
                    </Text>

                    <Text>
                        {this.info.Description}
                    </Text>

                    {this.renderMap()}
                    {this.renderButtons()}
                    
                </ScrollView>

            </ScrollView>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
   
    content_container:{
        alignItems: "center", 
        justifyContent: "center",
        padding: 20
    },

    map:{
        height: 200,
        width: 300,
        marginVertical: 10
    }

})

