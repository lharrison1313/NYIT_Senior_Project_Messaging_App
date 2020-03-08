import React, { Component } from 'react';
import {View, TouchableOpacity, Text, StyleSheet, Group } from 'react-native';
import GroupBar from './GroupBar'
import { FlatList} from 'react-native-gesture-handler';
import{withNavigation} from "react-navigation";
import firestore from '@react-native-firebase/firestore';

 class GroupScreen extends Component{
    
    constructor(props){
        super(props)
        this.state = {
            groupList: []
        }
        //getting group retrival function from navigation
        this.getGroups = this.props.navigation.state.params.getGroupsFunc
    }

    componentDidMount(){
        this.getGroups(this.retrieveGroups).then( (unsub) => this.unsubscribe = unsub )
    }

    componentWillUnmount(){
        this.unsubscribe()
    }

    retrieveGroups = (groups) => {
        this.setState({
            groupList: groups
        });
        console.log("groups",groups)
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
                
                <View style={styles.new_group_container}>
                    <TouchableOpacity 
                    style = {styles.new_group_button} 
                    onPress={() => this.props.navigation.navigate('CreateGroup')}>
                        <Text>Create New Group</Text>
                    </TouchableOpacity>
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
    new_group_container:{
        flex:.75,
    },
    new_group_button:{
        flex: 1,
        backgroundColor: "grey",
        justifyContent: "center",
        alignItems: "center"
    }
})

export default withNavigation(GroupScreen)