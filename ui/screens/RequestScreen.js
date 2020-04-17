import React, { Component } from 'react';
import {View, StyleSheet,SafeAreaView, FlatList } from 'react-native';
import {retreiveRequests, getCurrentUserID} from '../../api/MessagingAppAPI'
import CircleButton from '../components/CircleButton'
import {AppStyles, color_a, color_b, color_c, color_d, color_e} from '../styles/AppStyles'
import Icon from 'react-native-vector-icons/FontAwesome';
import RequestBar from '../components/RequestBar'



const group =<Icon name="group" size={25} color={color_a} />
const friend = <Icon name="user" size={25} color={color_a} />;

export default class RequestScreen extends Component{    
    constructor(props){
        super(props)
        this.state = {
            request_list: []
        }
        
    }

    componentDidMount(){
        retreiveRequests(getCurrentUserID(),this.retrieveRequestList)
    }

    retrieveRequestList = (requests) => {
        this.setState({
            request_list: requests
        })
        //console.log(this.state.request_list)
    }

    render(){
    
        return(
            <SafeAreaView style={{flex:1}}>
            <View style ={AppStyles.screen}>
                <View Style = {styles.content_container}>

                    <View style = {{flexDirection: "row", backgroundColor: color_d, paddingVertical: 20}}>
                        <View style = {{flex: 1, alignItems: "center"}}>
                            <CircleButton icon = {group}/>
                        </View>
                        <View style = {{flex: 1, alignItems: "center"}}>
                            <CircleButton icon = {friend}/>
                        </View>
                        
                    </View>

                    <FlatList
                    data = {this.state.request_list}
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

