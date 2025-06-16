import React from "react";

import { Text, TouchableOpacity, StyleSheet, Image, View } from "react-native";

import { Colors } from "../../assets/color/globalStyles";

export const Button = ({
    title,

    width,
    height,

    backgroundColor,

    borderColor,
    borderWidth,

    buttonSize,

    marginTop,
    
    onPress
}) => {

    const buttonStyle = StyleSheet.create({
        button: {
            width: width,
            height: height,

            backgroundColor: backgroundColor ? backgroundColor : Colors.sub2,

            borderColor: borderColor,
            borderWidth: borderWidth,

            alignItems : 'center',
            justifyContent : 'center',

            marginTop : marginTop,

            borderRadius: 5,
        },

        text: {
            color: Colors.sub4,

            fontSize: buttonSize,
            fontWeight : 'bold',
        },
    });

    return (
        <TouchableOpacity style={buttonStyle.button} onPress={onPress}>
            <Text style={buttonStyle.text}>{title}</Text>
        </TouchableOpacity>
    );
};