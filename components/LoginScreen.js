import React, { Component } from 'react';
import {View, TextInput, Text, Image, StyleSheet, TouchableOpacity, KeyboardAvoidingView, } from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview'

export default class LogInScreen extends Component{
    render(){
        return(
            
            <KeyboardAwareScrollView style={styles.login_container}>
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
                </View>
            
                <View style = {styles.button_container}>
                    <TouchableOpacity style = {styles.button} onPress={() => this.props.navigation.navigate('App')}>
                        <Text>
                            Login
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style = {styles.button} onPress={() => this.props.navigation.navigate('Register')} >
                        <Text>
                            Register
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style = {styles.button}>
                        <Text>
                            Login with google
                        </Text>
                    </TouchableOpacity>

                </View>
            </KeyboardAwareScrollView>
            
        );
    }
}


const styles = StyleSheet.create({
    login_container:{
        flex:1,
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