import React, { Component } from 'react';
import auth from '@react-native-firebase/auth';
import { StyleSheet, View, Text, TextInput, Button, Alert,TouchableOpacity} from 'react-native';
import{withNavigation} from "react-navigation"
// import * as firebase from 'firebase';
        
// import { TouchableOpacity } from 'react-native-gesture-handler';


class ForgetPasswordScreen extends Component{
    constructor(props) {
        super(props);
        this.state = { 
            email: "",
            newEmail:"",

        };
    }

    onResetPasswordPress = () => {
        auth().sendPasswordResetEmail(this.state.email)
            .then(() => {
                Alert.alert("Password reset email has been sent.");
            }, (error) => {
                Alert.alert(error.message);
            });
    }
    onChangeEmailPress =() =>{
        auth().currentUser.updateEmail(this.state.newEmail)
        .then(() => {
            Alert.alert(" email has been reset.");
        }, (error) => {
            Alert.alert(error.message);
        });
    }

    // onBackToLoginPress = () => {
    //     var navActions = NavigationActions.reset({
    //         index: 0,
    //         actions: [NavigationActions.navigate({routeName: "Login"})]
    //     });
    //     this.props.navigation.dispatch(navActions);
    // }
    

    render() {
        return (
            <View style={styles.login_container}>

                <Text style={styles.text}>Forgot Password</Text>

                <TextInput style={styles.field}
                    value={this.state.email}
                    onChangeText={(text) => { this.setState({email: text}) }}
                    placeholder="Email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                />

                <TouchableOpacity  style = {styles.button} onPress={this.onResetPasswordPress}>
                <Text>Reset Password </Text>
                
                </TouchableOpacity>
               
            </View>
        );
    }
}

const styles = StyleSheet.create({
   
    button:{
        backgroundColor: '#00BED6',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        height: 50,
        width: 300,
        margin: 10
    },
    field:{
        width: 200, height: 40, 
        borderWidth: 1,
        marginVertical: 5, 
        backgroundColor: "lightgrey", 
        width:300
    },
    login_container:{
        flex:1,
        backgroundColor: '#5F6362',
        alignItems:"center",
        justifyContent: "center"
    },
    text:{
        color:"black",
        fontWeight:"bold",
         backgroundColor: '#00BED6',
          justifyContent: 'center',
          alignItems: 'center',
          width: 300,
          
    }

})

export default withNavigation(ForgetPasswordScreen)