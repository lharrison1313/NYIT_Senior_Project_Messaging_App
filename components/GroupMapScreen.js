import React, { Component } from 'react';
import {View, StyleSheet, Dimensions } from 'react-native';
import MapView,{PROVIDER_GOOGLE} from 'react-native-maps';

export default class GroupMapScreen extends Component{

    constructor(props){
        super(props)
        this.state = {
        }
    }

    render(){
        return(
            <View style = {{flex: 1}}>
                <MapView
                    style = {styles.map}
                    provider = {PROVIDER_GOOGLE}
                    initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                    }}
                />
            </View>
        );
    }

}

const window = Dimensions.get('window');
const styles = StyleSheet.create({
    map:{
        height: window.height
    }

})