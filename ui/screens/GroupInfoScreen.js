import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, ScrollView, Alert} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import {addUserToGroup,getCurrentUserID,getGroupInfo, deleteGroup, removeUserFromGroup} from "../../api/MessagingAppAPI";
import Icon from 'react-native-vector-icons/FontAwesome';
import MapView from 'react-native-maps';
import {AppStyles, color_b, color_c} from "../styles/AppStyles"
import OvalButton from "../components/OvalButton"




export default class GroupInfoScreen extends Component{
    
    constructor(props) {
        super(props)
        this.state = {
            info: "",
            users: []
        }
        this.gid = this.props.route.params.id;
        
        
    }

    componentDidMount(){
        getGroupInfo(this.gid,this.retrieveGroupInfo);
    }

    handlejoin = () => {
        addUserToGroup(getCurrentUserID(),this.gid)
        this.props.navigation.navigate('Message',{id: this.gid});
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
    
    retrieveGroupInfo = (groupInfo) => {
        this.setState({
            info: groupInfo,
            users: groupInfo.GroupUsers
        })
        
    }

    renderButtons = () =>{
        var uid = getCurrentUserID()
        var users = this.state.users;
        if(uid == this.state.info.GroupOwner){
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
        else{
            return(
                <OvalButton text = "Join Group" handler = {() => this.handlejoin()}/>
            );
        }
    }

    
    render() {
        return (
            <SafeAreaView style = {{flex:1}}>
            <View style = {AppStyles.screen} >
                <ScrollView contentContainerStyle = {styles.content_container}>
                    <Icon name="group" size={100} color={color_c}/>
                    
                    <Text>
                        {this.state.info.GroupName}
                    </Text>

                    <Text>
                        Description
                    </Text>

                    <Text>
                        {this.state.info.Interests}
                    </Text>

                    <Text>
                        Users
                    </Text>

                    <MapView>

                    </MapView>

                    {this.renderButtons()}
                    

                    
                </ScrollView>

            </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
   
    content_container:{
        flex: 1,
        alignItems: "center", 
        justifyContent: "center",
    },

})

