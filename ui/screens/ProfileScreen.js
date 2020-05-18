import React, { Component } from 'react';
import {StyleSheet, View, Text, SafeAreaView ,TouchableOpacity} from 'react-native';
import {getUserInfo, getCurrentUserID, getCurrentUserName} from "../../api/MessagingAppAPI"
import OvalButton from "../components/OvalButton";
import {signOut} from '../../api/MessagingAppAPI';
import Icon from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-picker';
import { AppStyles, color_c } from '../styles/AppStyles';


export default class ProfileScreen extends Component{
    constructor(props){
        super(props)
        this.state = {
            name: "",
            id: "",
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
    
    componentDidMount(){
       this.setState({
           name: getCurrentUserName(),
           id: getCurrentUserID()
        
        })
    }

    render(){
    
        return(
            <SafeAreaView style={{flex:1}}>
            <View style = {AppStyles.screen}>
                <View style = {styles.content_container}>

                    <TouchableOpacity
                    onPress = {this.imagebuttonHandler}
                    >
                        <Icon name="user" size={100} color={color_c} />
                    </TouchableOpacity>


                    <Text style = {{margin: 5,}}>
                        {this.state.name}
                    </Text>
                    <Text style = {{margin: 5,}}>
                        {this.state.id}
                    </Text>

                    <OvalButton text="Friends" handler = {()=> this.props.navigation.navigate("Friends")}/>

                    <OvalButton text="Interests" handler= {()=> this.props.navigation.navigate("Interests")}/>

                    <OvalButton text="Requests" handler = {() => this.props.navigation.navigate("Requests")}/>

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

