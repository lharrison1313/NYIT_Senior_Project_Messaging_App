import React, { Component } from 'react';
import {StyleSheet, View, Text, SafeAreaView ,TouchableOpacity} from 'react-native';
import {getUserInfo, createFriendRequest,getCurrentUserID, removeFriend, getCurrentUserName, sendGroupInviteRequest} from '../../api/MessagingAppAPI';
import OvalButton from "../components/OvalButton";
import Icon from 'react-native-vector-icons/FontAwesome';
import { AppStyles, color_c, color_a, color_b } from '../styles/AppStyles';


export default class UserInfoScreen extends Component{
    constructor(props){
        
        super(props)
        this.state = {
        }

    }

    handleAddFriend = () =>{
        createFriendRequest(getCurrentUserID(), getCurrentUserName(), this.props.route.params.id)
        this.props.navigation.goBack()
    }

    handleRemoveFriend = () =>{
        removeFriend(getCurrentUserID(),this.props.route.params.id)
        this.props.navigation.goBack()
    }

    handleInviteFriend = () =>{
        sendGroupInviteRequest(this.props.route.params.id, this.props.route.params.gid, getCurrentUserID(), this.props.route.params.groupName,getCurrentUserName())
        this.props.navigation.goBack()
    }

    renderAddRemove = () =>{
        if(this.props.route.params.isFriend){
            return(
                <OvalButton text="Remove Friend" handler ={() => this.handleRemoveFriend()} />
            );
        }
        if(this.props.route.params.isInvite){
           return(
                <OvalButton text="Invite Friend" handler ={() => this.handleInviteFriend()} />
            )
        }
        else{
            return(
                <OvalButton text="Add Friend" handler ={() => this.handleAddFriend()} />
            
            );
        }
    }

    render(){
    
        return(
            <SafeAreaView style={{flex:1}}>
            <View style = {AppStyles.screen}>
                <View style = {styles.content_container}>

                   
                    <Icon name="user" size={100} color={color_c} />
                    

                    <Text style = {{margin: 5,}}>
                        {this.props.route.params.name}
                    </Text>

                    <Text style = {{margin: 5,}}>
                        {this.props.route.params.id}
                    </Text>

                    <Text style = {{margin: 5,}}>
                        {this.props.route.params.interests.join(" ")}
                    </Text>

                    
                    {this.renderAddRemove()}
                    

                </View>
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