import React, { Component } from 'react';
import auth from '@react-native-firebase/auth';
import { StyleSheet, View, Text, TextInput, Button, Alert,TouchableOpacity} from 'react-native';
import{withNavigation} from "react-navigation"

class ChangeEmailScreen extends Component{
    constructor(props) {
        super(props);
        this.state = { 
            newEmail:"",

        };
    }

   
    onChangeEmailPress =() =>{
        auth().currentUser.updateEmail(this.state.newEmail)
        .then(() => {
            Alert.alert(" email has been reset.");
        }, (error) => {
            Alert.alert(error.message);
        });
    }

    
    

    render() {
        return (
            <View style={styles.login_container}>

                
                <TextInput style={styles.field}
                    value={this.state.newEmail}
                    onChangeText={(text) => { this.setState({newEmail: text}) }}
                    placeholder="Email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                />
                
                <TouchableOpacity  style = {styles.button} onPress={this.onChangeEmailPress}>
                <Text>Change Email </Text>
                
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

export default withNavigation(ChangeEmailScreen)