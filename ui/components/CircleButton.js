import React from 'react';
import {TouchableOpacity} from 'react-native';
import {AppStyles} from '../styles/AppStyles'


export default function CircleButton(props){
    
    
    return(
        <TouchableOpacity 
        style = {AppStyles.circle_button} 
        onPress={props.handler}>
            {props.icon}
        </TouchableOpacity>
    );
}

