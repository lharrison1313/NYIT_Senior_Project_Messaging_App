import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import {addUserToGroup,getCurrentUserID,isInGroup,isGroupOwner,getCurrentUserID,removeUserFromGroup,deleteGroup} from '../api/MessagingAppAPI';
import Icon from 'react-native-vector-icons/FontAwesome';
import MapView from 'react-native-maps';



export default class GroupInfoScreen extends Component{
    
    constructor(props) {
        this.state ={
           
        }
    }

    
    render() {
        return (
            <SafeAreaView>
            <View>
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

                <TouchableOpacity>
                    <Text>Join</Text>
                </TouchableOpacity>
                

            </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
   
    Container:{
        flex: 1,
        backgroundColor: "grey",
        alignItems: "center", 
        justifyContent: "center",
    },

    button:{
        backgroundColor: '#00BED6',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        height: 50,
        width: 300,
        margin: 10
    },

})

