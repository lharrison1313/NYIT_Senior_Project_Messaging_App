import React, { Component } from 'react';
import {View, TouchableOpacity, Text, StyleSheet,Button } from 'react-native';
import{withNavigation} from "react-navigation"


class GroupBar extends Component{
    constructor(props){
        super(props)
    }
    state={
        count:0
      }  
      incrementValue=() => {
      this.setState({count:this.state.count+1})
      }
      decrementValue=() => {
      this.setState({count:this.state.count-1})
      }

    render(){
    
        return(
            
            <View
            style = {styles.bar_container} 
            >
               
                <View style={styles.header_container}>
                    <Text style = {{flex: .75, fontSize:12, fontWeight:"bold"}}>{this.props.location}</Text>
                    <Text style = {{flex: .25, fontSize:12, fontWeight:"bold"}}>{this.props.date.toString()}</Text>
                </View>

                <View style={styles.body_container}>

                    <View style={styles.left_container}>
                        <Text style ={{flex:.50}}>{this.props.group_name}</Text>
                        {/* <Text style ={styles.body_text}>{this.props.group_Description}</Text> */}
                        <Text style ={{flex:.50}}>{this.props.interests.join(" ")}</Text>
                    </View>

                    <View style={styles.right_container}>
                        <TouchableOpacity style={styles.join_button} onPress={() => this.props.navigation.navigate('Message',{id: this.props.id})}>
                            <Text style ={styles.join_text}>Join</Text>
                        </TouchableOpacity>
                        <View style = {styles.ld_container} >
                            <TouchableOpacity style={styles.like_button} onPress={ this.incrementValue}>
                                <Text>Like</Text>  
                            </TouchableOpacity> 
                            <Text style={{fontSize:19,color:"black"}}>{this.state.count}</Text>
                            <TouchableOpacity style={styles.dislike_button} onPress={ this.decrementValue}>
                                <Text>Dislike</Text>
                            </TouchableOpacity>
                        </View>
                        
                    </View>
                    
                </View>
            </View>
            
        );
    }

}

const styles = StyleSheet.create({
    bar_container:{
        flexDirection:'column',
        backgroundColor: '#00BED6',
        height: 120,
        padding: 10,
        borderColor:"black",
        borderWidth: 1
    },

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
        marginHorizontal: 2
    },

    join_text:{
        fontWeight:"bold",
        fontSize:14
    },

    ld_container:{
        flex: .80,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    },

    dislike_button:{
        backgroundColor:"red",
        padding:3
    },
    like_button:{
        backgroundColor:"green",
        padding:3
    }


})

export default withNavigation(GroupBar)