import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, ScrollView} from 'react-native';
import MessageEditor from './MessageEditor'
import MessageArea from './MessageArea'




export default class MessagingScreen extends Component {

  constructor(props){
    super(props)
    this.state = {text: ""}
  }

  updateText = (input) => {this.setState({text: input})}
  
  buttonPressed = () => {
    alert(this.state.text)
    this.setState({text: ""})
  }

  render() {
    return (
      <View style={styles.content_container}>
        <MessageArea>
        </MessageArea>
        <MessageEditor button_handler={this.buttonPressed} update_text ={this.updateText}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  content_container:{
    flex:1,
    flexDirection: 'column',
  }
})