import React, { Component } from 'react';
import { StyleSheet, View, SafeAreaView, TouchableOpacity } from 'react-native';
import{withNavigation} from "react-navigation"
import { FlatList, TextInput} from 'react-native-gesture-handler';
import {getUsers, getCurrentUserID, getUserInfo} from "../../api/MessagingAppAPI"
import FriendBar from "../components/FriendBar"
import {AppStyles, color_a, color_b, color_c, color_e} from "../styles/AppStyles"
import Icon from 'react-native-vector-icons/FontAwesome';

const plus = <Icon name="plus-circle" size={40} color="#00BED6" />;

export default class AddFriendScreen extends Component{
    constructor(props) {
        super(props);
        this.state = { 
            friendList: [],
        };
    }

    componentDidMount(){
        getUsers(this.retrieveUsers,getCurrentUserID(),null)
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

    textChanged = (input) =>{
        this.setState({friendList:[]})
        if(input == ""){
            this.unsubscribe()
            getUsers(this.retrieveUsers,getCurrentUserID(),null).then((unsub) => this.unsubscribe = unsub )
        }
        else{
            this.unsubscribe()
            getUsers(this.retrieveUsers,getCurrentUserID(),input).then((unsub) => this.unsubscribe = unsub )
        }
    }

    retrieveUsers = (users) => {
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
                    onChangeText = {(input)=>{this.textChanged(input)}}
                    placeholder = {"Search"}
                    />
                </View>

                <FlatList
                    data = {this.state.friendList}
                    renderItem={({ item }) => (
                        <FriendBar
                            name = {item.UserName} 
                            id = {item.id}
                            navigation = {this.props.navigation}
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
        flex:1,
        height:40, 
        backgroundColor: color_c,
        borderRadius:30,
        marginHorizontal:5
    }
    

})

