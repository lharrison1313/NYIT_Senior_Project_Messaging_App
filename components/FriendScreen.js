import React, { Component } from 'react';
import { StyleSheet, View, SafeAreaView, TouchableOpacity } from 'react-native';
import{withNavigation} from "react-navigation"
import { FlatList, TextInput} from 'react-native-gesture-handler';
import FriendBar from "./FriendBar"
import Icon from 'react-native-vector-icons/FontAwesome';

const plus = <Icon name="plus-circle" size={40} color="#00BED6" />;

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
                            friend_name = {item.FriendName} 
                            interests = {item.Interests}
                            bar_style = {styles.bar_container}
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