import React, { Component } from 'react';
import { View, StyleSheet} from 'react-native';
import MessageEditor from './MessageEditor'
import Message from './Message'
import { FlatList } from 'react-native-gesture-handler';
import firestore from '@react-native-firebase/firestore';
import{withNavigation} from "react-navigation"
import{sendMessage,getUserInfo,getCurrentUserID} from "../api/MessagingAppAPI"

class MessagingScreen extends Component {

  constructor(props){
    super(props)
    this.state = { 
      text: "",
      messageList: [],
      userName: ""
    }
    this.id = this.props.navigation.state.params.id
    this.uid = getCurrentUserID()
    this.ref = firestore().collection("Groups").doc(this.id).collection("Messages").orderBy("TimeStamp") 
  }

  componentDidMount(){
    this.unsubscribe = this.ref.onSnapshot((querrySnapshot) => {
        const messages = []
        querrySnapshot.forEach((doc) =>{
            messages.push({
                SenderName: doc.data().SenderName,
                MessageText: doc.data().MessageText,
                SenderID: doc.data().SenderID,
                GroupID: doc.id
            });
        });
        this.setState({
           messageList: messages
        });
    });
    getUserInfo(this.uid,this.updateUserInfo)
  }

  componentWillUnmount(){
    this.unsubscribe()
  }

  updateUserInfo = (input) =>{this.setState({userName: input.UserName})}

  updateText = (input) => {this.setState({text: input})}
  
  sendMessage = () => {
    if(this.state.text !== ''){
      sendMessage(this.id,this.state.text,this.state.userName,this.uid)
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
              sent = {this.uid === item.SenderID}
            />
          )}
          keyExtractor = {item => item.GroupID}
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