import React, { Component } from 'react';
import {View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import {addUserToGroup,getCurrentUserID} from '../api/MessagingAppAPI';
import Icon from 'react-native-vector-icons/FontAwesome';

const upIcon = <Icon name="arrow-up" size={25} color="grey" />;
const downIcon = <Icon name="arrow-down" size={25} color="grey" />;

export default class GroupBar extends Component{
    constructor(props){
        super(props)
        this.state={
            count:0
        } 
    }

    handleJoin = () =>{
        addUserToGroup(getCurrentUserID(),this.props.id)
        this.props.navigation.navigate('Message',{id: this.props.id})
    }

    incrementValue = () => {
    this.setState({count:this.state.count+1})
    }

    decrementValue = () => {
    this.setState({count:this.state.count-1})
    }

    render(){
    
        return(
            
            <View
            style = {this.props.bar_style} 
            >
               
                <View style={styles.header_container}>
                    <Text style = {{fontSize:12, marginRight:10, fontWeight: "bold"}}>{this.props.location}</Text>
                    <Text style = {{fontSize:12}}>{this.props.date}</Text>
                </View>

                <View style={styles.body_container}>

                    <View style={styles.left_container}>
                        <Text style ={{flex:.50}}>{this.props.group_name}</Text>
                        <Text style ={{flex:.50}}>{this.props.interests.join(" ")}</Text>
                    </View>

                    <View style={styles.right_container}>
                        <TouchableOpacity style={styles.join_button} onPress={() => this.handleJoin()}>
                            <Text style ={styles.join_text}>Join</Text>
                        </TouchableOpacity>

                        <View style = {styles.ld_container} >
                            <TouchableOpacity style={styles.like_button} onPress={ this.incrementValue}>
                                {upIcon} 
                            </TouchableOpacity> 
                            <Text style={{fontSize:19,color:"black"}}>{this.state.count}</Text>
                            <TouchableOpacity style={styles.dislike_button} onPress={ this.decrementValue}>
                                {downIcon}
                            </TouchableOpacity>
                        </View>
                        
                    </View>
                    
                </View>
            </View>
            
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
    join_button:{
        flex: .20,
        backgroundColor:"grey",
        padding:5,
        borderRadius:10,
        alignItems:"center",
        justifyContent: "center"
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
