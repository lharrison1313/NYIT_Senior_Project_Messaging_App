import React, { Component } from 'react';
import {StyleSheet, View, Text, SafeAreaView ,TouchableOpacity} from 'react-native';
import {getUserInfo, createFriendRequest,getCurrentUserID, removeFriend, getCurrentUserName, sendGroupInviteRequest} from '../../api/MessagingAppAPI';
import OvalButton from "../components/OvalButton";
import Icon from 'react-native-vector-icons/FontAwesome';
import { AppStyles, color_c, color_a } from '../styles/AppStyles';


export default class UserInfoScreen extends Component{
    constructor(props){
        super(props)
        this.state = {
            name: "",
            id: "",
        }
        
    }
    
    componentDidMount(){
        getUserInfo(getCurrentUserID(), this.userInfoRetrieved)
    }
 
    userInfoRetrieved = (info) =>{
        this.setState({name: info.UserName});
    }


    handleAddFriend = () =>{
        createFriendRequest(getCurrentUserID(), getCurrentUserName(), this.props.id)
    }

    handleRemoveFriend = () =>{
        removeFriend(getCurrentUserID(),this.props.id)
    }

    handleInviteFriend = () =>{
        sendGroupInviteRequest(this.props.id, this.props.gid, getCurrentUserID(), this.props.groupName,getCurrentUserName())
    }

    renderAddRemove = () =>{
        if(this.props.isFriend){
            return(
                <TouchableOpacity style={styles.add_remove_button} onPress={() => this.handleRemoveFriend()}>
                    <Text style ={styles.add_text}>Remove</Text>
                </TouchableOpacity>
            );
        }
        if(this.props.isInvite){
           return(
            <TouchableOpacity style={styles.add_remove_button} onPress ={() => this.handleInviteFriend()} > 
                    <Text style ={styles.add_text}>Invite</Text>
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
            <SafeAreaView style={{flex:1}}>
            <View style = {AppStyles.screen}>
                <View style = {styles.content_container}>

                    <TouchableOpacity>
                        <Icon name="user" size={100} color={color_c} />
                    </TouchableOpacity>

                    <Text style = {{margin: 5,}}>
                        {this.props.name}
                    </Text>

                    <Text style = {{margin: 5,}}>
                        {this.props.id}
                    </Text>

                    <Text style = {{margin: 5,}}>
                        {this.props.interest}
                    </Text>

                    <Text style = {{margin: 5,}}>
                        {this.renderAddRemove()}
                    </Text>

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

    add_remove_button:{
        flex: .5,
        backgroundColor: color_a ,
        padding:5,
        borderRadius:10,
        alignItems:"center",
        justifyContent: "center"
    },


})