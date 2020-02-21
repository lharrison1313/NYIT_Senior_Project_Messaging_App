import React, { Component } from 'react';
import { View, StyleSheet} from 'react-native';
import MessageEditor from './MessageEditor'
import Message from './Message'
import { FlatList } from 'react-native-gesture-handler';
import firestore from '@react-native-firebase/firestore';
import{withNavigation} from "react-navigation"



 class MessagingScreen extends Component {

  constructor(props){
    super(props)
    this.state = { 
      text: "",
      messageList: []
    }
    //getting collection name from selected group bar
    this.ref = firestore().collection(this.props.navigation.state.params.id)
  }

  componentDidMount(){
    this.unsubscribe = this.ref.onSnapshot((querrySnapshot) => {
        const messages = []
        querrySnapshot.forEach((doc) =>{
            messages.push({
                senderName: doc.data().senderName,
                sent: doc.data().sent,
                messageText: doc.data().messageText,
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
              sent = {item.sent}
              sender_name = {item.senderName}
              message_text = {item.messageText}
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