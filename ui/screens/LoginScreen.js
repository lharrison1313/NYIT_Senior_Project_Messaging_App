import React, { Component } from 'react';
import Login from './Login';
import Register from './Register'
import {login, signUp} from '../../api/MessagingAppAPI'
import {StyleSheet, Dimensions } from 'react-native';
import {AppStyles,color_a,color_b,color_c} from "../styles/AppStyles";

export default class LogInScreen extends Component{
    
    constructor(props){
        super(props)
        this.state = {
            loginFormSet: true,
        }
    }

    //switches between register and login form
    switchForm = () =>{this.setState({loginFormSet: !this.state.loginFormSet})}

    render(){
        if(this.state.loginFormSet){
            return(
                <Login 
                switch ={this.switchForm}
                login = {login}
                styling = {styles}
                navigation = {this.props.navigation}
                />
            );
        }
        else{
            return(
                <Register 
                switch = {this.switchForm}
                signUp = {signUp}
                styling = {styles}
                />
            );
        }
    }
}

const window = Dimensions.get('window');
const styles = StyleSheet.create({
    
    login_container:{
        flex:1,
        alignItems:"center",
        justifyContent: "center"
    },

    field:{
        backgroundColor: color_c ,
        marginVertical: 5,
        width: window.width-20,
        height:50
    },

})