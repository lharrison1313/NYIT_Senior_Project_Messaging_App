import React, { Component } from 'react';
import {View, TextInput, StyleSheet, SafeAreaView, Switch} from 'react-native';
import {createGroup} from  "../../api/MessagingAppAPI"
import InterestTextInput from "../components/InterestTextInput";
import GooglePlacesButton from "../components/GooglePlacesButton"
import OvalButton from "../components/OvalButton"
import {AppStyles} from "../styles/AppStyles"




export default class GroupCreationScreen extends Component{

    constructor(props){
        super(props)
        this.state = {
            groupName: "",
            interests: [],
            place: {},
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
            <SafeAreaView style={{flex:1}}>
            <View style = {AppStyles.screen} >
                <View style = {styles.content_container}>

                    <TextInput
                    style = {styles.text_input} 
                    placeholder="Enter group name"
                    onChangeText = {(text)=>this.setState({groupName: text})}/>

                    <InterestTextInput retrieveInterestList= {this.interestParser} style ={styles.text_input}/>
                    
                    <View style = {styles.button_container}>
                        <GooglePlacesButton shape = "oval" retrieveLocation = {this.retrieveLocation}/>
                        <OvalButton text = "Create Group" handler = {this.buttonHandler}/>
                    </View>

                </View>
            </View>
            </SafeAreaView>
        );
    }

}

const styles = StyleSheet.create({

    content_container:{
        flex: 1,
        paddingTop:20
    },

    button_container:{
        alignItems: "center", 
        justifyContent: "center"
    },

    text_input:{
        height:50,
        marginVertical:5,
        marginHorizontal: 10,
        backgroundColor:"white"
        
    },
})
