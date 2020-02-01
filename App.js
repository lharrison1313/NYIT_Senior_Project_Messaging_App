import React, { Component } from 'react';
import MessagingScreen from './components/MessagingScreen';
import RegisterScreen from './components/RegisterScreen'
import LoginScreen from './components/LoginScreen';
import AuthLoadScreen from './components/AuthenticationLoadingScreen'
import HomeScreen from './components/HomeScreen'
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer,  createSwitchNavigator } from 'react-navigation';




const AuthStack = createStackNavigator(
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

const AppStack = createStackNavigator(
  {
    Home: HomeScreen,
    Message: MessagingScreen
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      title: '',
      headerStyle: {
        backgroundColor: '#00BED6',
      },
    },
  });

const AppContainer = createAppContainer(createSwitchNavigator(
  {
    AuthLoad: AuthLoadScreen,
    Auth: AuthStack,
    App: AppStack
  },
  {
    initialRouteName: 'AuthLoad',
  }
  ));


export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
