import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity} from 'react-native';

export default class MessageEditor extends Component{

    


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
                onChangeText={(text) => this.props.update_text(text)}
                />
            </View>

            <View style={styles.button_container}>
                <TouchableOpacity 
                style={styles.send_button}
                onPress={this.props.button_handler}>
                    <Text style={{color:'white'}}>
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
      flex:.10,
      flexDirection: 'row',
      justifyContent: 'center',
      marginBottom: 10,
      paddingLeft: 5,
      paddingRight: 5
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
      backgroundColor: 'lightgray',
      height: 50
    },
  
    send_button:{
      backgroundColor: 'green',
      alignItems: "center",
      justifyContent:"center",
      borderRadius:10,
      height: 50,
      marginLeft: 10
      
    },
    
    attatchments_button: {
      backgroundColor: 'grey',
      alignItems: "center",
      justifyContent:"center",
      height: 50
    }

  });
  