
import React, { Component } from 'react';
import {View, TextInput, ScrollView, Text, Image, StyleSheet, TouchableOpacity, KeyboardAvoidingView,SafeAreaView } from 'react-native';
import OvalButton from "../components/OvalButton";
import {AppStyles,color_a,color_b,color_c} from "../styles/AppStyles";

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

    alertDialog = (error) =>{
        alert(error)
    }
    
    handleRegister = () =>{
        if(this.state.passwordField !== this.state.rePasswordField){
            alert('Password fields dont match')
        }
        else if(this.state.emailField === '' || this.state.usernameField == '' || this.state.passwordField == '' || this.state.rePasswordField == ''){
            alert('one or more fields are empty')
        }
        else{
            this.props.signUp(this.state.emailField,this.state.passwordField,this.state.usernameField,this.alertDialog);
        }
    }

    render(){
        const styles = this.props.styling
        return(
            <SafeAreaView style={{flex:1}}>
            <ScrollView style = {AppStyles.screen}>
                <View style={styles.login_container}>

                    <Image style = {{ borderRadius:150/2, width: 150, height: 150, margin: 20,}} source = {require('../../res/GroupSleuth.png')} />
                        
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

                    <OvalButton text = "Register" handler = {this.handleRegister}/>
                    <OvalButton text = "Back to login" handler = {this.props.switch}/>

                        
                </View>
            </ScrollView>
            </SafeAreaView>
        );
    }
} 
