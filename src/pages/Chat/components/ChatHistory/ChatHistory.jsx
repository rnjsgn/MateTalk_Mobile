import React from "react";
import { Image, Text, View } from "react-native";

import { ChatHistoryStyle } from "./ChatHistoryStyle";

export const ChatHistory = () => {
    return(
        <View style = {ChatHistoryStyle.container}>
            <View style = {ChatHistoryStyle.other}>
                <View style = {ChatHistoryStyle.info}>
                    <Image
                        source={require("../../../../assets/images/User.png")}

                        style = {ChatHistoryStyle.profile}
                    />
                    <Text style = {ChatHistoryStyle.userName}>김철수</Text>
                    <Text style = {ChatHistoryStyle.userTime}>00 : 00</Text>
                </View>
                <View style = {ChatHistoryStyle.otherMessageBox}>
                    <Text style = {ChatHistoryStyle.otherMessage}>안녕하세요</Text>
                </View>
            </View>
            <View style = {ChatHistoryStyle.MyMessageWrap}>
                <View style = {ChatHistoryStyle.MyMessageBox}>
                    <Text style = {ChatHistoryStyle.MyMessage}>알겠습니다.</Text>
                </View>
                <Text style = {ChatHistoryStyle.MyTime}>00 : 00</Text>
            </View>
        </View>
    )
}