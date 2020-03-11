import React, { Component } from 'react';
import {View, TouchableOpacity, Text, StyleSheet,Button } from 'react-native';
import{withNavigation} from "react-navigation"


class GroupBar extends Component{
    constructor(props){
        super(props)
    }
    state={
        count:0
      }  
      incrementValue=() => {
      this.setState({count:this.state.count+1})
      }
      decrementValue=() => {
      this.setState({count:this.state.count-1})
      }

    render(){
    
        return(
            
            <View
            style = {styles.bar_container} 
            //passing group id to messaging screen
            >
               
                <View style={styles.header_container}>
                        <Text style = {{flex: 1}}>{this.props.location}</Text>
                    <Text style = {{flex: 1}}>{this.props.date.toString()}</Text>
                </View>
                <View style={styles.body_container}>
                    <View style={styles.left_container}>
                        <Text style ={styles.body_text}>{this.props.group_name}</Text>
                        {/* <Text style ={styles.body_text}>{this.props.group_Description}</Text> */}
                        <Text style ={styles.body_text}>{this.props.interests.join(" ")}</Text>
                    </View>

                    <View styles={styles.right_container}>
                        <TouchableOpacity style={styles.join_button} onPress={() => this.props.navigation.navigate('Message',{id: this.props.id})}>
                            <Text style ={styles.join_text}>Join</Text>
                        </TouchableOpacity>
                            
                            
                            {/* adding 
                            like and dislike buttons

                             */}
                        <TouchableOpacity style={styles.like_button} onPress={ this.incrementValue}>
                            <Text>like</Text> 
                            
                            </TouchableOpacity> 
                           
                            <Text style={{fontSize:19,color:"red"}}>{this.state.count}</Text>
                        <TouchableOpacity style={styles.dislike_button} onPress={ this.decrementValue}>
                            <Text>Dislike</Text>
                            </TouchableOpacity>

                            
                               
                    </View>
                </View>
            </View>
            
        );
    }

}

const styles = StyleSheet.create({
    bar_container:{
        flexDirection:'column',
        backgroundColor: '#00BED6',
        height: 100,
        padding:10,

        borderColor:"purple",

        borderWidth: 1

    },

    header_container:{
        flexDirection:'row',
        marginBottom:5
    },

    body_text:{
        marginBottom:10
    },
    left_container:{
        flexDirection:"column",
       flex:.75
       
    },
    right_container:{
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"center",
        flex:.25

    },
    body_container:{
        flexDirection:"row",
        flex:1
    },
    join_button:{
        backgroundColor:"blue",
        padding:5,
        borderRadius:10,
    },

    join_text:{
        color:"gold",
        fontWeight:"bold",
        fontSize:15
    },
    dislike_button:{
        backgroundColor:"red",
        padding:5,
        borderRadius:10,
        color:"gold",
    },
    like_button:{
        marginTop:10,
        backgroundColor:"white",
        padding:5,
        borderRadius:10,
        color:"gold",
    }


})

export default withNavigation(GroupBar)