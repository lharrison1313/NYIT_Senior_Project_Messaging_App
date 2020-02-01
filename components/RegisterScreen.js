import React, { Component } from 'react';
import {View, TextInput, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';

export default class RegisterScreen extends Component{
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
                    secureTextEntry
                    />

                    <TextInput 
                    style = {styles.field}
                    placeholder = "Re-enter Password"
                    secureTextEntry
                    />
                </View>
            
                <View style = {styles.button_container}>
                    <TouchableOpacity style = {styles.button}>
                        <Text>
                            Register
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
        backgroundColor: '#5F6362'
    },

    field_container:{
        flex: .50,
        justifyContent: 'flex-end',
        padding:10

    },

    button_container:{
        flex: .50,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 10,
        
    },

    field:{
        backgroundColor: "lightgrey",
        marginBottom: 10
    },

    button:{
        backgroundColor: '#00BED6',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        height: 50,
        width: 300,
        marginBottom: 10
    },

})