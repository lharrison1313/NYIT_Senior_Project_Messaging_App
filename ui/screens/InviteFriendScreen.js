import React, { Component } from 'react';
import { StyleSheet, View, SafeAreaView, TouchableOpacity } from 'react-native';
import CircleButton from "../components/CircleButton"
import { FlatList, TextInput} from 'react-native-gesture-handler';
import {getFriends, getCurrentUserID} from "../../api/MessagingAppAPI"
import FriendBar from '../components/FriendBar';
import {AppStyles, color_a, color_b, color_c, color_e} from "../styles/AppStyles"



export default class InviteFriendScreen extends Component{
    constructor(props) {
        super(props);
        this.state = { 
            friendList: [],
            text: ''
        };
    }

    componentDidMount(){
        getFriends(this.retrieveFriends,getCurrentUserID(),null)
        .then((unsub) => {
            this.unsubscribe = unsub
            console.log("subscribe")})
        .catch((error)=> console.log("FriendScreen: ",error))
    }

    componentWillUnmount(){
        if(this.unsubscribe != null){
            console.log("unsubscribe")
            this.unsubscribe()
        }
    }

    retrieveFriends = (users) => {
        this.setState({
            friendList: users
        });
    }


    render() {
        return (
            <SafeAreaView style={{flex:1}}>
            <View style ={AppStyles.screen}>

                <View style={styles.header_container}>

                    <TextInput 
                    style = {styles.search_bar}
                    onChangeText = {(input)=>{this.setState({text: input})}}
                    placeholder = {"Search"}
                    />

                </View>

                <FlatList
                    data = {this.state.friendList}
                    renderItem={({ item }) => (
                        <FriendBar
                            name = {item.UserName} 
                            id = {item.id}
                            interests = {item.Interests}
                            isInvite = {true}
                            isFriend = {false}
                            gid = {this.props.route.params.id}
                            groupName = {this.props.route.params.groupName}
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
        marginHorizontal:5
    },

    search_bar:{
        flex:.85,
        height:40, 
        backgroundColor: color_c,
        borderRadius:30,
        marginHorizontal:5
    }
    

})
