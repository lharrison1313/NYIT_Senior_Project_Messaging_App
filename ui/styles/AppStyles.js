import {StyleSheet} from 'react-native';

const color_bg = "grey"
const color_blue = '#00BED6'
const color_white = "white"

const AppStyles = StyleSheet.create({

    screen:{
        flex: 1,
        backgroundColor: color_bg,
    },

    oval_button:{
        backgroundColor: color_blue,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        height: 50,
        width: 300,
        margin: 10
    },

    circle_button:{
        backgroundColor: color_blue,
        justifyContent: "center",
        alignItems: "center",
        height:45,
        width: 45,
        borderRadius: 22,
        marginHorizontal:5
    }



})

export {AppStyles, color_bg, color_blue, color_white}