import React, { Component } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import RNGooglePlaces from 'react-native-google-places';


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
            this.setState({chosenLocation: place.name})
            this.props.retrieveLocation(place)
        })
        .catch(error => console.log(error.message));  // error is a Javascript Error object
      }

    render(){
        return(
                <TouchableOpacity
                    style={this.props.button_style}
                    onPress={() => this.openSearchModal()}
                >
                    <Text>{this.state.chosenLocation}</Text>
                </TouchableOpacity>
        );
    }

}