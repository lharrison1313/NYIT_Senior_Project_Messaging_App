import React, { Component } from 'react';
import {View, Button, Text } from 'react-native';
import {signOut} from '../api/MessagingAppAPI'


export default class HomeScreen extends Component{

    onSignOut = ()=>{
        this.props.navigation.navigate('Auth')
    }

    render(){
        return(
            <View>

                <Button title = 'Messages' onPress = {() => this.props.navigation.navigate('Message')}/>
                <Button title = 'Logout' onPress = {() => signOut(this.onSignOut)} />

            </View>

        );
    }
}