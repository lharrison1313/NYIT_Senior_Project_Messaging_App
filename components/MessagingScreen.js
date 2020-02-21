import React, { Component } from 'react';
import { View, StyleSheet} from 'react-native';
import MessageEditor from './MessageEditor'
import Message from './Message'
import { FlatList } from 'react-native-gesture-handler';
import firestore from '@react-native-firebase/firestore';
import{withNavigation} from "react-navigation"
import{sendMessage} from "../api/MessagingAppAPI"



 class MessagingScreen extends Component {

  constructor(props){
    super(props)
    this.state = { 
      text: "",
      messageList: []
    }
    //getting collection name from selected group bar
    this.id = this.props.navigation.state.params.id
    this.ref = firestore().collection("Groups").doc(this.id).collection("Messages").orderBy("TimeStamp")
  }

  componentDidMount(){
    this.unsubscribe = this.ref.onSnapshot((querrySnapshot) => {
        const messages = []
        querrySnapshot.forEach((doc) =>{
            messages.push({
                SenderName: doc.data().SenderName,
                MessageText: doc.data().MessageText,
                id: doc.id
            });
        });
        this.setState({
           messageList: messages
        });
    });

  }

  updateText = (input) => {this.setState({text: input})}
  
  sendMessage = () => {
    if(this.state.text !== ''){
      sendMessage(this.id,this.state.text,"username")
      //updating state and clearing input text
      this.setState({
        text: ""
      })
    }
  }

  render() {

    return (
      <View style={styles.content_container}>
        <FlatList
          style={styles.message_area_container} 
          data = {this.state.messageList}
          renderItem = {({item}) => (
            <Message
              sender_name = {item.SenderName}
              message_text = {item.MessageText}
            />
          )}
          keyExtractor = {item => item.id}
        />
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

export default withNavigation(MessagingScreen)