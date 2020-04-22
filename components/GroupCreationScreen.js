import React, { Component } from 'react';
import {View, TextInput, Text, StyleSheet, TouchableOpacity ,SafeAreaView} from 'react-native';
import {createGroup} from  "../api/MessagingAppAPI"
import InterestTextInput from "./InterestTextInput";
import GooglePlacesButton from "./GooglePlacesButton"
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';




export default class GroupCreationScreen extends Component{

    constructor(props){
        super(props)
        this.state = {
            groupName: "",
            description:"",
            interests: [],
            place: {},
            groupImageSource:""
            
        }
        
    }
    
    
    buttonHandler = ()=> {
        createGroup(this.state.groupName,this.state.description,this.state.interests,this.state.place.name,this.state.place.location)
        this.props.navigation.goBack()
    }

    interestParser = (text)=> {
        this.setState({interests:  text.split(" ")})
    }

    retrieveLocation = (place) =>{
        this.setState({place: place})
    }
    imagebuttonHandler = ()=>{
        ImagePicker.showImagePicker((response)=>{
          console.log('Response =',response);
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
          } else {
            const source = { uri: response.uri };
        
            this.setState({
                groupImageSource: source,
                });
            }
        });
    }

    render(){
        return(
            <SafeAreaView style={{flex:1}}>
            <View style = {styles.container}>
                <TextInput
                style = {styles.textInputContainer} 
                placeholder="Enter group name"
                onChangeText = {(text)=>this.setState({groupName: text})}/>
               
                 <TextInput
                style = {styles.DescriptionContainer} 
                placeholder="Enter Description"
                multiline={true}
                numberOfLines={2}
                onChangeText = {(text)=>this.setState({description: text})}/>
               
                <InterestTextInput retrieveInterestList= {this.interestParser} style ={styles.textInputContainer}/>
               
                <GooglePlacesButton button_style={styles.button} retrieveLocation = {this.retrieveLocation}/>
               
                <TouchableOpacity 
                style = {styles.button}
                onPress = {this.buttonHandler}
                >
                    <Text>Create Group</Text>
                </TouchableOpacity>
                <TouchableOpacity
                style = {styles.button}
                onPress = {this.imagebuttonHandler}
                >
                    <Icon name="user" size={50} color="white"/>
                </TouchableOpacity>
            </View>
            </SafeAreaView>
        );
    }

}

const styles = StyleSheet.create({

    button:{
        backgroundColor: "#00BED6",
        justifyContent: "center",
        alignItems: "center",
        height: 50,

    },

    container:{
        flex:1, 
        backgroundColor:"#5F6362",
    },

    textInputContainer:{
        height:50,
        marginVertical:1,
        backgroundColor:"white"
        
    },
    DescriptionContainer:{
        height:70,
        marginVertical:1,
        backgroundColor:"white"
        
    },
})
