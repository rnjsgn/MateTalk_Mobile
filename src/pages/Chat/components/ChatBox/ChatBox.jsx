import React from "react";
import { ScrollView, Text, View } from "react-native";

import { ChatBottom } from "../ChatBottom/ChatBottom";

import { ChatBoxStyle } from "./ChatBoxStyle";
import { ChatHistory } from "../ChatHistory/ChatHistory";

export const ChatBox = () => {
    return(
        <View style = {ChatBoxStyle.container}>
            <ChatHistory />
            <View style = {ChatBoxStyle.keyboard}>
                <ChatBottom />
            </View>
        </View>
    )
}