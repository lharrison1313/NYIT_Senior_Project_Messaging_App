import React, { Component } from 'react';
import { StyleSheet, View, SafeAreaView, TouchableOpacity } from 'react-native';
import{withNavigation} from "react-navigation"
import { FlatList, TextInput} from 'react-native-gesture-handler';
import {getUsers} from "../../api/MessagingAppAPI"
import FriendBar from '../components/FriendBar';
import Icon from 'react-native-vector-icons/FontAwesome';

const plus = <Icon name="plus-circle" size={40} color="#00BED6" />;

class FriendScreen extends Component{
    constructor(props) {
        super(props);
        this.state = { 
            friendList: [],
            text: ''
        };
    }

    // componentDidMount(){
    //     getFriendss(this.retrieveFriends,null)
    //     .then((unsub) => {
    //         this.unsubscribe = unsub
    //         console.log("subscribe")})
    //     .catch((error)=> console.log("FriendScreen: ",error))
    // }

    // componentWillUnmount(){
    //     if(this.unsubscribe != null){
    //         console.log("unsubscribe")
    //         this.unsubscribe()
    //     }
    // }

    retrieveUsers = (users) => {
        this.setState({
            // friendList: Friends
        });
    }

    render() {
        return (
            <SafeAreaView style={{flex:1}}>
            <View style ={styles.container}>

                <View style={styles.header_container}>
                    <TextInput 
                    style = {styles.search_bar}
                    onChangeText = {(input)=>{this.textChanged(input)}}
                    placeholder = {"Search"}
                    />

                    <TouchableOpacity 
                    style = {styles.new_friend_button} 
                    onPress={() => this.props.navigation.navigate('AddFriends')}>
                        {plus}
                    </TouchableOpacity>
                </View>

                <FlatList
                    data = {this.state.friendList}
                    renderItem={({ item }) => (
                        <FriendBar
                            name = {item.UserName} 
                            interests = {item.Interests}
                        />
                        )}
                    keyExtractor = {item => item.id}
                />

                
            </View>

            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    header_container:{
        flexDirection:"row",
        alignItems: "center",
        padding:15
    },

    container:{
        flex:1,
        backgroundColor:"grey"
    },

    new_friend_button:{
        flex:.15,
        backgroundColor: "grey",
        justifyContent: "center",
        alignItems: "center",
        height:40,
        width: 40,
        borderRadius: 20,
        marginHorizontal:5
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