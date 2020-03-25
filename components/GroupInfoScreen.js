import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import {addUserToGroup,getCurrentUserID,isInGroup,isGroupOwner,getCurrentUserID,removeUserFromGroup,deleteGroup} from '../api/MessagingAppAPI';
import Icon from 'react-native-vector-icons/FontAwesome';



export default class GroupInfoScreen extends Component{
    
    constructor(props) {
        this.state ={
           
        }
        
        this.uid = getCurrentUserID();
    }

    renderJoinLeave = () => {

        if(isInGroup(this.uid) && isGroupOwner(this.uid)){
            return(
                <TouchableOpacity onPress = {this.handleDelete()}>
                    <Text>Delete Group</Text>
                </TouchableOpacity>
            );
        }
        else if(isInGroup(this.uid) && !isGroupOwner(this.uid)){
            return(
                <TouchableOpacity onPress = {this.handleLeave()}>
                    <Text>Leave Group</Text>
                </TouchableOpacity>
            );
        }
        else{
            return(
                <TouchableOpacity onPress = {this.handleJoin()}>
                    <Text>Join Group</Text>
                </TouchableOpacity>
            );
        }
    }

    handleJoin = () =>{
        addUserToGroup(getCurrentUserID(),this.props.gid)
        this.props.navigation.navigate('Message',{id: this.props.gid})
    }

    handleLeave = () =>{
        removeUserFromGroup(getCurrentUserID(),this.props.gid)
        this.props.navigation.goBack()
    }

    handleDelete = () =>{
        deleteGroup(this.props.gid)
        this.props.navigation.goBack()
    }

    render() {
        return (
            <SafeAreaView>
            <View>
                <Icon name="group" size={100} color="white"/>
                
                {this.renderJoinLeave()}

            </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
   
    Container:{
        flex: 1,
        backgroundColor: "grey",
        alignItems: "center", 
        justifyContent: "center",
    },

    button:{
        backgroundColor: '#00BED6',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        height: 50,
        width: 300,
        margin: 10
    },

})

