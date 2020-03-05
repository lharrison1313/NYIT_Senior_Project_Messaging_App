import React, { Component } from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import{withNavigation} from "react-navigation"
import {getAllGroups} from '../api/MessagingAppAPI'
import {signOut} from '../api/MessagingAppAPI'



class Settings extends Component{
    constructor(props){
        super(props)
        this.state = {
            version: "0.1"
        }
        
    }

    render(){
    
        return(
            <View style = {styles.MainPage}>
                <Image style = {{width: 100, height: 100, margin: 20,}} source = {require('./SettingsWheel.png')} />
                <Text style = {{margin: 3, fontSize: 40, fontWeight: "bold"}}>
                    Settings
                </Text>
                <TouchableOpacity style = {styles.button} >
                    <Text>
                        About
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style = {styles.button} >
                    <Text>
                        FAQs
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style = {styles.button} >
                    <Text>
                        Sign Out
                    </Text>
                </TouchableOpacity>
                <Text>
                Current Version: {this.state.version}
                </Text>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    MainPage:{
        flex: 1,
        backgroundColor: "grey",
        alignItems: "center", 
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

export default withNavigation(Settings)