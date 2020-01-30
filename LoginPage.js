import React, { Component } from 'react';
import {View, TextInput} from 'react-native';
import LogIn from './Components/Login';

export default class LogInForm extends Component {
  
    render() {
      return (
        <View style = {{flex: 1}}>
          <LogIn/>
        </View>
      );
    }
  }