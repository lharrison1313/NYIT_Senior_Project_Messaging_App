import React, { Component } from 'react';
import {View, StyleSheet,SafeAreaView, FlatList } from 'react-native';
import {retreiveRequests, getCurrentUserID} from '../../api/MessagingAppAPI'
import CircleButton from '../components/CircleButton'
import {AppStyles, color_a, color_b, color_c, color_d, color_e} from '../styles/AppStyles'
import Icon from 'react-native-vector-icons/FontAwesome';
import RequestBar from '../components/RequestBar'



const group =<Icon name="group" size={25} color={color_a} />;
const friend = <Icon name="user" size={25} color={color_a} />;

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
        var group = <Icon name="group" size={25} color={color_c} />;
        var friend =  <Icon name="user" size={25} color={color_c} />;
        if(this.state.requestSwitch == true){
            data = this.state.groupRequestList;
            group = <Icon name="group" size={25} color={color_a} />;
        }
        else{
            data = this.state.friendRequestList;
            friend =  <Icon name="user" size={25} color={color_a} />;
        }

        return(
            <SafeAreaView style={{flex:1}}>
            <View style ={AppStyles.screen}>
                <View Style = {styles.content_container}>

                    <View style = {{flexDirection: "row", backgroundColor: color_c, paddingVertical: 20}}>
                        <View style = {{flex: 1, alignItems: "center"}}>
                            <CircleButton icon = {group} handler = {() => this.setState({requestSwitch: true})}/>
                        </View>
                        <View style = {{flex: 1, alignItems: "center"}}>
                            <CircleButton icon = {friend} handler = {() => this.setState({requestSwitch: false})}/>
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

