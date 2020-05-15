import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, ScrollView, Alert} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import {addUserToGroup,getCurrentUserID, createGroupRequest, deleteGroup, removeUserFromGroup, getUserInfo} from "../../api/MessagingAppAPI";
import Icon from 'react-native-vector-icons/FontAwesome';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import {AppStyles, color_b, color_c} from "../styles/AppStyles"
import OvalButton from "../components/OvalButton"




export default class GroupNotificationScreen extends Component{
    
    constructor(props) {
        super(props)
        this.state = {
            name: ""
        }
        this.gid = this.props.route.params.gid;
        this.name = this.props.route.params.name;
        this.description = this.props.route.params.description;
        this.location = this.props.route.params.location;
        
    }

    handlejoin = () => {
        addUserToGroup(getCurrentUserID(),this.gid)
        this.props.navigation.goBack();
    }
    
    render() {
        return (
            <SafeAreaView style = {{flex:1}}>
            <View style = {AppStyles.screen} >
                <ScrollView contentContainerStyle = {styles.content_container}>
                    <Icon name="group" size={100} color={color_c}/>
                    <View style = {{margin:30}}>
                        <Text style = {styles.text}>
                            Group: {this.name}
                        </Text>

                        <Text style = {styles.text}>
                            Location: {this.location}
                        </Text>

                        <Text style = {styles.text}>
                            Description: {this.description}
                        </Text>
                    </View>

                    <OvalButton text = "Join Group" handler={()=>this.handlejoin()}/>

                    <OvalButton text = "Invite Friends" handler={() => this.props.navigation.navigate('InviteFriend',{id: this.gid, groupName: this.name})}/>
                    
                </ScrollView>

            </View>
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

    text: {
        margin: 3
    },

    map:{
        height: 200,
        width: 300,
        marginVertical: 10
    }

})

