import React, { Component } from 'react';
import {View, TextInput, Text, Button, StyleSheet, TouchableOpacity} from 'react-native';

export default class LogIn extends Component{
    render(){
        return(
           <View style = {styles.login_container}>

               <View style = {styles.major_field_container}>
                    <View style = {styles.field_container}>
                            <TextInput 
                            placeholder = "Enter Username"
                            backgroundColor = "red"
                            />
                    </View>

                    <View style = {styles.field_container}>
                        <TextInput 
                        placeholder = "Enter Password"
                        backgroundColor = "red"
                        />
                    </View>
                </View>

                <View style = {styles.major_button_container}>
                    <View style = {styles.button_container}>
                        <TouchableOpacity style = {styles.button}>
                            <Text>
                                Login
                            </Text>
                        </TouchableOpacity>
                    </View>
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

    major_field_container:{
        flex: 1,
        justifyContent: 'flex-end'
    },

    major_button_container:{
        flex: 1, 
    },

    field_container:{
        flex: .15,
        padding: 10
    },

    button_container:{
        flex: .25,
        justifyContent: 'flex-start'
    },

    button:{
        flex: 1,
        backgroundColor: 'green',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
    },

    field_text:{
        marginRight: 30
    }

})