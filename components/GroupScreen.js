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
        this.ref = firestore().collection("Groups").orderBy("GroupName")
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

    componentWillUnmount(){
        this.unsubscribe()
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
                        <Text>Create A Group</Text>
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