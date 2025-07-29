import React, { useEffect, useState } from "react";
import { View, Text, Alert, Platform, TouchableOpacity } from "react-native";

import { ChatBottomStyle } from "./ChatBottomStyle";
import { Input } from "../../../../components/Input/Input";
import { Colors } from "../../../../assets/color/globalStyles";
import { useAuthStore } from "../../../../store/authStore";
import SocketManager from "../../../../socket/SocketManager";

export const ChatBottom = ({roomId, onMessageSent, onFileSent}) => {

    const {user} = useAuthStore();
    const [message, setMessage] = useState("");
    const [socket, setSocket] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);

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

    // 파일 선택 핸들러
    const handleFileSelect = () => {
        // React Native의 기본 파일 선택 기능 사용
        if (Platform.OS === 'ios') {
            // iOS에서는 기본적으로 파일 선택이 제한적이므로 Alert로 안내
            Alert.alert(
                "파일 선택",
                "iOS에서는 파일 선택이 제한적입니다. 카메라롤에서 사진을 선택하거나 다른 방법을 사용해주세요.",
                [
                    { text: "확인", style: "default" }
                ]
            );
        } else {
            // Android에서는 기본 파일 매니저 사용
            Alert.alert(
                "파일 선택",
                "파일을 선택해주세요",
                [
                    { text: "취소", style: "cancel" },
                    { 
                        text: "파일 선택", 
                        onPress: () => {
                            // 여기서 실제 파일 선택 로직 구현
                            // 임시로 파일이 선택되었다고 가정
                            const mockFile = {
                                name: "test_file.txt",
                                size: 1024,
                                type: "text/plain",
                                uri: "file://test_file.txt"
                            };
                            setSelectedFile(mockFile);
                            Alert.alert("파일 선택됨", `파일명: ${mockFile.name}`);
                        }
                    }
                ]
            );
        }
    };

    // 파일 전송 핸들러
    const handleFileSend = () => {
        if (!selectedFile) {
            Alert.alert("알림", "전송할 파일을 먼저 선택해주세요.");
            return;
        }

        const fileData = {
            user_id: user.id,
            user_name: user.name,
            room_id: roomId,
            file: selectedFile,
            type: "file"
        };

        console.log("[ChatBottom] 파일 전송 데이터:", fileData);

        if (socket) {
            socket.emit("file", fileData);
        }

        // 로컬에서 즉시 파일 메시지 표시
        if (onFileSent) {
            const localFileMessage = {
                chat_id: Date.now(),
                chat_msg: `파일: ${selectedFile.name}`,
                user_id: user.id,
                user_name: user.name,
                chat_date: new Date().toISOString(),
                room_id: roomId,
                file: selectedFile,
                type: "file"
            };
            onFileSent(localFileMessage);
        }

        setSelectedFile(null);
    };

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

        // 로컬에서 즉시 메시지 표시를 위한 콜백 호출
        if (onMessageSent) {
            const localMessage = {
                chat_id: Date.now(),
                chat_msg: message,
                user_id: user.id,
                user_name: user.name,
                chat_date: new Date().toISOString(),
                room_id: roomId
            };
            onMessageSent(localMessage);
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
                    onFileSelect={handleFileSelect}
                
                    borderColor={'white'}
                    placeholderColor={Colors.sub2}
                
                    borderRadius = {20}
                />
                {selectedFile && (
                    <View style={ChatBottomStyle.fileInfo}>
                        <Text style={ChatBottomStyle.fileName}>{selectedFile.name}</Text>
                        <TouchableOpacity onPress={handleFileSend} style={ChatBottomStyle.sendButton}>
                            <Text style={ChatBottomStyle.sendButtonText}>전송</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </View>
    )
}