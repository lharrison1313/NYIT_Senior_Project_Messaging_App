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
                
                <View style={styles.search_container}>

                </View>

                <View style = {styles.group_container} >
                    <GroupBar location=" location" date="Date" group_name="Group Name" 
                    intrests ="intrests"/>
                
                </View>
                
                <View style={styles.modify_container}>

                </View>
                
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    
    group_container:{
        flex:6,
    },
    search_container:{
        flex:0.5,
    },
    modify_container:{
        flex:0.5,
    }
        

})