import React, { Component } from 'react';
import {View, TextInput, Text, Button} from 'react-native';

export default class LogInComponent extends Component{
    render(){
        return(
           <View>
            <Text>
                Username
            </Text>
            <TextInput placeholder = "Enter Username"/>
            <Text>
                Password
            </Text>
            <TextInput placeholder = "Enter Password"/>
            <Button title="Login"/>
           </View>
        );
    }
}