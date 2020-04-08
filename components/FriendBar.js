import React, { Component } from 'react';
import {View, TouchableOpacity, Text, StyleSheet, TouchableHighlightBase } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class FriendBar extends Component{
    constructor(props){
        super(props)
        this.state={
            
        }  
    }

    render(){
    
        return(
            
            <TouchableOpacity style = {styles.bar_container}>
                <View style = {{flex:1 }}>

                    <View style={styles.left_container}>
                        <Icon name="user" size={100} color="white"/>
                            
                    </View>

                    <View style={styles.right_container}>

                        <Text style ={{flex:.50}}>{this.props.name}</Text>
                        <Text style ={{flex:.50}}>{this.props.interests}</Text>
                    
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

    right_container:{
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"center",
        flex: .70,

    },  

    bar_container:{
        flexDirection:'column',
        backgroundColor: '#00BED6',
        height: 120,
        padding: 10,
        borderColor:"grey",
        borderBottomWidth: 1
    },
})