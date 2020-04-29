import React, { Component } from 'react';
import { TextInput, StyleSheet, View,Text  } from 'react-native';



export default class InterestTextInput extends Component{
    constructor(props){
        super(props)
        this.state = {
            interestBlips: [],
            keys: 0,
            text: ""
        }
        this.keys = 0;
    }

    interestParser = (text)=> {
        //converts text input to array
        var interestBlipsList = []
        if(text != ""){
            text.split(/[,\s]/).forEach(element => {
                var hash = "#"
                //creates little interest blips
                interestBlipsList.push(<Text key = {this.keys} style = {styles.interestBlipsText}>{hash.concat(element)}</Text>)
                this.keys = this.keys+1
            });
        }
        else{
            this.keys = 0;
        }
        this.setState({
            interestBlips:  interestBlipsList,
            text: text
        })
        this.props.retrieveInterestList(text)
    }

    clear = () =>{
        this.setState({
            interestBlips: [],
            text: ""
        })
    }

    render(){
    
        return(
            <View>
                <TextInput
                style = {this.props.style} 
                onChangeText = {(text) => this.interestParser(text)}
                value = {this.state.text}
                placeholder = {"Enter Interests"}
                />
                <View style = {{flexDirection:"row"}}>
                    {this.state.interestBlips}
                </View>
            </View>
        );
    }

}

const styles = StyleSheet.create({

    interestBlipsText:{
        backgroundColor: "#00BED6",
        padding:5,
        margin: 2,
        borderRadius: 5,
    }
    

})