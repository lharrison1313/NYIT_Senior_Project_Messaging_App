import React, { Component } from 'react';
import auth from '@react-native-firebase/auth';
import { StyleSheet, View, Text, TextInput, Alert,TouchableOpacity} from 'react-native';
import {AppStyles, color_a, color_b, color_c} from '../styles/AppStyles'
import {resetPassword} from "../../api/MessagingAppAPI"
import OvalButton from "../components/OvalButton"

export default class ChangePasswordScreen extends Component{
    constructor(props) {
        super(props);
        this.state = { 
            newEmail:"",

        };
    }

    handleButtonPress = () =>{
        if(!this.state.newEmail == ""){
            resetPassword(this.state.newEmail, this.alert)
        }
    }

    alert = (response, message) =>{
        if(response){
            Alert.alert(message)
        }
        else{
            Alert.alert(message)
        }
    }

    render() {
        return (
            <View style = {AppStyles.screen}>
            <View style={styles.content_container}>

                
                <TextInput style={styles.field}
                    value={this.state.newEmail}
                    onChangeText={(text) => { this.setState({newEmail: text}) }}
                    placeholder="Email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                />
                
                <OvalButton text = "Reset Password" handler={this.handleButtonPress}/>
            
            </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
   
    
    field:{
        width: 200, height:40, 
        marginVertical: 5, 
        backgroundColor: color_c, 
        width:300
    },

    content_container:{
        flex:1,
        alignItems:"center",
        justifyContent: "center"
    },

})

