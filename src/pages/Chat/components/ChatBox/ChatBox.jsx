import React from "react";
import { ScrollView, Text, View } from "react-native";

import { ChatBottom } from "../ChatBottom/ChatBottom";

import { ChatBoxStyle } from "./ChatBoxStyle";
import { ChatHistory } from "../ChatHistory/ChatHistory";

export const ChatBox = ({roomId, chats, roomInfo}) => {
    return(
        <View style = {ChatBoxStyle.container}>
            <View style = {ChatBoxStyle.roominfo}>
                <Text>{roomInfo.room_name}</Text>
                <Text>인원 수: {roomInfo.invites?.length ?? 0}명</Text>
                {/* {
                    roomInfo.invites.map((member, index) => (
                        <Text key={index}>{member.user.user_name}</Text>
                    ))
                } */}
            </View>
            <ChatHistory chats={chats} roomId={roomId} roomInfo = {roomInfo}/>
            <View style = {ChatBoxStyle.keyboard}>
                <ChatBottom />
            </View>
        </View>
    )
}