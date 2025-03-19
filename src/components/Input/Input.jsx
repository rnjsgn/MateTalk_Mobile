import React from "react";
import { View, TextInput, StyleSheet, TouchableOpacity, Text, Image } from "react-native";
import { Colors } from "../../assets/color/globalStyles";

export const Input = ({
    placeholder,
    icon,

    borderColor,
    placeholderColor,

    button,
}) => {

    const InputStyle = StyleSheet.create({
        container : {
            flexDirection : 'row',
        },

        inputContainer: {
            flex: 5,
            flexDirection: 'row',

            alignItems: 'center',

            backgroundColor: Colors.sub4,

            borderColor: borderColor ? borderColor : Colors.sub3,
            borderWidth: 1,
            borderRadius: 5,

            marginBottom: 30,

            paddingHorizontal: 10,
            
            height: 50,
        },

        input: {
            flex: 1,

            fontSize: 16,
            fontWeight: 'bold',

            placeholderTextColor : placeholderColor ? placeholderColor : Colors.sub3,
        },

        icon: {
            width: 20,
            height: 20,
            marginRight: 10,
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
            <View style={InputStyle.inputContainer}>
                {icon && (
                    <Image 
                        source={icon} 
                        style={InputStyle.icon}
                    />
                )}
                <TextInput
                    style={InputStyle.input}

                    placeholder={placeholder}
                    placeholderTextColor={placeholderColor}
                />
            </View>
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