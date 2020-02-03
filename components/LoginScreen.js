import React, { Component } from 'react';
import Login from './Login';
import Register from './Register'
import {login, signUp, subscribeToAuthChanges} from '../api/MessagingAppAPI'
import {StyleSheet, Dimensions } from 'react-native';

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
                styling = {styles}
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
        backgroundColor: '#5F6362',
    },

    field_container:{
        flex: .50,
        justifyContent: 'flex-end',        
        alignItems: "center",
        marginVertical: 5,
    },

    button_container:{
        flex: .50,
        justifyContent: 'flex-start',
        alignItems: "center",
        marginVertical: 5
    },

    field:{
        backgroundColor: "lightgrey",
        marginVertical: 5,
        width: window.width-20,
        height:50
    },

    button:{
        backgroundColor: '#00BED6',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        marginVertical: 5,
        width: window.width-75,
        height:50
    },

})