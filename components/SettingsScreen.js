import React, { Component } from 'react';

import { StyleSheet, View, Text, TextInput, Button, Alert } from 'react-native';
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
            <View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
   


})

export default withNavigation(SettingsScreen)