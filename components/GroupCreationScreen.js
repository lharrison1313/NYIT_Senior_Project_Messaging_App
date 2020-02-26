import React, { Component } from 'react';
import {View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {createGroup} from  "../api/MessagingAppAPI"
import{withNavigation} from "react-navigation";


class GroupCreationScreen extends Component{

    constructor(props){
        super(props)
        this.state = {
            groupName: ""
        }
    }

    buttonHandler = ()=> {
        createGroup(this.state.groupName)
        this.props.navigation.pop()
    }

    render(){
        return(
            <View>
                <TextInput 
                placeholder="Enter group name"
                onChangeText = {(text)=>this.setState({groupName: text})}/>
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
    }
    

})

export default withNavigation(GroupCreationScreen)