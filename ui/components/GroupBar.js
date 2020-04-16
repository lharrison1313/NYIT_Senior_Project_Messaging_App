import React, { Component } from 'react';
import {View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import {addUserToGroup,getCurrentUserID, getUserInfo, addLikeDislike} from '../../api/MessagingAppAPI';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AppStyles, color_a, color_b, color_c, color_d } from '../styles/AppStyles';

const upIcon = <Icon name="arrow-up" size={25} color= {"green"} />;
const downIcon = <Icon name="arrow-down" size={25} color= {"red"} />;

export default class GroupBar extends Component{
    constructor(props){
        super(props)
        this.state={
            
        } 
    }

    handlePress = () =>{
        this.props.navigation.navigate('GroupInfo',{id: this.props.id, info: this.props.info, date: this.props.date})
    }

    incrementValue = () => {
        addLikeDislike(this.props.id,true);
    }

    decrementValue = () => {
        addLikeDislike(this.props.id,false);
    }

    render(){
    
        return(
            
            <TouchableOpacity
            style = {this.props.bar_style} 
            onPress={() => this.handlePress()}
            >
               
                <View style={styles.header_container}>
                    <Text style = {{fontSize:12, marginRight:10, fontWeight: "bold"}}>{this.props.info.Location}</Text>
                    <Text style = {{fontSize:12}}>{this.props.date}</Text>
                </View>

                <View style={styles.body_container}>

                    <View style={styles.left_container}>
                        <Text style ={{flex:.50}}>{this.props.info.GroupName}</Text>
                        <Text style ={{flex:.50}}>{this.props.info.Interests.join(" ")}</Text>
                    </View>

                    <View style={styles.right_container}>

                        <View style = {styles.ld_container} >
                            <TouchableOpacity style={styles.like_button} onPress={ this.incrementValue}>
                                {upIcon} 
                            </TouchableOpacity> 
                            <Text style={{fontSize:19,color:"black"}}>{this.props.info.Votes}</Text>
                            <TouchableOpacity style={styles.dislike_button} onPress={ this.decrementValue}>
                                {downIcon}
                            </TouchableOpacity>
                        </View>
                        
                    </View>
                    
                </View>
            </TouchableOpacity>
            
        );
    }

}


const styles = StyleSheet.create({
    header_container:{
        flex: .25,
        flexDirection:'row',
        flex: .30
    },

    left_container:{
        flexDirection:"column",
        flex: .55
    },
    right_container:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center",
        flex: .45,

    },
    body_container:{
        flexDirection:"row",
        flex: .70,
    },

    ld_container:{
        flex: .80,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    },

    dislike_button:{
        
        padding:3
    },

    like_button:{
        
        padding:3
    }
})
