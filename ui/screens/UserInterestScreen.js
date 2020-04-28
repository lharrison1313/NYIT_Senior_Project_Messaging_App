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
        retrieveInterests(getCurrentUserID(),this.retriveInterestCallBack).then((unsubscribe)=>{
            this.unsubscribe = unsubscribe;
        })
    }

    componentWillUnmount(){
        this.unsubscribe();
    }

    retriveInterestCallBack = (interests) =>{

        this.setState({
            currentInterests: interests
        })
    }

    handleAddInterest(){
        addInterest(getCurrentUserID(),this.state.interests)
        this.InterestTextInput.clear();
    }

    handleRemoveinterest = (interest) =>{
        removeInterest(getCurrentUserID(),interest)
        var index = this.state.currentInterests.indexOf(interest)
        this.setState({
            currentInterests: this.state.currentInterests.splice(index,1)
        })
        
    }

    render(){
    
        return(
            <SafeAreaView style={{flex:1}}>
            <View style = {AppStyles.screen}>
                <View style = {styles.content_container}>
                    <InterestTextInput ref = {ref => {this.InterestTextInput = ref}} style = {styles.text_input} retrieveInterestList= {this.interestParser} />
                    
                    <View style = {{alignItems: "center", justifyContent: "center"}}>
                        <OvalButton text = "Add Interests" handler={() => this.handleAddInterest()}/>
                    </View>

                    <Text>
                        Current Interests: 
                    </Text>
                    
                    <FlatList
                    data = {this.state.currentInterests}
                    renderItem={({ item }) => (
                            <InterstBar interest={item} handleDelete={this.handleRemoveinterest}/>
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

