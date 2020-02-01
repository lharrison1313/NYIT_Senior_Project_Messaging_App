import React, { Component } from 'react';
import MessagingScreen from './components/MessagingScreen';
import RegisterScreen from './components/RegisterScreen'
import LoginScreen from './components/LoginScreen';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';




const AppNavigator = createStackNavigator(
  {
    Login: LoginScreen,
    Register: RegisterScreen
  },
  {
    initialRouteName: 'Login',
    defaultNavigationOptions: {
      title: '',
      headerStyle: {
        backgroundColor: '#00BED6',
      },
    },
  });

const AppContainer = createAppContainer(AppNavigator);


export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
