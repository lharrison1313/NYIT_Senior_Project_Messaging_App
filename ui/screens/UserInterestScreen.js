import React, { Component } from 'react';
import {StyleSheet, View, Text, SafeAreaView ,TouchableOpacity} from 'react-native';
import InterestTextInput from '../components/InterestTextInput';
import InterstBar from '../components/InterestBar';
import OvalButton from '../components/OvalButton';
import { AppStyles, color_c } from '../styles/AppStyles';
import {addInterest,removeInterest,retrieveInterests, getCurrentUserID} from "../../api/MessagingAppAPI"
import { FlatList } from 'react-native-gesture-handler';


export default class UserInterestScreen extends Component{
    constructor(props){
        super(props)
        this.state = {
            interests: [],
            currentInterests: []
        }
    }

    interestParser = (text)=> {
        this.setState({interests:  text.split(" ")})
    }

    componentDidMount(){
        retrieveInterests(getCurrentUserID(),this.retriveInterestCallBack)
    }

    retriveInterestCallBack = (interests) =>{
        this.setState({
            currentInterests: interests
        })
        console.log(interests)
    }


    buttonHandler = () =>{
        const uid = getCurrentUserID();
        this.state.interests.forEach((item) =>{
            addInterest(uid,item);
        })
        
    }


    render(){
    
        return(
            <SafeAreaView style={{flex:1}}>
            <View style = {AppStyles.screen}>
                <View style = {styles.content_container}>
                    <InterestTextInput style = {styles.text_input} retrieveInterestList= {this.interestParser}/>
                    
                    <View style = {{alignItems: "center", justifyContent: "center"}}>
                        <OvalButton text = "Add Interests" handler={()=>this.buttonHandler()}/>
                    </View>

                    <Text>
                        Current Interests: 
                    </Text>
                    
                    <FlatList
                    data = {this.state.currentInterests}
                    renderItem={({ item }) => (
                            <InterstBar interest={item}/>
                        )}
                    keyExtractor = {item => item}
                    />

                </View>
            </View>
            </SafeAreaView>
            
        );
    }

}

const styles = StyleSheet.create({
    
    content_container:{
        flex: 1,
        padding: 20
    },

    text_input:{
        height:50,
        marginVertical:5,
        backgroundColor: color_c
    },


})

