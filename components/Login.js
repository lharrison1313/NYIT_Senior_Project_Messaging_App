
import React, { Component } from 'react';
import {View, TextInput, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, } from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview'


export default class LoginForm extends Component{

    constructor(props){
        super(props)
        this.state = {
            emailField: '',
            passwordField: ''
        }
    }

    handleLogin = () =>{
        if(this.state.emailField === '' || this.state.usernameField == '' || this.state.passwordField == '' || this.state.rePasswordField == ''){
            alert('one or more fields are empty')
        }
        else{
            this.props.login(this.state.emailField,this.state.passwordField);
        }
    }
    
    render(){
        const styles = this.props.styling
        return(
            
            <KeyboardAwareScrollView style={styles.login_container} >
                <View style = {styles.field_container}>
                    <TextInput 
                    style = {styles.field}
                    placeholder = "Enter Email"
                    onChangeText = {(text)=> this.setState({emailField: text})}
                    />

                    <TextInput 
                    style = {styles.field}
                    placeholder = "Enter Password"
                    secureTextEntry
                    onChangeText = {(text)=> this.setState({passwordField: text})}
                    />
                    
                </View>
            
                <View style = {styles.button_container}>
                    <TouchableOpacity style = {styles.button} onPress={this.handleLogin}>
                        <Text>
                            Login
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style = {styles.button} onPress={this.props.switch} >
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