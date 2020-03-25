import React, { Component } from 'react';

import { StyleSheet, View, Text, TextInput, Button, Alert,SafeAreaView } from 'react-native';
import{withNavigation} from "react-navigation"
// import * as firebase from 'firebase';

import { TouchableOpacity } from 'react-native-gesture-handler';


class SettingsScreen extends Component{
    constructor(props) {
        super(props);
        this.state = { 
        };
    }

    

    render() {
        return (
            <SafeAreaView style={{flex:1}}>
            <View style = {styles.MainPage}>
                 <TouchableOpacity style = {styles.button} onPress={() => this.props.navigation.navigate("ChangePassword")}>
                    <Text>
                        Change Password
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style = {styles.button} onPress={() => this.props.navigation.navigate("ChangeEmail")}>
                    <Text>
                        Change Email
                    </Text>
                </TouchableOpacity>
            </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    MainPage:{
        flex: 1,
        backgroundColor: "grey",
        alignItems: "center", 
        justifyContent: "center",
    },
    button:{
        backgroundColor: '#00BED6',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        height: 50,
        width: 300,
        margin: 10
    },


})


export default withNavigation(SettingsScreen)