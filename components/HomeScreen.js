import React, { Component } from 'react';
import {View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import {signOut} from '../api/MessagingAppAPI'
import {getAllGroups} from '../api/MessagingAppAPI'


export default class HomeScreen extends Component{

    onSignOut = ()=>{
        this.props.navigation.navigate('Auth')
    }

    render(){
        return(
            <View style = {styles.main_container}>

                <Image style = {{width: 100, height: 100, margin: 20,}} source = {require('./HomeScreenLogo.png')} />
                <TouchableOpacity style = {styles.button} onPress={() => this.props.navigation.navigate('Groups',{getGroupsFunc: getAllGroups})}>
                            <Text>
                                Search Groups
                            </Text>
                </TouchableOpacity>
                <TouchableOpacity style = {styles.button} onPress={() => this.props.navigation.navigate('Profile')}>
                            <Text>
                                Profile
                            </Text>
                </TouchableOpacity>
                <TouchableOpacity style = {styles.button} onPress={() => signOut(this.onSignOut)} >
                            <Text>
                                Sign Out
                            </Text>
                </TouchableOpacity>

            </View>

        );
    }

}

const styles = StyleSheet.create({

    main_container:{
        flex:1,
        backgroundColor: '#5F6362',
        alignItems: 'center'
    },
    
    button:{
        backgroundColor: '#00BED6',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        height: 50,
        width: 300,
        margin: 10
    },

})