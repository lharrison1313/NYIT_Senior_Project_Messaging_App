import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {AppStyles} from '../styles/AppStyles' 


export default function OvalButton(props){
    
    
    return(
        <TouchableOpacity style = {AppStyles.oval_button} onPress={props.handler}>
            <Text>
                {props.text}
            </Text>
        </TouchableOpacity>
    );
}
