import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, Button, Alert,TouchableOpacity} from 'react-native';
import{withNavigation} from "react-navigation"
import NyitImagePicker from'./NyitImagePicker'
        


class ChangeProfileScreen extends Component{
    constructor(props) {
        super(props);
        this.state = { 
            imageuri:""

        };

    }
    onImagePicked=(image)=>{
        this.setState({
            imageuri: image.uri
        })

        
    }
   
   

    render() {
        return (
            <View style={styles.login_container}>

                <NyitImagePicker onImagePicked={this.onImagePicked}/>
               
            </View>
        );
    }
}

const styles = StyleSheet.create({
   
    button:{
        backgroundColor: '#00BED6',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        height: 50,
        width: 300,
        margin: 10
    },
    field:{
        width: 200, height: 40, 
        borderWidth: 1,
        marginVertical: 5, 
        backgroundColor: "lightgrey", 
        width:300
    },
    login_container:{
        flex:1,
        backgroundColor: '#5F6362',
        alignItems:"center",
        justifyContent: "center"
    },
    text:{
        color:"black",
        fontWeight:"bold",
         backgroundColor: '#00BED6',
          justifyContent: 'center',
          alignItems: 'center',
          width: 300,
          
    }

})

export default withNavigation(ChangeProfileScreen)