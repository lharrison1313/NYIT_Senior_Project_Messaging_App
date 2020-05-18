import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, ScrollView, Alert} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import {addUserToGroup,getCurrentUserID, createGroupRequest, deleteGroup, removeUserFromGroup, getUserInfo} from "../../api/MessagingAppAPI";
import Icon from 'react-native-vector-icons/FontAwesome';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import {AppStyles, color_b, color_c} from "../styles/AppStyles"
import OvalButton from "../components/OvalButton"




export default class GroupInfoScreen extends Component{
    
    constructor(props) {
        super(props)
        this.state = {
            name: ""
        }
        this.gid = this.props.route.params.id;
        this.info = this.props.route.params.info;
        this.date = this.props.route.params.date;
        
    }

    componentDidMount(){
        getUserInfo(getCurrentUserID(), this.userInfoRetrieved)
    }
 
    userInfoRetrieved = (info) =>{
        this.setState({name: info.UserName});
    }

    handlejoin = () => {
        addUserToGroup(getCurrentUserID(),this.gid)
        this.props.navigation.navigate('Message',{id: this.gid});
    }

    handleSendRequest = () =>{
        console.log(this.state.name)
        createGroupRequest(getCurrentUserID(),this.gid,this.info.GroupOwner,this.info.GroupName,this.state.name);
        this.props.navigation.goBack()
    }

    handleDelete = () =>{
        Alert.alert(
            "Confirm Delete",
            "Are you sure you want to delete the group? This action is permanant.",
            [
                { text: "Cancel", style:"cancel"},
                { text: "Delete", onPress: ()=>{
                    deleteGroup(this.gid,getCurrentUserID());
                    this.props.navigation.goBack();
                } }

            ]

        )
        
    }

    handleLeave = () =>{
        Alert.alert(
            "Confirm Leave",
            "Are you sure you want to leave the group?",
            [
                { text: "Cancel", style:"cancel"},
                { text: "Leave", onPress: ()=>{
                    removeUserFromGroup(getCurrentUserID(),this.gid);
                    this.props.navigation.goBack();
                } }

            ]

        )
    }

    handleMessage = () =>{
        this.props.navigation.navigate('Message',{id: this.gid});
    }
    

    renderButtons = () =>{
        var uid = getCurrentUserID()
        var users = this.info.GroupUsers;
        //the user is the owner
        if(uid == this.info.GroupOwner){
            return(
                <View>
                    <OvalButton text = "Messages" handler = {() => this.handleMessage()}/>
                    <OvalButton text = "Delete Group" handler = {() => this.handleDelete()}/>
                    <OvalButton text = "Invite Friends" handler={() => this.props.navigation.navigate('InviteFriend',{id: this.gid, groupName: this.info.GroupName})}/>
                </View>
            );
        }
        // the user is  a member
        else if(users.includes(uid) && this.info.Private){
            return(
                <View>
                    <OvalButton text = "Messages" handler = {() => this.handleMessage()}/>
                    <OvalButton text = "Leave Group" handler = {() => this.handleLeave()}/>
                </View>
            )
        }
        else if(users.includes(uid) && !this.info.Private){
            return(
                <View>
                    <OvalButton text = "Messages" handler = {() => this.handleMessage()}/>
                    <OvalButton text = "Leave Group" handler = {() => this.handleLeave()}/>
                    <OvalButton text = "Invite Friends" handler={() => this.props.navigation.navigate('InviteFriend',{id: this.gid, groupName: this.info.GroupName})}/>
                </View>
            )
        }
        //the user is pending for group membership
        else if(this.info.PendingGroupUsers.includes(getCurrentUserID()) && this.info.Private){
            return(
            <View>
                <OvalButton text = "Request is pending" />
            </View>
            )
        }
        //the group is private
        else if(this.info.Private){
            return(
            <View>
                <OvalButton text = "Send a Join Request" handler = {() => this.handleSendRequest()} />
            </View>
            );
        }
        //the group is public
        else{
            return(
                <OvalButton text = "Join Group" handler = {() => this.handlejoin()}/>
            );
        }
    }

    renderMap(){
        if(this.info.Coordinates != null){
            
            var initialCoordinates = {
                latitude: this.info.Coordinates.latitude,
                longitude: this.info.Coordinates.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            }
            
            return(
            <MapView
                provider = {PROVIDER_GOOGLE}
                style = {styles.map}
                scrollEnabled = {false}
                zoomEnabled = {false}
                zoomControlEnabled = {false}
                zoomTapEnabled = {false}
                pitchEnabled = {false}
                rotateEnabled = {false}
                initialRegion={initialCoordinates}
                
            >
                <Marker
                    coordinate = {this.info.Coordinates}
                />
            </MapView>
            )
        }
    }

    
    render() {
        return (
            <SafeAreaView style = {{flex:1}}>
            <View style = {AppStyles.screen} >
                <ScrollView contentContainerStyle = {styles.content_container}>
                    <Icon name="group" size={100} color={color_c}/>
                    <View style = {{margin:30}}>
                        <Text style = {styles.text}>
                            Group: {this.info.GroupName}
                        </Text>

                        <Text style = {styles.text}>
                            Location: {this.info.Location}
                        </Text>

                        <Text style = {styles.text}>
                           Date: {this.date}
                        </Text>
                    
                        <Text style = {styles.text}>
                            Interests: {this.info.Interests.join(" ")}
                        </Text>

                        <Text style = {styles.text}>
                            Description: {this.info.Description}
                        </Text>
                    </View>

                    {this.renderMap()}
                    {this.renderButtons()}

                    
                    
                </ScrollView>

            </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
   
    content_container:{
        alignItems: "center", 
        justifyContent: "center",
        padding: 20
    },

    text: {
        margin: 3
    },

    map:{
        height: 200,
        width: 300,
        marginVertical: 10
    }

})

