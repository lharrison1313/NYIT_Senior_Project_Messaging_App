import React, { Component } from 'react';
import MessagingScreen from './components/MessagingScreen';
import LoginScreen from './components/LoginScreen';




export default class MessagingApp extends Component {

  render() {
    return (
      //change screen using these for now
      //<MessagingScreen/>
      <LoginScreen/>
    );
  }
}
