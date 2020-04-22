import React, { Component } from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity,SafeAreaView } from 'react-native';
import{withNavigation} from "react-navigation"
import {signOut} from '../api/MessagingAppAPI'
import {getMyGroups} from "../api/MessagingAppAPI"
import Icon from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-picker';

// import NyitImagePicker from '../components/NyitImagePicker'



class ProfilePage extends Component{
    constructor(props){
        super(props)
        this.state = {
            name: "Default Name",
            status: "Offline",
            groupImageSource:""

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
            
    render(){
        return(
            <SafeAreaView style={{flex:1}}>
            <View style = {styles.MainPage}>
            <TouchableOpacity
                
                onPress = {this.imagebuttonHandler}
                >
                    <Icon name="user" size={100} color="white"/>
                </TouchableOpacity>
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

                <TouchableOpacity style = {styles.button} onPress={() => this.props.navigation.navigate('Settings')}>
                    <Text>
                        Settings
                    </Text>
                </TouchableOpacity>
                
                
                <TouchableOpacity style = {styles.button} onPress={() => signOut(this.onSignOut)} >
                            <Text>
                                Signout
                            </Text>
                </TouchableOpacity>
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