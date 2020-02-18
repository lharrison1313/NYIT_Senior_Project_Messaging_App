import React, { Component } from 'react';
import {View, TouchableOpacity, Text, StyleSheet, Group } from 'react-native';
import GroupBar from './GroupBar'
import { FlatList, TextInput } from 'react-native-gesture-handler';

const DATA = [
    {
        location: "Location1" ,
        date: "Date1",
        groupName: "Group Name 1",
        interests: "interests1",
        id: "1"
    },
    {
        location: "Location2" ,
        date: "Date2",
        groupName: "Group Name2",
        interests: "interests2",
        id: "2"
    },
    
  ];

export default class GroupScreen extends Component{
    
    constructor(props){
        super(props)
    }

    render(){
    
        return(
            <View style ={styles.container}>
                
                <View style={styles.search_container}>
                    
                </View>

                <View style = {styles.group_container} >
                    <FlatList
                        data = {DATA}
                        renderItem={({ item }) => (
                            <GroupBar
                                location = {item.location}
                                interests = {item.interests}
                                group_name = {item.groupName} 
                                date = {item.date}
                            />
                          )}
                        keyExtractor = {item => item.id}
                    
                    />
                
                </View>
                
                <View style={styles.modify_container}>

                </View>
                
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#5F6362"
    },
    
    group_container:{
        flex:6,
    },
    search_container:{
        flex:0.5,
    },
    modify_container:{
        flex:0.5,
    }
        

})