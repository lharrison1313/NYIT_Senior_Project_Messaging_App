import React, { Component } from 'react';
import {View, TouchableOpacity, Text, StyleSheet, TouchableHighlightBase } from 'react-native';
import {addUserToFriend,getCurrentUserID, getUserInfo} from '../api/MessagingAppAPI';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class FriendBar extends Component{
    constructor(props){
        super(props)
        this.state={
            
        }  
    }

    handleJoin = () =>{
        addUserToFriend(getCurrentUserID(),this.props.id)
        
    }

    render(){
    
        return(
            
            <TouchableOpacity style = {styles.bar_container}>
                <View style = {{flexDirection:"row", flex:1 }}>

                    <View style={styles.left_container}>
                        <Icon name="user" size={80} color="white"/>
                            
                    </View>

                    <View style={styles.mid_container}>

                        <Text style ={{flex:.50, fontSize:25, fontWeight: "bold"}}>{this.props.name}</Text>
                        <Text style ={{flex:.50}}>{this.props.interests}</Text>
                    
                    </View>

                    <View style={styles.right_container}>
                        <TouchableOpacity style={styles.add_button} onPress={() => this.handleJoin()}>
                            <Text style ={styles.add_text}>Add</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.remove_button} onPress={() => this.handleJoin()}>
                            <Text style ={styles.add_text}>Remove</Text>
                        </TouchableOpacity>
                    </View>

                    
                
                </View>
            </TouchableOpacity>
            
        );
    }

}


const styles = StyleSheet.create({

    left_container:{
        flexDirection:"column",
        flex: .30,
    },

    mid_container:{
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"center",
        flex: .60,

    },

    right_container:{
        flexDirection:"column",
        flex: .30,

    },

    add_button:{
        flex: .50,
        flexDirection:"column",
        backgroundColor:"grey",
        padding:5,
        borderRadius:10,
        alignItems:"center",
        justifyContent: "center"
    },

    remove_button:{
        flex: .50,
        flexDirection:"column",
        backgroundColor:"grey",
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
        borderColor:"grey",
        borderBottomWidth: 1
    },
})