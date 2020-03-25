import React, { Component } from 'react';
import auth from '@react-native-firebase/auth';
import { StyleSheet, View, Text, TextInput, Button, Alert } from 'react-native';
import{withNavigation} from "react-navigation"



class ForgetPasswordScreen extends Component{
    constructor(props) {
        super(props);
        this.state = { 
            email: "",
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

    onBackToLoginPress = () => {
        var navActions = NavigationActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({routeName: "Login"})]
        });
        this.props.navigation.dispatch(navActions);
    }

    render() {
        return (
            <View style={{paddingTop:50, alignItems:"center"}}>

                <Text>Forgot Password</Text>

                <TextInput style={{width: 200, height: 40, borderWidth: 1}}
                    value={this.state.email}
                    onChangeText={(text) => { this.setState({email: text}) }}
                    placeholder="Email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                />

                <Button title="Reset Password" onPress={this.onResetPasswordPress} />

            </View>
        );
    }
}

const styles = StyleSheet.create({
   


})

export default withNavigation(ForgetPasswordScreen)