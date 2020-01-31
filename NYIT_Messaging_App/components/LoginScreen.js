import React, { Component } from 'react';
import {View, TextInput, Text, Image, StyleSheet, TouchableOpacity, KeyboardAvoidingView, } from 'react-native';

export default class LogIn extends Component{
    render(){
        return(
            <View style = {styles.login_container}>
                <View style = {styles.field_container}>
                    <TextInput 
                    style = {styles.field}
                    placeholder = "Enter Username"
                    />

                    <TextInput 
                    style = {styles.field}
                    placeholder = "Enter Password"
                    />
                </View>
            
                <View style = {styles.button_container}>
                    <TouchableOpacity style = {styles.button}>
                        <Text>
                            Login
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style = {styles.button}>
                        <Text>
                            Login with google
                        </Text>
                    </TouchableOpacity>

                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    login_container:{
        flex:1,
        flexDirection: 'column',
    },

    field_container:{
        flex: .50,
        //backgroundColor: 'purple',
        justifyContent: 'flex-end',
        padding:10

    },

    button_container:{
        flex: .50,
        //backgroundColor: 'yellow',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 10,
        
    },

    field:{
        backgroundColor: "lightgray",
        marginBottom: 10
    },

    button:{
        backgroundColor: 'lightblue',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        height: 50,
        width: 300,
        marginBottom: 10
    },

})