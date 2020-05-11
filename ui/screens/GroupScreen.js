import React, { Component } from 'react';
import {View, StyleSheet,SafeAreaView } from 'react-native';
import GroupBar from '../components/GroupBar';
import { FlatList, TextInput} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import CircleButton from '../components/CircleButton';
import {AppStyles, color_a, color_b, color_c, color_d, color_e} from '../styles/AppStyles'
import messaging from '@react-native-firebase/messaging';
import { getCurrentUserGroups, getGroupInfo } from '../../api/MessagingAppAPI';


const plus = <Icon name="plus-circle" size={25} color= {color_a} />;

export default class GroupScreen extends Component{    
    constructor(props){
        super(props)
        this.state = {
            groupList: [],
            text: '',
            notificationGroup: {}
        }
        this.getGroups = this.props.get_groups_functions
    }

    componentDidMount(){
        this.getGroups(this.retrieveGroups)
        .then((unsub) => {
            this.unsubscribe = unsub
        })
        .catch((error)=> console.log("GroupScreen: ",error))


        //handling notifications reception
        messaging().getInitialNotification().then( remoteMessage => {
            if(remoteMessage.data.type == "message"){
                this.props.navigation.navigate("Message",{id: remoteMessage.data.gid})
            }
            else if(remoteMessage.data.type == "group"){
                this.props.navigation.navigate("GroupNotification",{gid: remoteMessage.data.gid, name: remoteMessage.data.name, location: remoteMessage.data.location, description: remoteMessage.data.description})
            }
          }
        ).catch(error =>{
            console.log(error)
        })
        
    }

    componentWillUnmount(){
        if(this.unsubscribe != null){
            this.unsubscribe()
        }
    }

    retrieveGroups = (groups) => {
        this.setState({
            groupList: groups
        });
    }

    textChanged = (input) =>{
        this.setState({groupList:[]})
        if(input == ""){
            this.unsubscribe()
            this.getGroups(this.retrieveGroups).then((unsub) => this.unsubscribe = unsub )
        }
        else{
            this.unsubscribe()
            this.getGroups(this.retrieveGroups,input).then((unsub) => this.unsubscribe = unsub )
        }
    }

    renderBar = (item) =>{
        var color = ""
        if(!item.Info.Visible){
            color = "orange"
        }
        else if(item.Info.Private){
            color = color_e   
        }
        else{
            color = color_b
        }
        var style = {
            flexDirection:'column',
            backgroundColor: color,
            height: 120,
            padding: 10,
            borderColor: color_a,
            borderBottomWidth: 1
        }

        return(<GroupBar
            info = {item.Info}
            date = {item.Date}
            id = {item.id}
            bar_style = {style}
            navigation = {this.props.navigation}
        />)
    }

    render(){
    
        return(
            <SafeAreaView style={{flex:1}}>
            <View style ={AppStyles.screen}>

                <View style={styles.header_container}>
                    <TextInput 
                    style = {styles.search_bar}
                    onChangeText = {(input)=>{this.textChanged(input)}}
                    placeholder = {"Search"}
                    />
                    <View style = {{flex:.15}}>
                        <CircleButton handler = {() => this.props.navigation.navigate('CreateGroup')} icon = {plus}/>
                    </View>
                </View>
                
                <FlatList
                    data = {this.state.groupList}
                    renderItem={({ item }) => (
                        this.renderBar(item)
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

    bar_container:{
        flexDirection:'column',
        backgroundColor: color_b,
        height: 120,
        padding: 10,
        borderColor: color_a,
        borderBottomWidth: 1
    },

    search_bar:{
        flex:.85,
        height:40, 
        backgroundColor: color_c,
        borderRadius:30,
        marginHorizontal:5
    }

})

