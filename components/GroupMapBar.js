import React, { Component } from 'react';
import {View, TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import{withNavigation} from "react-navigation"


class GroupMapBar extends Component{
    constructor(props){
        super(props)
    }

    render(){
    
        return(
            
            <View style = {styles.inner_container}>
                <View style={styles.header_container}>
                    <Text style = {{flex: 1, fontSize:12}}>{this.props.location}</Text>
                    <Text style = {{flex: 1, fontSize: 12}}>{this.props.date}</Text>
                </View>

                <View style={styles.body_container}>

                    <View style={styles.left_container}>
                        <Text style ={styles.body_text}>{this.props.group_name}</Text>
                        <Text style ={styles.body_text}>{this.props.interests.join(" ")}</Text>
                    </View>

                    <View style={styles.right_container}>
                        <TouchableOpacity style={styles.join_button}>
                            <Text>Join</Text>
                        </TouchableOpacity>
                    </View>
                    
                </View>
            </View>
            
            
        );
    }

}


const window = Dimensions.get('window');
const styles = StyleSheet.create({
    inner_container:{
        flexDirection:'column',
        flex:1,
        padding:10,
        width: window.width,
    },
    header_container:{
        flex: .25,
        flexDirection:'row',
        marginBottom:5
    },

    body_text:{
        marginBottom:10
    },
    left_container:{
        flexDirection:"column",
       flex:.75,
       
    },
    right_container:{
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"center",
        flex:.25,
    },
    body_container:{
        flexDirection:"row",
        flex:.75
    },
    join_button:{
        backgroundColor:"grey",
        padding:10,
        borderRadius:10
    }




})

export default withNavigation(GroupMapBar)