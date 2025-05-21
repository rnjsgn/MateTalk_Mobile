import React, { useCallback, useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";

import { Colors } from "../../assets/color/globalStyles";
import { API } from "../../api";

import { Input } from "../Input/Input";
import { Channel } from "../Channel/Channel";
import { People } from "../People/People";
import { PopUp } from "../PopUp/PopUp";

import { drawerStyle } from "./DrawerStyle";
import { useAuthStore } from "../../store/authStore";

export const Drawer = ({
    isOpen,
    onClose,

    roomList,

    navigation
}) => {
    const [popOpen, setPopOpen] = useState(false);
    const [popUpType, setPopUpType] = useState('');

    const openPopUp = (type) => {
        setPopOpen(true);
        setPopUpType(type)
    }

    const { user } = useAuthStore();

    return isOpen ? (
        <View style={drawerStyle.overlay}>
            <TouchableWithoutFeedback onPress={onClose} >
                <View style={{ flex: 1 }} />
            </TouchableWithoutFeedback>

            <View style={drawerStyle.container}>
                {
                    user
                    ?
                    <>
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
                            {
                                roomList.map((data, idx) => (
                                    <TouchableOpacity
                                        key={idx}

                                        onPress={() => navigation.navigate('Chat')}
                                    >
                                        <Channel
                                            key={idx}
                                            name={data?.room_name}

                                            navigation = {navigation}
                                        />
                                    </TouchableOpacity>
                                ))
                            }
                        </View>
                        {/* 구성원 추가 (나중에 다른데로 옮길 예정)*/}
                        {/* <View>
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
                        </View> */}
                    </>
                    :
                    <View>
                        <Text>로그인이 필요합니다.</Text>
                    </View>
                }
            </View>
            <PopUp
                popOpen={popOpen}
                popClose = {() => setPopOpen(false)}

                type={popUpType}
            />
        </View>
    ) : null;
};
