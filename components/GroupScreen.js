import React, { Component } from 'react';
import {View, TouchableOpacity, Text, StyleSheet, Group } from 'react-native';
import GroupBar from './GroupBar'
import { FlatList, TextInput } from 'react-native-gesture-handler';
import firestore from '@react-native-firebase/firestore';

export default class GroupScreen extends Component{
    
    constructor(props){
        super(props)
        this.state = {
            groupList: []
        }
        this.ref = firestore().collection("Groups")
    }

    componentDidMount(){
        this.unsubscribe = this.ref.onSnapshot((querrySnapshot) => {
            const groups = []
            querrySnapshot.forEach((doc) =>{
                groups.push({
                    GroupName: doc.data().GroupName,
                    Date: doc.data().Date,
                    Location: doc.data().Location,
                    Interests: doc.data().Interests,
                    id: doc.id
                });
            });
            this.setState({
                groupList: groups.sort((a,b) => {
                    return (a.GroupName < b.GroupName);
                })
            });
            console.log("groups",groups)

        });
        

    }

    render(){
    
        return(
            <View style ={styles.container}>
                
                <View style={styles.search_container}>
                    
                </View>

                <View style = {styles.group_container} >
                    <FlatList
                        data = {this.state.groupList}
                        renderItem={({ item }) => (
                            <GroupBar
                                group_name = {item.GroupName} 
                                date = {item.Date}
                                location = {item.Location}
                                interests = {item.Interests}
                                id = {item.id}
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