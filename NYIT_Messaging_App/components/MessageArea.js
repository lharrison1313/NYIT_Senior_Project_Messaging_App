import React, { Component } from 'react';
import {StyleSheet, ScrollView} from 'react-native';

export default class MessageArea extends Component{
    render(){
        return(
            <ScrollView style={styles.message_area_container}>
            {this.props.children}
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    message_area_container:{
      flex: 1,
      flexDirection: "column",
      backgroundColor: 'lightgrey'
    },
  
  });