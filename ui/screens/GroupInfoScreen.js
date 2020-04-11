import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, ScrollView} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import {addUserToGroup,isInGroup,isGroupOwner,getCurrentUserID,removeUserFromGroup,deleteGroup} from "../../api/MessagingAppAPI";
import Icon from 'react-native-vector-icons/FontAwesome';
import MapView from 'react-native-maps';
import {AppStyles, color_b, color_c} from "../styles/AppStyles"
import OvalButton from "../components/OvalButton"




export default class GroupInfoScreen extends Component{
    
    constructor(props) {
        super(props)
        this.state = {

        }
        this.gid = this.props.route.params.id
    }

    handlejoin = () => {
        addUserToGroup(getCurrentUserID(),this.gid)
        this.props.navigation.navigate('Message',{id: this.props.id})
    }

    
    render() {
        return (
            <SafeAreaView style = {{flex:1}}>
            <View style = {AppStyles.screen} >
                <ScrollView contentContainerStyle = {styles.content_container}>
                    <Icon name="group" size={100} color="white"/>
                    
                    <Text>
                        Group Name
                    </Text>

                    <Text>
                        Description
                    </Text>

                    <Text>
                        Interests
                    </Text>

                    <Text>
                        Users
                    </Text>

                    <MapView>

                    </MapView>

                    <OvalButton text = "Join Group" handler = {() => this.handlejoin()}/>

                    
                </ScrollView>

            </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
   
    content_container:{
        flex: 1,
        alignItems: "center", 
        justifyContent: "center",
    },

})

