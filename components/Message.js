import React, { Component } from 'react';
import { Text, StyleSheet, View} from 'react-native';

export default class Message extends Component{

    render(){
        if(this.props.sent){
            return(
                <View style={styles.sent_message_container}>
                    <Text style={{color:"white"}}>{this.props.sender_name}: {this.props.message_text}</Text>
                </View>
            );
        }
        else{
            return(
                <View style={styles.recieved_message_container}>
                    <Text style={{color:"white"}}>{this.props.sender_name}: {this.props.message_text}</Text>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    sent_message_container:{
        alignSelf: 'flex-end',
        backgroundColor: "#5F6362",
        padding: 20,
        marginLeft:120,
        marginRight:20,
        marginBottom: 10,
        marginTop: 10,
        borderRadius: 10
    },

    recieved_message_container:{
        alignSelf: 'flex-start',
        backgroundColor: "#00BED6",
        padding: 20,
        marginLeft: 20,
        marginRight:120,
        marginBottom: 10,
        marginTop: 10,
        borderRadius: 10

    }
});
