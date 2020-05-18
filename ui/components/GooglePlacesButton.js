import React, { Component } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import RNGooglePlaces from 'react-native-google-places';
import {AppStyles, color_a} from "../styles/AppStyles"
import Icon from 'react-native-vector-icons/FontAwesome';

const locationIcon = <Icon name="globe" size={25} color= {color_a}/>;
export default class GooglePlacesButton extends Component{

    constructor(props){
        super(props)
        this.state = {
            chosenLocation: "Pick a Location"
        }
    }

    openSearchModal() {
        RNGooglePlaces.openAutocompleteModal()
        .then((place) => {
            console.log(place);
            this.setState({chosenLocation: place.name});
            this.props.retrieveLocation(place);
        })
        .catch(error => console.log(error.message));  
    }

    render(){
        if(this.props.shape == "oval"){
            return(
                    <TouchableOpacity
                        style={AppStyles.oval_button}
                        onPress={() => this.openSearchModal()}
                    >
                        <Text>{this.state.chosenLocation}</Text>
                    </TouchableOpacity>
            );
        }
        else if(this.props.shape == "circle"){
            return(
                <TouchableOpacity 
                style = {AppStyles.circle_button} 
                onPress={() => this.openSearchModal()}>
                    {locationIcon}
                </TouchableOpacity>
            );
        }
    }

}
