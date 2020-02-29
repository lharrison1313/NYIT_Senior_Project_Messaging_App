import React, { Component } from 'react';
import {View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {createGroup} from  "../api/MessagingAppAPI"
import{withNavigation} from "react-navigation";
import InterestTextInput from "./InterestTextInput";
import GooglePlacesButton from "./GooglePlacesButton"



class GroupCreationScreen extends Component{

    constructor(props){
        super(props)
        this.state = {
            groupName: "",
            interests: [],
            place: {}
        }
    }

    buttonHandler = ()=> {
        createGroup(this.state.groupName,this.state.interests,this.state.place.name,this.state.place.location)
        this.props.navigation.goBack()
    }

    interestParser = (text)=> {
        this.setState({interests:  text.split(" ")})
    }

    retrieveLocation = (place) =>{
        this.setState({place: place})
    }

    render(){
        return(
            <View style = {styles.container}>
                <TextInput
                style = {{backgroundColor:"white"}} 
                placeholder="Enter group name"
                onChangeText = {(text)=>this.setState({groupName: text})}/>
                
                <InterestTextInput retrieveInterestList= {this.interestParser}/>
                <GooglePlacesButton button_style={styles.button} retrieveLocation = {this.retrieveLocation}/>
                <TouchableOpacity 
                style = {styles.button}
                onPress = {this.buttonHandler}
                >
                    <Text>Create Group</Text>
                </TouchableOpacity>
            </View>
        );
    }

}

const styles = StyleSheet.create({

    button:{
        backgroundColor: "#00BED6",
        justifyContent: "center",
        alignItems: "center",
        height: 50
    },

    container:{
        flex:1, 
        backgroundColor:"#5F6362",
    }
    

})

export default withNavigation(GroupCreationScreen)