import React, { Component } from 'react';
import {View, TouchableOpacity, Text, StyleSheet, TouchableHighlightBase } from 'react-native';
import {createFriendRequest,getCurrentUserID, removeFriend, getCurrentUserName, sendGroupInviteRequest} from '../../api/MessagingAppAPI';
import Icon from 'react-native-vector-icons/FontAwesome';
import {AppStyles, color_a, color_b, color_c, color_e} from "../styles/AppStyles"

export default class FriendBar extends Component{
    constructor(props){
        super(props)
        this.state={
            remove: "Remove",
            invite: "Invite"
        }  
    }

    handleAddFriend = () =>{
        createFriendRequest(getCurrentUserID(), getCurrentUserName(), this.props.id)
    }

    handleRemoveFriend = () =>{
        removeFriend(getCurrentUserID(),this.props.id)
        this.setState({remove: "Removing"})
    }

    handleInviteFriend = () =>{
        sendGroupInviteRequest(this.props.id, this.props.gid, getCurrentUserID(), this.props.groupName,getCurrentUserName())
        this.setState({invite: "Sent"})
    }

    renderAddRemove = () =>{
        if(this.props.isFriend){
            return(
                <TouchableOpacity style={styles.add_remove_button} onPress={() => this.handleRemoveFriend()}>
                    <Text style ={styles.add_text}>{this.state.remove}</Text>
                </TouchableOpacity>
            );
        }
        if(this.props.isInvite){
           return(
            <TouchableOpacity style={styles.add_remove_button} onPress ={() => this.handleInviteFriend()} > 
                    <Text style ={styles.add_text}>{this.state.invite}</Text>
                </TouchableOpacity>
            )
        }
        else{
            return(
            <TouchableOpacity style={styles.add_remove_button} onPress ={() => this.handleAddFriend()} > 
                <Text style ={styles.add_text}>Add</Text>
            </TouchableOpacity>
            );
        }
    }

    render(){
    
        return(
            
            <TouchableOpacity style = {styles.bar_container} onPress ={() => 
            this.props.navigation.navigate("UserInfo", {name: this.props.name, id: this.props.id, interests: this.props.interests, isInvite: this.props.isInvite, isFriend: this.props.isFriend, gid: this.props.gid, groupName: this.props.groupName})} >
                <View style = {{flexDirection:"row", flex:1 }}>

                    <View style={styles.left_container}>
                        <Icon name="user" size={60} color={color_c}/>
                    </View>

                    <View style={styles.mid_container}>

                        <Text style ={{flex:.50, fontSize:25, fontWeight: "bold"}}>{this.props.name}</Text>
                        <Text style ={{flex:.50}}>{this.props.id}</Text>
                    
                    </View>

                    <View style={styles.right_container}>
                        {this.renderAddRemove()}
                    </View>

                    
                
                </View>
            </TouchableOpacity>
            
        );
    }

}


const styles = StyleSheet.create({

    left_container:{
        flexDirection:"column",
        justifyContent:"center",
        flex: .15,
    },

    mid_container:{
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"center",
        flex: .60,
        padding: 5

    },

    right_container:{
        flex: .25,
        justifyContent: "center"
    },

    add_remove_button:{
        flex: .5,
        backgroundColor: color_a ,
        padding:5,
        borderRadius:10,
        alignItems:"center",
        justifyContent: "center"
    },

    bar_container:{
        flexDirection:'column',
        backgroundColor: '#00BED6',
        height: 100,
        padding: 10,
        borderColor:color_a,
        borderBottomWidth: 1
    },
})