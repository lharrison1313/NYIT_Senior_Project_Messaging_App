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
            <View style ={styles.container}>
                <TextInput 
                    style = {styles.search_bar}
                    onChangeText = {(input)=>{this.textChanged(input)}}
                    placeholder = {"Search"}
                />
                {/* <FlatList
                    data = {this.state.friendList}
                    renderItem={({ item }) => (
                        <FriendBar
                            friend_name = {item.FriendName} 
                            interests = {item.Interests}
                            bar_style = {styles.bar_container}
                        />
                        )}
                    keyExtractor = {item => item.id}
                /> */}
                <FriendBar 

                />

                
            </View>

            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"grey"
    },

    bar_container:{
        flexDirection:'column',
        backgroundColor: '#00BED6',
        height: 120,
        padding: 10,
        borderColor:"grey",
        borderBottomWidth: 1
    },

    search_bar:{
        flex:.85,
        height:40, 
        backgroundColor: "white",
        borderRadius:30,
        marginHorizontal:5
    }
    

})


export default withNavigation(FriendScreen)