import React, { Component } from 'react';
import MessagingScreen from './components/MessagingScreen';
import LoginScreen from './components/LoginScreen';
import GroupScreen from './components/GroupScreen';
import HomeScreen from './components/HomeScreen'
import GroupMapScreen from './components/GroupMapScreen'
import ProfilePage from './components/ProfilePage';
import GroupCreationScreen from "./components/GroupCreationScreen"
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer,  createSwitchNavigator } from 'react-navigation';



const AppStack = createStackNavigator(
  {
    Home: HomeScreen,
    Message: MessagingScreen,
    Groups: GroupScreen,
    CreateGroup: GroupCreationScreen,
    GroupMap: GroupMapScreen,
    Profile: ProfilePage,
  
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
    Auth: LoginScreen,
    App: AppStack
  },
  {
    initialRouteName: 'Auth',
  }
  ));


export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
