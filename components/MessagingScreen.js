import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, ScrollView} from 'react-native';
import MessageEditor from './MessageEditor'
import Message from './Message'




export default class MessagingScreen extends Component {

  constructor(props){
    super(props)
    this.state = { 
      text: "",
      messages: []
    }
  }

  updateText = (input) => {this.setState({text: input})}
  
  sendMessage = () => {
    if(this.state.text !== ''){
      //pushing new message into message array
      this.state.messages.push({sent: true, sender_name:'User', message_text: this.state.text})
      //updating state and clearing input text
      this.setState({
        messages: this.state.messages,
        text: ""
      })
      //scrolling to bottom
      this.refs._scrollView.scrollToEnd()
    }
  }

  render() {

    //creates the message elements in message state on render
    var messages = [];
    this.state.messages.forEach((element,key) => {
      //places user message on screen
      messages.push(<Message sent={element.sent} sender_name ={element.sender_name} message_text ={element.message_text}/>)
      //places a copy of the users message on screen
      messages.push(<Message sent={false} sender_name ={element.sender_name} message_text ={element.message_text}/>)
    });

    return (
      <View style={styles.content_container}>
        <ScrollView 
        style={styles.message_area_container} 
        ref='_scrollView' 
        >
          {messages}
        </ScrollView>
        <MessageEditor button_handler={this.sendMessage} update_text ={this.updateText}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  content_container:{
    flex:1,
    flexDirection: 'column',
    backgroundColor: '#5F6362',
  },
  message_area_container:{
    flex: 1,
    flexDirection: "column",
    backgroundColor: 'lightgrey',
    marginBottom: 15
  }
})