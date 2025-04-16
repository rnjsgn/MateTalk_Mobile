import React from "react";
import { View, TextInput, StyleSheet, TouchableOpacity, Text, Image } from "react-native";
import { Colors } from "../../assets/color/globalStyles";

export const Input = ({
    placeholder,
    
    icon,
    behindIcon,

    marginBottom,

    borderRadius,
    borderColor,

    placeholderColor,
    placeholderSize,
    placeholderWeight,

    button,

    onChangeText
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
            borderRadius: borderRadius ? borderRadius : 5,

            marginBottom: marginBottom,

            paddingHorizontal: 10,
            
            height: 50,
        },

        input: {
            flex: 1,

            fontSize: placeholderSize ? placeholderSize : 16,
            fontWeight: placeholderWeight ? placeholderWeight : 'bold',

            placeholderTextColor : placeholderColor ? placeholderColor : Colors.sub3,
        },

        icon: {
            width: 24,
            height: 24,
            marginRight: 10,
        },

        behindIcon : {
            width: 24,
            height: 24,
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

                    onChangeText={onChangeText}
                />
                {behindIcon && (
                    <Image 
                        source={behindIcon} 
                        style={InputStyle.behindIcon}
                    />
                )}
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