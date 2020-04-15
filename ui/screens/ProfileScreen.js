import React, { Component } from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity,SafeAreaView } from 'react-native';
import{withNavigation} from "react-navigation";
import OvalButton from "../components/OvalButton";
import {signOut} from '../../api/MessagingAppAPI';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AppStyles, color_c } from '../styles/AppStyles';


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
            <View style = {AppStyles.screen}>
                <View style = {styles.content_container}>
                    <Icon name="user" size={100} color={color_c}/>

                    <Text style = {{margin: 10,}}>
                        {this.state.name}
                    </Text>

                    <Text style = {{margin: 10,}}>
                        {this.state.status}
                    </Text>

                    <OvalButton text="Friends" onPress={() => this.props.navigation.navigate('Friends')}/>

                    <OvalButton text="Settings" handler ={() => this.props.navigation.navigate('Settings')}/>
                    
                    <OvalButton text="Sign Out" handler = {() => signOut(this.onSignOut)}/>
                </View>
            </View>
            </SafeAreaView>
            
        );
    }

}

const styles = StyleSheet.create({
    
    content_container:{
        flex: 1,
        alignItems: "center", 
        justifyContent: "center",
    },


})

export default withNavigation(ProfilePage)