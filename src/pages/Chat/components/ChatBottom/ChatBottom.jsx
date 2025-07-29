import React, { useEffect, useState } from "react";
import { View, Text, Alert, Platform, TouchableOpacity } from "react-native";
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';

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
    const [isUploading, setIsUploading] = useState(false);

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
        Alert.alert(
            "파일 선택",
            "어떤 방법으로 파일을 선택하시겠습니까?",
            [
                { text: "취소", style: "cancel" },
                { 
                    text: "갤러리에서 선택", 
                    onPress: () => selectFromGallery()
                },
                { 
                    text: "카메라로 촬영", 
                    onPress: () => takePhoto()
                }
            ]
        );
    };

    // 갤러리에서 이미지 선택
    const selectFromGallery = async () => {
        try {
            console.log('[ChatBottom] 갤러리에서 이미지 선택 시작');
            
            const result = await launchImageLibrary({
                mediaType: 'mixed', // 이미지와 비디오 모두 허용
                includeBase64: false,
                maxHeight: 2000,
                maxWidth: 2000,
                quality: 1,
                selectionLimit: 1,
            });

            console.log('[ChatBottom] 갤러리 선택 결과:', result);

            if (result.assets && result.assets.length > 0) {
                const file = result.assets[0];
                console.log('[ChatBottom] 선택된 파일 상세:', {
                    fileName: file.fileName,
                    fileSize: file.fileSize,
                    type: file.type,
                    uri: file.uri
                });
                
                setSelectedFile({
                    name: file.fileName || `image_${Date.now()}.jpg`,
                    size: file.fileSize || 0,
                    type: file.type || 'image/jpeg',
                    uri: file.uri,
                    fileName: file.fileName
                });
                
                Alert.alert("파일 선택됨", `파일명: ${file.fileName}\n크기: ${file.fileSize} bytes\n타입: ${file.type}`);
            }
        } catch (err) {
            console.error('[ChatBottom] 갤러리 선택 오류:', err);
            Alert.alert("오류", `파일 선택 중 오류가 발생했습니다: ${err.message}`);
        }
    };

    // 카메라로 촬영
    const takePhoto = async () => {
        try {
            console.log('[ChatBottom] 카메라 촬영 시작');
            
            const result = await launchCamera({
                mediaType: 'photo',
                includeBase64: false,
                maxHeight: 2000,
                maxWidth: 2000,
                quality: 1,
                saveToPhotos: true,
            });

            console.log('[ChatBottom] 카메라 촬영 결과:', result);

            if (result.assets && result.assets.length > 0) {
                const file = result.assets[0];
                console.log('[ChatBottom] 촬영된 파일 상세:', {
                    fileName: file.fileName,
                    fileSize: file.fileSize,
                    type: file.type,
                    uri: file.uri
                });
                
                setSelectedFile({
                    name: file.fileName || `photo_${Date.now()}.jpg`,
                    size: file.fileSize || 0,
                    type: file.type || 'image/jpeg',
                    uri: file.uri,
                    fileName: file.fileName
                });
                
                Alert.alert("사진 촬영됨", `파일명: ${file.fileName}\n크기: ${file.fileSize} bytes\n타입: ${file.type}`);
            }
        } catch (err) {
            console.error('[ChatBottom] 카메라 촬영 오류:', err);
            Alert.alert("오류", `카메라 촬영 중 오류가 발생했습니다: ${err.message}`);
        }
    };

    // 파일 업로드 핸들러 (웹 버전과 동일한 방식)
    const handleFileSend = async () => {
        if (!selectedFile) {
            Alert.alert("알림", "전송할 파일을 먼저 선택해주세요.");
            return;
        }

        setIsUploading(true);

        try {
            const maxSize = 99 * 1024 * 1024; // 100MB 제한
            const fileSize = selectedFile.size;

            if (fileSize > maxSize) {
                Alert.alert("오류", "첨부파일 사이즈는 100MB 이내로 등록 가능합니다.");
                return;
            }

            console.log("[ChatBottom] 파일 업로드 시작:", selectedFile);

            // 웹 버전과 동일한 방식으로 소켓을 통해 파일 전송
            if (socket) {
                // React Native에서는 파일을 Blob으로 변환하는 방식이 다름
                // 파일 URI에서 데이터를 읽어서 Blob 생성
                console.log("[ChatBottom] 파일 URI:", selectedFile.uri);
                const response = await fetch(selectedFile.uri);
                const blob = await response.blob();
                
                console.log("[ChatBottom] Blob 생성 완료:", blob);
                
                socket.emit(
                    'upload',
                    blob,
                    selectedFile.type,
                    encodeURIComponent(selectedFile.name),
                    selectedFile.size,
                    roomId,
                    user.id
                );

                console.log("[ChatBottom] 소켓으로 파일 전송 완료");
                
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
                Alert.alert("성공", "파일이 성공적으로 전송되었습니다.");
            } else {
                throw new Error('소켓 연결이 없습니다.');
            }
        } catch (error) {
            console.error("[ChatBottom] 파일 업로드 오류:", error);
            Alert.alert("오류", `파일 업로드 중 오류가 발생했습니다: ${error.message}`);
        } finally {
            setIsUploading(false);
        }
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
                        <TouchableOpacity 
                            onPress={handleFileSend} 
                            style={[ChatBottomStyle.sendButton, isUploading && ChatBottomStyle.sendButtonDisabled]}
                            disabled={isUploading}
                        >
                            <Text style={ChatBottomStyle.sendButtonText}>
                                {isUploading ? "업로드중..." : "전송"}
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </View>
    )
}