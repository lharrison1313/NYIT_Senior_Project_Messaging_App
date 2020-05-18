import React, { Component } from 'react';
import {View, ScrollView, TextInput, StyleSheet, SafeAreaView, Switch, Text, Picker,TouchableOpacity,Image} from 'react-native';
import {createGroup} from  "../../api/MessagingAppAPI"
import InterestTextInput from "../components/InterestTextInput";
import GooglePlacesButton from "../components/GooglePlacesButton"
import OvalButton from "../components/OvalButton"
import ImagePicker from 'react-native-image-picker';
import {AppStyles, color_c} from "../styles/AppStyles"
import Icon from 'react-native-vector-icons/FontAwesome';


export default class GroupCreationScreen extends Component{

    constructor(props){
        super(props)
        this.state = {
            groupName: "",
            description: "",
            interests: [],
            place: {
                location: null,
                name: null
            },
            groupImageSource:"",
            private: false,
            visible: true,
            //limit: false,
            size: 0,
        }
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
    
    renderImage = ()=>{
        if(this.state.groupImageSource == ""){
             return(
                <TouchableOpacity 
                style = {{marginVertical:50,alignItems:'center'}}
                onPress = {this.imagebuttonHandler}>
                    <Icon name="photo" size={90} color={color_c} />
                </TouchableOpacity>
             )
        }
        else {
            
            return(
                
                <TouchableOpacity 
                style = {{marginVertical:50,alignItems:'center'}}
                onPress = {this.imagebuttonHandler}>
                     <Image source={this.state.groupImageSource} style={{height:300,width:400}}  onPress = {this.imagebuttonHandler}/>
                </TouchableOpacity>
                
            )

        }
    }


    buttonHandler = ()=> {
        if(this.state.groupName === ''){
            alert('Group name cannot be empty')
        }
        else{
           
            var group = {
                groupName: this.state.groupName,
                description: this.state.description,
                interests: this.state.interests,
                locationName: this.state.place.name,
                coordinates: this.state.place.location,
                private: this.state.private,
                visible: this.state.visible
            }
            console.log(group)
            createGroup(group)
            this.props.navigation.goBack()
        }
    }

    interestParser = (text)=> {
        this.setState({interests:  text.split(" ")})
    }

    retrieveLocation = (place) =>{
        this.setState({place: place})
    }


    renderVisible = () =>{
        if(this.state.private){
            return(
                <View style = {{flexDirection: "row"}}>
                        <Text style = {{flex:1}}>
                            Visible:
                        </Text>
                        <Switch style = {{flex:1}} value = {this.state.visible} onValueChange = {() => this.setState({visible: !this.state.visible})}  />
                </View>
            )
        }
    }

    render(){
        return(
            <SafeAreaView style={{flex:1}}>
            <ScrollView style = {AppStyles.screen} >
            
                <View style = {styles.content_container}>

                    <TextInput
                    style = {styles.text_input} 
                    placeholder="Enter group name"
                    onChangeText = {(text)=>this.setState({groupName: text})}/>

                    <TextInput 
                    style =  {{backgroundColor:"lightgrey" }}
                    placeholder="Description"
                    numberOfLines = {3}
                    multiline
                    onChangeText = {(text)=>this.setState({description: text})}/>

                    <InterestTextInput retrieveInterestList= {this.interestParser} style ={styles.text_input}/>

                    <View style = {{flexDirection: "row"}}>
                        <Text style = {{flex:1}}>
                            Private:
                        </Text>
                        
                        
                        
                        <Switch style = {{flex:1}} value = {this.state.private} onValueChange = {() => this.setState({private: !this.state.private, visible: true})}  />
                    </View>
                    {this.renderVisible()}
                    {this.renderImage()}
                    
                    <View style = {styles.button_container}>
                        <GooglePlacesButton shape = "oval" retrieveLocation = {this.retrieveLocation}/>
                        <OvalButton text = "Create Group" handler = {this.buttonHandler}/>
                    </View>

                </View>
            </ScrollView>
            </SafeAreaView>
        );
    }

}

const styles = StyleSheet.create({

    content_container:{
        flex: 1,
        padding: 20
    },

    button_container:{
        alignItems: "center", 
        justifyContent: "center"
    },

    text_input:{
        height:50,
        marginVertical:5,
        backgroundColor: color_c
    },
})
