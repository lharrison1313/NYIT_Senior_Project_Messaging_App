import React, { Component } from 'react';
import { StyleSheet, View, Text,TouchableOpacity,SafeAreaView } from 'react-native';
import{withNavigation} from "react-navigation"
import { AppStyles, color_a, color_b, color_c } from '../styles/AppStyles';
import OvalButton from '../components/OvalButton';


class SettingsScreen extends Component{
    constructor(props) {
        super(props);
        this.state = { 
        };
        
    }
    
    render() {
        return (
            <SafeAreaView style={{flex:1}}>
            <View style = {AppStyles.screen}>
                <View style = {styles.content_container}>

                    <OvalButton text = "Change Password" handler = {() => this.props.navigation.navigate("ChangePassword")}/>

                    <OvalButton text = "Change Email" handler = {() => this.props.navigation.navigate("ChangeEmail")}/>
                    
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


export default withNavigation(SettingsScreen)