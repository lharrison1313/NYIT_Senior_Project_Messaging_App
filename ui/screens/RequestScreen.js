import React, { Component } from 'react';
import {View, Text,StyleSheet,SafeAreaView, FlatList } from 'react-native';
import {retreiveRequests, getCurrentUserID} from '../../api/MessagingAppAPI'
import CircleButton from '../components/CircleButton'
import {AppStyles, color_a, color_b, color_c, color_d, color_e} from '../styles/AppStyles'
import Icon from 'react-native-vector-icons/FontAwesome';
import RequestBar from '../components/RequestBar'

export default class RequestScreen extends Component{    
    constructor(props){
        super(props)
        this.state = {
            friendRequestList: [],
            groupRequestList: [],
            requestSwitch: true
        }
        
    }

    componentDidMount(){
        retreiveRequests(getCurrentUserID(),this.retrieveRequestList).then((unsub)=>{
            this.unsbscribe = unsub;
        })
    }

    componentWillUnmount(){
        if(this.unsubscribe != null){
            this.unsubscribe();
        }
    }

    retrieveRequestList = (groupRequests, friendRequests) => {
        this.setState({
            friendRequestList: friendRequests,
            groupRequestList: groupRequests
        })
    }

    render(){
        var data = [];
        var group = <Icon name="group" size={25} color={color_a} />;
        var friend =  <Icon name="user" size={25} color={color_a} />;
        if(this.state.requestSwitch == true){
            data = this.state.groupRequestList;
            group = <Icon name="group" size={25} color={color_d} />;
        }
        else{
            data = this.state.friendRequestList;
            friend =  <Icon name="user" size={25} color={color_d} />;
        }

        return(
            <SafeAreaView style={{flex:1}}>
            <View style ={AppStyles.screen}>
                <View Style = {styles.content_container}>

                    <View style = {{flexDirection: "row", paddingVertical: 20}}>
                        <View style = {{flex: 1, alignItems: "center"}}>
                            <CircleButton icon = {group} handler = {() => this.setState({requestSwitch: true})}/>
                            <Text>Group Requests</Text>
                        </View>
                        <View style = {{flex: 1, alignItems: "center"}}>
                            <CircleButton icon = {friend} handler = {() => this.setState({requestSwitch: false})}/>
                            <Text>Friend Requests</Text>
                        </View>
                        
                    </View>

                    <FlatList
                    data = {data}
                    renderItem={({ item }) => (
                        <RequestBar
                            info = {item.info}
                            docID = {item.docID}
                        />
                        )}
                    keyExtractor = {item => item.docID}
                   />
                    
                </View>
            </View>
            </SafeAreaView>
        );
    }

}

const styles = StyleSheet.create({

    content_container: {
        padding: 20,
        flex: 1
    }
   

})

