import React, { Component } from 'react';
import MessagingScreen from './components/MessagingScreen';
import LoginScreen from './components/LoginScreen';
import GroupScreen from './components/GroupScreen';
import GroupMapScreen from './components/GroupMapScreen'
import ProfilePage from './components/ProfilePage';
import SettingsScreen from './components/SettingsScreen';
import ForgetPasswordScreen from './components/ForgetPasswordScreen'
import GroupCreationScreen from "./components/GroupCreationScreen"
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {subscribeToAuthChanges} from './api/MessagingAppAPI'
import Icon from 'react-native-vector-icons/FontAwesome';


const GroupMapStack = createStackNavigator();
function GroupMapStackScreen(){
  return(
    <GroupMapStack.Navigator>
      <GroupMapStack.Screen name="GroupMap" component = {GroupMapScreen} options={{headerShown:false}}/>
      <GroupMapStack.Screen name="Message" component = {MessagingScreen}/>
      <GroupMapStack.Screen name="CreateGroup" component = {GroupCreationScreen}/>
    </GroupMapStack.Navigator>
  );
}

const SearchGroupStack = createStackNavigator();
function SearchGroupStackScreen(){
  return(
    <SearchGroupStack.Navigator>
      <SearchGroupStack.Screen name="GroupScreen" component = {GroupScreen} options={{headerShown:false}}/>
      <SearchGroupStack.Screen name="Message" component = {MessagingScreen}/>
      <SearchGroupStack.Screen name="CreateGroup" component = {GroupCreationScreen}/>
    </SearchGroupStack.Navigator>
  );
}

const MyProfileStack = createStackNavigator();
function MyProfileStackScreen(){
  return(
    <MyProfileStack.Navigator>
      <MyProfileStack.Screen name="Profile" component = {ProfilePage} options={{headerShown:false}}/>
      <MyProfileStack.Screen name="Settings" component = {SettingsScreen} />
    </MyProfileStack.Navigator>
  );
}

const AuthStack = createStackNavigator();
const Tab = createBottomTabNavigator();

const mapIcon = <Icon name="map" size={25} color="#00BED6" />;

export default class App extends React.Component {

  constructor(props){
    super(props)
    this.state = {
        signedIn: false
    }
  }

  componentDidMount(){
    subscribeToAuthChanges(this.authStateChanged)
  }

  authStateChanged = (user) =>{
    if(user !== null){
        this.setState({
          signedIn: true
        })
    }
    else{
      this.setState({
        signedIn: false
      })
    }
  }

  render() {

    if(this.state.signedIn){
      return(
        <NavigationContainer>
          <Tab.Navigator tabBarOptions = {{activeBackgroundColor:"grey", inactiveBackgroundColor:"grey", inactiveTintColor:"white", activeTintColor:"#00BED6"}}>
            <Tab.Screen name="GroupMap" component={GroupMapStackScreen} options={{tabBarIcon: ({ color, size }) => (<Icon name="map" size={size} color={color}/>)}} />
            <Tab.Screen name="SearchGroup" component={SearchGroupStackScreen} options={{tabBarIcon: ({ color, size }) => (<Icon name="search" size={size} color={color}/>)}} />
            <Tab.Screen name="MyProfile" component={MyProfileStackScreen} options={{tabBarIcon: ({ color, size }) => (<Icon name="user" size={size} color={color}/>)}} />
          </Tab.Navigator>
        </NavigationContainer>
      );
    }
    else{
      return(
        <NavigationContainer>
          <AuthStack.Navigator>
            <AuthStack.Screen name="Login" component = {LoginScreen} options={{headerShown:false}}/>
            <AuthStack.Screen name="ForgetPassword" component = {ForgetPasswordScreen}/>
          </AuthStack.Navigator>
        </NavigationContainer>
      );
    }
  }
}
