import React, { Component } from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import{withNavigation} from "react-navigation"
import FriendBar from "./FriendBar"
class FriendScreen extends Component{
    constructor(props) {
        super(props);
        this.state = { 
        };
    }

    

    render() {
        return (
            <SafeAreaView style={{flex:1}}>
            <View>
            <TextInput 
                    style = {styles.search_bar}
                    onChangeText = {(input)=>{this.textChanged(input)}}
                    placeholder = {"Search"}
                    />

            </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    

})


export default withNavigation(FriendScreen)