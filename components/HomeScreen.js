import React, { Component } from 'react';
import {View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import {signOut} from '../api/MessagingAppAPI'


export default class HomeScreen extends Component{

    onSignOut = ()=>{
        this.props.navigation.navigate('Auth')
    }

    render(){
        return(
            <View style = {styles.main_container}>

                
                <TouchableOpacity style = {styles.button} onPress={() => this.props.navigation.navigate('Test')} >
                            <Text>
                                test page
                            </Text>
                </TouchableOpacity>

                <TouchableOpacity style = {styles.button} >
                            <Text>
                                My Groups
                            </Text>
                </TouchableOpacity>

                <TouchableOpacity style = {styles.button} >
                            <Text>
                                My Profile
                            </Text>
                </TouchableOpacity>

                <TouchableOpacity style = {styles.button} onPress={() => this.props.navigation.navigate('Message')} >
                            <Text>
                                Messages
                            </Text>
                </TouchableOpacity>

                <TouchableOpacity style = {styles.button} onPress={() => signOut(this.onSignOut)} >
                            <Text>
                                signOut
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
        justifyContent: 'center',
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