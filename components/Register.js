
import React, { Component } from 'react';
import {View, TextInput, Text, Image, StyleSheet, TouchableOpacity, KeyboardAvoidingView, } from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview'

export default class RegisterForm extends Component{

    constructor(props){
        super(props)
        this.state = {
            emailField: '',
            usernameField: '',
            passwordField: '',
            rePasswordField: ''
        }
    }

    handleRegister = () =>{
        if(this.state.passwordField !== this.state.rePasswordField){
            alert('Password fields dont match')
        }
        else if(this.state.emailField === '' || this.state.usernameField == '' || this.state.passwordField == '' || this.state.rePasswordField == ''){
            alert('one or more fields are empty')
        }
        else{
            this.props.signUp(this.state.emailField,this.state.passwordField,this.state.usernameField);
        }
    }
    
    render(){
        return(
            <KeyboardAwareScrollView style={styles.login_container}>
                    <View style = {styles.field_container}>
                        <TextInput 
                        style = {styles.field}
                        placeholder = "Enter Email"
                        onChangeText = {(text)=> this.setState({emailField: text})}
                        />

                        <TextInput 
                        style = {styles.field}
                        placeholder = "Username"
                        onChangeText = {(text)=> this.setState({usernameField: text})}
                        />

                        <TextInput 
                        style = {styles.field}
                        placeholder = "Enter Password"
                        secureTextEntry
                        onChangeText = {(text)=> this.setState({passwordField: text})}
                        />

                        <TextInput 
                        style = {styles.field}
                        placeholder = "Reenter Password"
                        secureTextEntry
                        onChangeText = {(text)=> this.setState({rePasswordField: text})}
                        />
                        
                    </View>
                
                    <View style = {styles.button_container}>
                        <TouchableOpacity style = {styles.button} onPress={this.handleRegister}>
                            <Text>
                                Register
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style = {styles.button} onPress={this.props.switch} >
                            <Text>
                                Back To Login
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