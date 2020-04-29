import React, { Component } from 'react';
import {View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {acceptGroupRequest,rejectGroupRequest,acceptFriendRequest,rejectFriendRequest, getCurrentUserID, getCurrentUserGroups} from '../../api/MessagingAppAPI'
import { AppStyles, color_a, color_b, color_c, color_d } from '../styles/AppStyles';

const upIcon = <Icon name="arrow-up" size={25} color= {"green"} />;
const downIcon = <Icon name="arrow-down" size={25} color= {"red"} />;

export default class RequestBar extends Component{
    constructor(props){
        super(props)
        this.state = {
        }
        this.info = this.props.info
        this.docID = this.props.docID
    }
    
    renderButtons = () =>{
        if(this.info.type == "group"){
           return(
                <View style = {{flex: .50}}>
                    <TouchableOpacity style = {styles.button} onPress = {() => acceptGroupRequest(this.info.user,this.info.group,getCurrentUserID(),this.docID)}>
                        <Text>
                            accept
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style = {styles.button} onPress = {() => rejectGroupRequest(getCurrentUserID(),this.info.group,this.docID, this.info.user)}>
                        <Text>
                            reject
                        </Text>
                    </TouchableOpacity>
                </View>
            );
        }
        else{
            return(
                <View style = {{flex: .50}}>
                    <TouchableOpacity style = {styles.button} onPress= {() => acceptFriendRequest(getCurrentUserID(), this.info.user,this.docID)}>
                        <Text>
                            accept
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style = {styles.button} onPress= {() => rejectFriendRequest(getCurrentUserID(), this.info.user,this.docID)}>
                        <Text>
                            reject
                        </Text>
                    </TouchableOpacity>
                </View>
            )
        }
    }



    render(){

        var message = " "
        if(this.info.type == "group"){
           message =  "User: " + this.info.userName + " wants to join Group: " + this.info.groupName;
        }
        else{
            message = "User: " + this.info.userName + " wants to be your friend"
        }


        return(
            <View style = {styles.bar}>
                
                <Text style = {{flex: .50}} >
                    {message}
                </Text>

                {this.renderButtons()}

            </View>
        );
    }
}

const styles = StyleSheet.create({

    bar:{
        height:100, 
        flexDirection: "row", 
        backgroundColor: color_b, 
        alignItems: "center", 
        paddingHorizontal: 10,
        borderColor: color_c,
        borderWidth: 1
    },

    button:{
        flex: .25, 
        backgroundColor: color_d, 
        borderRadius: 20, 
        alignItems: "center",
        justifyContent: "center", 
        margin: 10, 
        padding:10
    }
   

})




