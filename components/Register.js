
import React, { Component } from 'react';
import {View, TextInput, Text, Image, StyleSheet, TouchableOpacity, KeyboardAvoidingView,SafeAreaView } from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview'
//import NyitImagePicker from '../components/NyitImagePicker'


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
        const styles = this.props.styling
        return(
            <SafeAreaView style={{flex:1}}>
            <View style={styles.login_container}>
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
            </SafeAreaView>
        );
    }
} 
