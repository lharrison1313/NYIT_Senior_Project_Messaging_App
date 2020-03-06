import React, { Component } from 'react';
import {View, TouchableOpacity, Text, StyleSheet, Group } from 'react-native';
import GroupBar from './GroupBar'
import { FlatList, TextInput} from 'react-native-gesture-handler';
import{withNavigation} from "react-navigation";

 class GroupScreen extends Component{
    
    constructor(props){
        super(props)
        this.state = {
            groupList: [],
            text: ''
        }
        //getting group retrival function from navigation
        this.getGroups = this.props.navigation.state.params.getGroupsFunc
    }

    componentDidMount(){
        this.getGroups(this.retrieveGroups)
        .then((unsub) => {
            this.unsubscribe = unsub
            console.log("subscribe")})
        .catch((error)=> console.log("GroupScreen: ",error))
    }

    componentWillUnmount(){
        if(this.unsubscribe != null){
            console.log("unsubscribe")
            this.unsubscribe()
        }
    }

    componentDidUpdate(){
        if(this.state.text == ""){
            this.unsubscribe()
            this.getGroups(this.retrieveGroups).then((unsub) => this.unsubscribe = unsub )
        }
        else{
            this.unsubscribe()
            this.getGroups(this.retrieveGroups,this.state.text).then((unsub) => this.unsubscribe = unsub )
        }
    }

    retrieveGroups = (groups) => {
        this.setState({
            groupList: groups
        });
    }

    textChanged = (input) =>{
            this.setState({text: input, groupList:[]})
    }

    render(){
    
        return(

            <View style ={styles.container}>

                
                <TextInput 
                style = {{height:50, backgroundColor: "white"}}
                onChangeText = {(input)=>{this.textChanged(input)}}
                />
                
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
                
                <TouchableOpacity 
                style = {styles.new_group_button} 
                onPress={() => this.props.navigation.navigate('CreateGroup')}>
                    <Text style={{color:"black", fontSize:20}}>+</Text>
                </TouchableOpacity>
                
                
                
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#5F6362"
    },

    new_group_button:{
        backgroundColor: "green",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 100,
        bottom: 15,
        right: 15
    }

})

export default withNavigation(GroupScreen)