import React, { Component } from 'react';
import {View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import {signOut} from '../api/MessagingAppAPI'


export default class TestScreen extends Component{
    
    constructor(props){
        super(props)
    }

    

    render(){
    
        return(
            <View style ={styles.container}>
                <Text>
                    Hello world
                </Text>
                <TouchableOpacity style ={styles.button} onPress = {() => this.props.navigation.navigate('Message')}>
                    <Text>This is a button</Text>
                </TouchableOpacity>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection: 'row',
        backgroundColor: "blue",
        justifyContent: 'center',
        alignItems: 'flex-start'

    },

    button:{
        backgroundColor:'red',
        borderRadius: 10,
        marginHorizontal: 10,

    },

    
})