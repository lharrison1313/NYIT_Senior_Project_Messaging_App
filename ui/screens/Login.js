
import React, { Component } from 'react';
import {View, TextInput, Text, TouchableOpacity, Image,SafeAreaView} from 'react-native';
import {requestLocationPermission,requestCameraLibraryPermission,requestCameraPermission,requestReadExternalPermission,requestWriteExternalPermission} from "../../api/MessagingAppAPI";
import OvalButton from "../components/OvalButton";
import {AppStyles,color_a,color_b,color_c} from "../styles/AppStyles";
import MapView from 'react-native-maps';



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
        requestCameraPermission()
        requestWriteExternalPermission()
        requestReadExternalPermission()
    }

    alertDialog = () =>{
        alert("Incorrect Username or Password")
    }
    
    handleLogin = () =>{
        if(this.state.emailField === '' || this.state.usernameField == '' || this.state.passwordField == '' || this.state.rePasswordField == ''){
            alert('one or more fields are empty')
        }
        else{
            this.props.login(this.state.emailField,this.state.passwordField,this.alertDialog);
        }
    }
    
    render(){
        const styles = this.props.styling
        return(
            <SafeAreaView style={{flex:1}}>
            <View style ={AppStyles.screen}>
                <View style={styles.login_container} >
                
                    <Image style = {{ borderRadius:150/2, width: 150, height: 150, margin: 20,}} source = {require('../../res/GroupSleuth.png')} />
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

                    <OvalButton text = "Login" handler = {this.handleLogin}/>
                    <OvalButton text = "Register" handler = {this.props.switch}/>
                    <OvalButton text = "Forgot Password" handler = {() => this.props.navigation.navigate('ForgetPassword')}/>
                
                </View>
            </View>
            </SafeAreaView>
            

        );
    }
} 