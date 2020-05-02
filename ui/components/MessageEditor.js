import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import { AppStyles, color_a, color_b, color_c, color_d } from '../styles/AppStyles';

export default class MessageEditor extends Component{

    constructor(props){
        super(props)
        this.state = {
            text: ""
        }
    }

    handleSend = () =>{
        this.props.button_handler()
        this.setState({text: ''});
        this.textInput.clear()
    }

    handleTextInput = (text) =>{
        this.props.update_text(text);
    }

    render(){
        return(
        <View style={styles.message_editor}>

            <View style={styles.attatchments_button_container}>
                <TouchableOpacity style={styles.attatchments_button}>
                </TouchableOpacity>
            </View>

            <View style={styles.text_box_container}>
                <TextInput 
                style={styles.text_box} 
                placeholder = "Send Message"
                multiline
                numberOfLines = {30}
                onChangeText={(text) => this.handleTextInput(text)}
                ref={input => { this.textInput = input }}
                />
            </View>

            <View style={styles.button_container}>
                <TouchableOpacity 
                style={styles.send_button}
                onPress={this.handleSend}>
                    <Text style={{color:'black'}}>
                        send 
                    </Text>
                </TouchableOpacity>
            </View>

        </View>
        );
    }
}

const styles = StyleSheet.create({
  
    message_editor:{
      flex:.15,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingLeft: 10,
      paddingRight: 10,
      backgroundColor: color_a,
      marginBottom: 15
    },

    text_box_container:{
        flex: 3,
    },

    button_container:{
        flex: .75,
    },

    attatchments_button_container:{
        flex: .50,
    },
  
    text_box:{
      backgroundColor: color_c,
      height: 50
    },
  
    send_button:{
      backgroundColor: color_b,
      alignItems: "center",
      justifyContent:"center",
      borderRadius:10,
      height: 50,
      marginLeft: 10
      
    },
    
    attatchments_button: {
      backgroundColor: color_c,
      alignItems: "center",
      justifyContent:"center",
      height: 50
    }

  });
  