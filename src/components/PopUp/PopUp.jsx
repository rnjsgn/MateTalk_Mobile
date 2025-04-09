import React from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

import { Colors } from "../../assets/color/globalStyles";
import { Input } from "../Input/Input";
import { Button } from "../Button/Button";

export const PopUp = ({
    popOpen,
    popClose,

    type
}) => {

    const PopUpStyle = StyleSheet.create({
        container : {
           flex : 1,

           justifyContent : 'center',
           alignItems : 'center'
        },

        wrap : {
            width : '80%',
            height : '45%',

            backgroundColor : Colors.sub4,

            borderRadius : 10,
        },

        top : {
            alignItems : 'right'
        },

        close : {
            textAlign : 'right',

            fontSize : 20,
            fontWeight : 'bold',

            color : Colors.sub2,

            padding : 15,
        },

        middle : {
            alignItems : 'center'
        },

        title : {
            fontSize : 24,
            fontWeight : 'bold',

            color : Colors.sub2,

            marginBottom : 10,
        },

        explain : {
            fontSize : 14,

            color : Colors.sub2,

            marginBottom : 30,
        },

        name : {
            fontSize : 14,
            fontWeight : 'bold',

            color : Colors.sub2,

            alignSelf : 'left',

            marginBottom : 5,
            marginLeft : 20,
        },

        input : {
            width : '85%',

            margin : 5,
            marginBottom : 10,
        },

        terms : {
            fontSize : 12,

            color : Colors.sub2,
        },

        bottom : {
            flexDirection : 'row',

            justifyContent : 'space-between',

            marginTop : 50,
            marginLeft : 20,
            marginRight : 20,
        },

        back : {
            fontSize : 14,
            fontWeight : 'bold',

            color : Colors.sub2
        },

        button : {
            width : '20%',
        }
    })

    return(
        <Modal
            transparent
            animationType="fade"
            visible={popOpen}
            onRequestClose={popClose}
        >
            <View style={PopUpStyle.container}>
                <View style = {PopUpStyle.wrap}>
                    <View style = {PopUpStyle.top}>
                        <Pressable onPress={popClose}>
                            <Text style = {PopUpStyle.close}>X</Text>
                        </Pressable>
                    </View>
                    {
                        type === 'workspace'
                        ?
                        <>
                        <View style = {PopUpStyle.middle}>
                            <Text style = {PopUpStyle.title}>워크 스페이스 생성</Text>
                            <Text style = {PopUpStyle.explain}>새로운 서버에 사람들을 추가하여 이야기 해보세요.</Text>
                            <Text style = {PopUpStyle.name}>워크 스페이스 이름</Text>
                            <View style = {PopUpStyle.input}>
                                <Input 
                                    placeholder={'김철수님의 워크스페이스'}

                                    width = {'80%'}

                                    borderColor={Colors.sub2}
                                    
                                    placeholderColor={Colors.sub2}
                                    placeholderSize={14}
                                    placeholderWeight={'0'}
                                />
                            </View>
                            <Text style={PopUpStyle.terms}>서버를 만들면 메이트톡의 <Text style = {{fontWeight : 'bold'}}>커뮤니티 지침</Text>에 동의하게 됩니다.</Text>
                        </View>
                        <View style = {PopUpStyle.bottom}>
                            <Pressable onPress={popClose}>
                                <Text style = {PopUpStyle.back}>뒤로 가기</Text>
                            </Pressable>
                            <View style = {PopUpStyle.button}>
                                <Button
                                    title={"생성"}

                                    height={"35%"}
                                />
                            </View>
                        </View>
                        </>
                        :
                        <>
                        <View style = {PopUpStyle.middle}>
                            <Text style = {PopUpStyle.title}>구성원 추가</Text>
                            <Text style = {PopUpStyle.name}>구성원 이름</Text>
                            <View style = {PopUpStyle.input}>
                                <Input 
                                    placeholder={'이름'}

                                    width = {'80%'}

                                    borderColor={Colors.sub2}
                                    
                                    placeholderColor={Colors.sub2}
                                    placeholderSize={14}
                                    placeholderWeight={'0'}
                                />
                            </View>
                            <Text style = {PopUpStyle.name}>구성원 전화번호</Text>
                            <View style = {PopUpStyle.input}>
                                <Input 
                                    placeholder={'전화번호'}

                                    width = {'80%'}

                                    borderColor={Colors.sub2}
                                    
                                    placeholderColor={Colors.sub2}
                                    placeholderSize={14}
                                    placeholderWeight={'0'}
                                />
                            </View>
                        </View>
                        <View style = {PopUpStyle.bottom}>
                            <Pressable onPress={popClose}>
                                <Text style = {PopUpStyle.back}>뒤로 가기</Text>
                            </Pressable>
                            <View style = {PopUpStyle.button}>
                                <Button
                                    title={"추가"}

                                    height={"35%"}
                                />
                            </View>
                        </View>
                        </>
                    }
                </View>
            </View>
        </Modal>
    )
}