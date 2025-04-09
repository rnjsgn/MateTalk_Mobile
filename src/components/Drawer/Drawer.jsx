import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";

import { Colors } from "../../assets/color/globalStyles";

import { Input } from "../Input/Input";
import { Channel } from "../Channel/Channel";
import { People } from "../People/People";
import { PopUp } from "../PopUp/PopUp";

export const Drawer = ({
    isOpen,
    onClose
}) => {
    const [popOpen, setPopOpen] = useState(false);
    const [popUpType, setPopUpType] = useState('')

    const openPopUp = (type) => {
        setPopOpen(true);
        setPopUpType(type)
    }

    const drawerStyle = StyleSheet.create({
        container: {
            width : '70%',
            height : '100%',

            position : 'absolute',
            left : 0,
            top : 0,
            zIndex : 10,

            backgroundColor : 'white',
        },

        overlay: {
            position: "absolute",
            top: 0,
            left: 0,

            zIndex : 10,

            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.3)",
        },

        search : {
            width : '80%',

            marginTop : 30,
            marginBottom : 20,

            alignSelf : 'center',
        },

        title : {
            flexDirection: 'row',
            
            alignItems: 'center',
            justifyContent : 'space-between',

            borderBottomWidth : 1,
            borderBottomColor : Colors.sub2,

            marginLeft : 20,
            marginRight : 20,
            marginBottom : 10,
            marginTop : 10,

            padding : 10,
        },

        members : {
            flexDirection : 'row',
        },

        name : {
            fontSize : 20,
            fontWeight : 'bold',

            color : Colors.sub2,
        },

        image : {
            resizeMode : 'contain',

            width : 24,
            height : 24,
        }
    })

    return isOpen ? (
        <View style={drawerStyle.overlay}>
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={{ flex: 1 }} />
            </TouchableWithoutFeedback>

            <View style={drawerStyle.container}>
                <View style={drawerStyle.search}>
                    <Input
                        placeholder={"Search..."}

                        icon={require("../../assets/images/Search.png")}

                        borderColor={Colors.sub2}
                        placeholderColor={Colors.sub2}
                    />
                </View>
                <View>
                    <View style={drawerStyle.title}>
                        <Text style={drawerStyle.name}>워크 스페이스</Text>
                        <TouchableOpacity onPress={() => openPopUp('workspace')}>
                            <Image 
                                style={drawerStyle.image} 
                                source={require("../../assets/images/Plus.png")}
                            />
                        </TouchableOpacity>
                    </View>
                    <Channel 
                        name={'IMPL'}

                        count={5}
                    />
                    <Channel 
                        name={'IMPL 대학원생'}

                        count={12}
                    />
                </View>
                <View>
                    <View style={drawerStyle.title}>
                        <View style={drawerStyle.members}>
                            <Image 
                                style={[drawerStyle.image, { marginRight: 10 }]} 
                                source={require("../../assets/images/Members.png")} 
                            />
                            <Text style={drawerStyle.name}>구성원</Text>
                        </View>
                        <TouchableOpacity onPress={() => openPopUp('member')}>
                            <Image 
                                style={drawerStyle.image} 
                                source={require("../../assets/images/Plus.png")} 
                            />
                        </TouchableOpacity>
                    </View>
                    <People
                        name = {'장승훈'}
                        status={'online'}
                    />
                    <People
                        name = {'이영희'}
                        status={'offline'}
                    />
                    <People
                        name = {'앙드레킴'}
                        status={'away'}
                    />
                </View>
            </View>
            <PopUp
                popOpen={popOpen}
                popClose = {() => setPopOpen(false)}

                type={popUpType}
            />
        </View>
    ) : null;
};
