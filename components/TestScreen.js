import React, { Component } from 'react';
import {View, TouchableOpacity, Text, StyleSheet, Group } from 'react-native';
import GroupBar from './GroupBar'


export default class TestScreen extends Component{
    
    constructor(props){
        super(props)
    }

    

    render(){
    
        return(
            <View style ={styles.container}>
                <GroupBar location=" location" date="Date" group_name="Group Name" 
                 intrests ="intrests"/>
               
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container:{
        flex:1,
        
       

    },
})