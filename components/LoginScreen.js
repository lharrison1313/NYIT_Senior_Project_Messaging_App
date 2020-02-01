import React, { Component } from 'react';
import Login from './Login';
import Register from './Register'
import {login, signUp, subscribeToAuthChanges} from '../api/MessagingAppAPI'

export default class LogInScreen extends Component{
    
    constructor(props){
        super(props)
        this.state = {
            loginFormSet: true,
        }
    }

    componentDidMount(){
        subscribeToAuthChanges(this.authStateChanged)
    }

    authStateChanged = (user) =>{
        if(user !== null){
            this.props.navigation.navigate('App')
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
                />
            );
        }
        else{
            return(
                <Register 
                switch = {this.switchForm}
                signUp = {signUp}
                />
            );
        }
    }
}
