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
                <GroupBar/>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start'

    },
})