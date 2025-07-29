import React from "react";

import { TopNav } from "../../components/TopNav/TopNav";
import { ChatBox } from "./components/ChatBox/ChatBox";
import { Text, View } from "react-native";

export const ChatPresenter = ({
    chats, 
    roomId,
    roomInfo,
    onMessageSent,
    onFileSent
}) => {
    return(
        <TopNav>
            <ChatBox chats={chats} roomId={roomId} roomInfo = {roomInfo} onMessageSent={onMessageSent} onFileSent={onFileSent}/>
        </TopNav>
    )
}