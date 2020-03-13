
import React, { Component } from 'react';
import {View, TextInput, Text, TouchableOpacity, Image, KeyboardAvoidingView, } from 'react-native';
import {requestLocationPermission} from "../api/MessagingAppAPI";



export default class LoginForm extends Component{

    constructor(props){
        super(props)
        this.state = {
            emailField: '',
            passwordField: ''
        }
    }

    componentDidMount(){
        requestLocationPermission()
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
            
            <View style={styles.login_container} >
               
                    <Image style = {{width: 200, height: 200, margin: 20,}} source = {require('../res/nyit.png')} />

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

                    <TouchableOpacity style = {styles.button} onPress={() => this.props.navigation.navigate('ForgetPassword')} >
                        <Text>
                            Forget Passowrd
                        </Text>
                    </TouchableOpacity>
            </View>
            

        );
    }
} 