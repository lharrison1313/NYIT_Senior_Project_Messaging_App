import React, { Component } from 'react';
import {View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AppStyles, color_a, color_b, color_c, color_d } from '../styles/AppStyles';
import { round } from 'react-native-reanimated';
import {removeInterest, getCurrentUserID} from "../../api/MessagingAppAPI"

const deleteIcon = <Icon name="trash" size={25} color= {color_a} />;

export default class InterestBar extends Component{
    constructor(props){
        super(props)
        this.state={
            
        } 

    }

    render(){
    
        return(
            <View style = {styles.bar_container}>

                <View style = {{flex:.80}}>
                    <Text>
                        {this.props.interest}
                    </Text>
                </View>

                <View style = {{flex:.20, flexDirection: "row"}}>
                    <TouchableOpacity style={{flex:1, marginHorizontal: 5}} onPress = {() => this.props.handleDelete(this.props.interest)}>
                        {deleteIcon}
                    </TouchableOpacity>
                </View>

            </View>
        );
    }

}


const styles = StyleSheet.create({
    bar_container:{
        height:75,
        backgroundColor: color_b,
        flexDirection:"row",
        borderBottomWidth: 1,
        borderColor: color_a,
        padding: 20
    }
})
