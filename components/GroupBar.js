import React, { Component } from 'react';
import {View, TouchableOpacity, Text, StyleSheet } from 'react-native';


export default class GroupBar extends Component{
    

    render(){
    
        return(
            
            <TouchableOpacity style = {styles.bar_container}>
                <View style={styles.header_container}>
                    <Text style = {{flex: 1}}>{this.props.location}</Text>
                    <Text style = {{flex: 1}}>{this.props.date}</Text>
                </View>
                <Text style ={styles.body_text}>{this.props.group_name}</Text>
                <Text style ={styles.body_text}>{this.props.interests}</Text>
            </TouchableOpacity>
            
        );
    }

}

const styles = StyleSheet.create({
    bar_container:{
        flexDirection:'column',
        backgroundColor: '#00BED6',
        height: 100,
        padding:10,
        borderColor:"red",
        borderWidth:1

    },

    header_container:{
        flexDirection:'row',
        marginBottom:5


    },

    header_text:{

    },
    body_text:{
        marginBottom:10
    }


})