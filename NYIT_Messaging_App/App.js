import React, { Component } from 'react';
import {View} from 'react-native';
import MessagingScreen from './components/MessagingScreen';
import LoginScreen from './components/LoginScreen';




export default class MessagingApp extends Component {

  render() {
    return (
      //<MessagingScreen/>
      <LoginScreen/>
    );
  }
}
