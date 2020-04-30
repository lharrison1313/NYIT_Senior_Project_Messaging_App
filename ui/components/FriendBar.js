import React, { Component } from 'react';
import {View, TouchableOpacity, Text, StyleSheet, TouchableHighlightBase } from 'react-native';
import {createFriendRequest,getCurrentUserID, removeFriend, getCurrentUserName} from '../../api/MessagingAppAPI';
import Icon from 'react-native-vector-icons/FontAwesome';
import {AppStyles, color_a, color_b, color_c, color_e} from "../styles/AppStyles"

export default class FriendBar extends Component{
    constructor(props){
        super(props)
        this.state={
            
        }  
    }

    handleAddFriend = () =>{
        createFriendRequest(getCurrentUserID(), getCurrentUserName(), this.props.id)
    }

    handleRemoveFriend = () =>{
        removeFriend(getCurrentUserID(),this.props.id)
    }

    handleNavigateToInfoScreen = () =>{
        
    }

    renderAddRemove = () =>{
        if(this.props.isFriend){
            return(
                <TouchableOpacity style={styles.add_remove_button} onPress={() => this.handleRemoveFriend()}>
                    <Text style ={styles.add_text}>Remove</Text>
                </TouchableOpacity>
            );
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
            
            <TouchableOpacity style = {styles.bar_container} >
                <View style = {{flexDirection:"row", flex:1 }}>

                    <View style={styles.left_container}>
                        <Icon name="user" size={80} color="white"/>
                            
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
        flex: .15,
    },

    mid_container:{
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"center",
        flex: .65,
        padding: 5

    },

    right_container:{
        flex: .20,
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