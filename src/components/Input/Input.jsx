import React from "react";
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Colors } from "../../assets/color/globalStyles";

export const Input = ({
    placeholder,

    button
}) => {

    const InputStyle = StyleSheet.create({
        container : {
            flexDirection : 'row',
        },

        Input : {
            flex : 5,

            height : 50,

            backgroundColor : Colors.sub4,

            borderColor : Colors.sub3,
            borderWidth : 1,
            borderRadius : 5,

            marginBottom : 30,

            placeholderTextColor : Colors.sub3,
            fontSize : 16,
            fontWeight : 'bold',

            padding : 15,
        },

        button: {
            flex : 2,

            height : 50,

            backgroundColor: Colors.sub2,

            marginLeft : 20,

            borderRadius : 5,

            justifyContent : 'center',
        },

        buttonText: {
            color: Colors.sub4,

            fontSize: 16,
            fontWeight: "bold",

            alignSelf : 'center'
        },
    })

    return(
        <View
            style = {InputStyle.container}
        >
            <TextInput
                style = {InputStyle.Input}

                placeholder={placeholder}
            />
            {
                button
                ?
                <TouchableOpacity style={InputStyle.button}>
                    <Text style={InputStyle.buttonText}>{button.split(" ").join("\n")}</Text>
                </TouchableOpacity>
                :
                <></>
            }
        </View>
    )
}