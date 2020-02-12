import React, { Component } from 'react';
import {View, TouchableOpacity, Text, StyleSheet } from 'react-native';


export default class GroupBar extends Component{
    

    render(){
    
        return(
            <View style = {{flex:1, flexDirection: 'row'}} >
                <TouchableOpacity style = {styles.bar}>
                    <Text>GroupName</Text>
                </TouchableOpacity>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    bar:{
        flex: 1,
        backgroundColor: 'blue',
        height: 100,
    }
})