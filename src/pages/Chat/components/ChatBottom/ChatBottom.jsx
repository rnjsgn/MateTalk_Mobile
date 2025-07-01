import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";

import { ChatBottomStyle } from "./ChatBottomStyle";
import { Input } from "../../../../components/Input/Input";
import { Colors } from "../../../../assets/color/globalStyles";
import { useAuthStore } from "../../../../store/authStore";
import SocketManager from "../../../../socket/SocketManager";

export const ChatBottom = ({roomId}) => {

    const {user} = useAuthStore();
    const [message, setMessage] = useState("");
    const [socket, setSocket] = useState(null);

    // 소켓 초기화
    useEffect(() => {
        const socketManager = new SocketManager(user.id);
        const newSocket = socketManager.getSocket();
        setSocket(newSocket);

        return () => {
        if (newSocket) {
            newSocket.disconnect();
        }
        };
    }, [user]);

    // 메세지 전송 핸들러
    const handleSendMessage = () => {
        if (!message.trim()) return;

        const data = {
            user_id: user.id,
            user_name: user.name,
            room_id: roomId,
            msg: message,
        };

        console.log("[ChatBottom] 보낼 데이터:", data);

        if (socket) {
            socket.emit("chat", data);
        }

        setMessage(""); // 입력창 초기화
    };


    return(
        <View style = {ChatBottomStyle.container}>
            <View style = {ChatBottomStyle.wrap}>
                <Input
                    placeholder={"메세지를 입력하세요..."}
                    value={message}
                    onChangeText={(text) => setMessage(text)}
                    onSubmitEditing={handleSendMessage}
                    icon={require("../../../../assets/images/File.png")}
                    behindIcon={require("../../../../assets/images/Send.png")}
                
                    borderColor={'white'}
                    placeholderColor={Colors.sub2}
                
                    borderRadius = {20}
                />
            </View>
        </View>
    )
}