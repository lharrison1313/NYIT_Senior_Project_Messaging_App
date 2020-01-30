import React, { Component } from 'react';
import {View, TextInput} from 'react-native';
import LoginComponent from './Components/LoginComponent';

export default class LogInForm extends Component {
  
    render() {
      return (
        <View style>
          <LoginComponent/>
        </View>
      );
    }
  }