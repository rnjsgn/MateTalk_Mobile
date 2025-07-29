import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
import { ChatPresenter } from "./ChatPresenter";
import { API } from "../../api";
import { useAuthStore } from "../../store/authStore";
import SocketManager from "../../socket/SocketManager";
import {
  setSocketInstance,
  onChat,
  offChat,
} from "../../socket/socketApi";

const ChatContainer = ({ route }) => {
    const { roomId } = route.params;
    const { user } = useAuthStore();
    const [chats, setChats] = useState([]);
    const [roomInfo, setRoomInfo] = useState([]);

    useEffect(() => {
        // API로 기존 채팅 기록 가져오기
        const loadChats = async () => {
            try {
                const response = await API.getChats(roomId);
                const result = await API.getRoom(roomId);

                const chatData = response.data;
                const roomData = result.data;

                console.log('API로 받아온 채팅들:', chatData);
                console.log('API로 받아온 방정보:', roomData);

                setChats(chatData);
                setRoomInfo(roomData);
            } catch (err) {
                console.error(err);
            }
        };

        loadChats();

        // 소켓 설정 및 실시간 메시지 리스너
        const socketManager = new SocketManager(user.id);
        const socket = socketManager.getSocket();
        setSocketInstance(socket);

        // 실시간 채팅 메시지 수신 리스너
        onChat((newMessage) => {
            console.log('[ChatContainer] 새 메시지 수신:', newMessage);
            
            // 새 메시지를 기존 채팅 목록에 추가
            setChats(prevChats => {
                // 중복 방지를 위해 이미 있는 메시지인지 확인
                const isDuplicate = prevChats.some(chat => 
                    chat.chat_id === newMessage.chat_id || 
                    (chat.chat_msg === newMessage.msg && 
                     chat.user_id === newMessage.user_id &&
                     Math.abs(new Date(chat.chat_date) - new Date(newMessage.chat_date)) < 1000)
                );
                
                if (isDuplicate) {
                    return prevChats;
                }
                
                // 새 메시지 형식에 맞게 변환
                const formattedMessage = {
                    chat_id: newMessage.chat_id || Date.now(),
                    chat_msg: newMessage.msg,
                    user_id: newMessage.user_id,
                    user_name: newMessage.user_name,
                    chat_date: newMessage.chat_date || new Date().toISOString(),
                    room_id: newMessage.room_id
                };
                
                return [...prevChats, formattedMessage];
            });
        });

        // 웹 버전과 동일한 소켓 이벤트 리스너 추가
        socket.on('uploadFailed', () => {
            console.log('[uploadFailed] 파일 업로드 실패');
            Alert.alert("오류", "파일을 업로드 할 수 없습니다. 다시 시도해주세요.");
        });

        socket.on('downloadLink', (downloadLink, fileData) => {
            console.log('다운로드 링크 : ', downloadLink);
            console.log('fileData : ', JSON.stringify(fileData));
        });

        socket.on('client-download', (blobData, blobType, fileName, user_id, file_id, room_id, connectId) => {
            console.log('client-download');
            // 모바일에서는 파일 다운로드 처리가 다를 수 있음
            Alert.alert("다운로드", `${fileName} 파일이 다운로드되었습니다.`);
        });

        socket.on('no_active_strage', () => {
            Alert.alert("오류", "파일 저장 스토리지가 비활성화 상태여서 업로드 및 다운로드가 불가합니다.");
        });

        socket.on('downloadFailed', () => {
            Alert.alert("오류", "원본 파일이 손상되었거나 다운로드 할 수 없습니다.");
        });

        socket.on('ftp-download', async (downloadURL, room_id, user_id, file_id) => {
            console.log('ftp-download 신호 받음:', downloadURL);
            // FTP 다운로드 처리
            Alert.alert("FTP 다운로드", "FTP 파일 다운로드가 완료되었습니다.");
        });

        return () => {
            offChat();
            socketManager.disconnect();
        };
    }, [roomId, user]);

    // 메시지 전송 후 즉시 화면에 표시하는 콜백
    const handleMessageSent = (localMessage) => {
        setChats(prevChats => {
            // 중복 방지를 위해 이미 있는 메시지인지 확인
            const isDuplicate = prevChats.some(chat => 
                chat.chat_id === localMessage.chat_id
            );
            
            if (isDuplicate) {
                return prevChats;
            }
            
            return [...prevChats, localMessage];
        });
    };

    // 파일 전송 후 즉시 화면에 표시하는 콜백
    const handleFileSent = (localFileMessage) => {
        setChats(prevChats => {
            // 중복 방지를 위해 이미 있는 메시지인지 확인
            const isDuplicate = prevChats.some(chat => 
                chat.chat_id === localFileMessage.chat_id
            );
            
            if (isDuplicate) {
                return prevChats;
            }
            
            return [...prevChats, localFileMessage];
        });
    };

    return(
        <ChatPresenter 
          chats={chats}
          roomInfo = {roomInfo}
          roomId={roomId}
          onMessageSent={handleMessageSent}
          onFileSent={handleFileSent}
        />
    )
}

export default ChatContainer;