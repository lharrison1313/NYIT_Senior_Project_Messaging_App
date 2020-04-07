import React, { Component } from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity,SafeAreaView } from 'react-native';
import{withNavigation} from "react-navigation"
import {signOut} from '../api/MessagingAppAPI'
import {getMyGroups} from "../api/MessagingAppAPI"
import Icon from 'react-native-vector-icons/FontAwesome';


class ProfilePage extends Component{
    constructor(props){
        super(props)
        this.state = {
            name: "Default Name",
            status: "Offline",
        }
    }

    render(){
    
        return(
            <SafeAreaView style={{flex:1}}>
            <View style = {styles.MainPage}>
                <Icon name="user" size={100} color="white"/>

                <Text style = {{margin: 10,}}>
                    {this.state.name}
                </Text>

                <Text style = {{margin: 10,}}>
                    {this.state.status}
                </Text>

                <TouchableOpacity style = {styles.button} onPress={() => this.props.navigation.navigate('AddFriends')}>
                    <Text>
                        Add Friends
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style = {styles.button} onPress={() => this.props.navigation.navigate('Settings')}>
                    <Text>
                        Settings
                    </Text>
                </TouchableOpacity>
                
                { <TouchableOpacity style = {styles.button} onPress={() => signOut(this.onSignOut)} >
                            <Text>
                                Signout
                            </Text>
                </TouchableOpacity> }
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

export default withNavigation(ProfilePage)