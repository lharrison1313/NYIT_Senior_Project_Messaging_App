import React, { Component } from 'react';
import {StyleSheet, View, Text, Image } from 'react-native';
import{withNavigation} from "react-navigation"
import { TouchableOpacity } from 'react-native-gesture-handler';


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
            <View style = {styles.MainPage}>
                <Image style = {{width: 100, height: 100, margin: 20,}} source = {require('./nyit.png')} />
                <Text style = {{margin: 10,}}>
                    {this.state.name}
                </Text>
                <Text style = {{margin: 10,}}>
                    {this.state.status}
                </Text>
                <TouchableOpacity style = {styles.button}>
                    <Text>
                        Add Friends
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style = {styles.button}>
                    <Text>
                        My Groups
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style = {styles.button}>
                    <Text>
                        Settings
                    </Text>
                </TouchableOpacity>
            </View>
            
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