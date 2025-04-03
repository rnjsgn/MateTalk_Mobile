import React, { useState } from "react";

import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { Drawer } from "../Drawer/Drawer";

export const TopNav = ({
    children
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const onClose = () => {
        setIsOpen(!isOpen)
    }

    const topNavStyle = StyleSheet.create({
        container : {
            width : '100%',

            flexDirection : 'row',

            backgroundColor : 'white'
        },

        image : {
            resizeMode : 'contain',

            width : 24,
            height : 24,

            margin : 20,
        }
    })

    return(
        <>
            <View style = {topNavStyle.container}>
                <TouchableOpacity
                    onPress={() => setIsOpen(!isOpen)}
                >
                    <Image 
                        source={require('../../assets/images/Tab.png')}

                        style = {topNavStyle.image}
                    />
                </TouchableOpacity>
            </View>
            <Drawer
                isOpen = {isOpen}

                onClose = {onClose}
            />
            {children}
        </>
    )
}