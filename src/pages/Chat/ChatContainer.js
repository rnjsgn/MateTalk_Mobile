import React, { useEffect, useState } from "react";
import { ChatPresenter } from "./ChatPresenter";
import { API } from "../../api";

const ChatContainer = ({ route }) => {
    const { roomId } = route.params;
    const [chats, setChats] = useState([]);
    const [roomInfo, setRoomInfo] = useState([]);

useEffect(() => {
  (
    async () => {
    try {
      const response = await API.getChats(roomId);
      const result = await API.getRoom(roomId);

      const chatData = response.data;
      const roomData = result.data;

      console.log('API로 받아온 채팅들:', chatData);
      console.log('API로 받아온 방정보:', roomData);

      setChats(chatData);
      setRoomInfo(roomData)
    } catch (err) {
      console.error(err);
    }
  })();
}, [roomId]);

    return(
        <ChatPresenter 
          chats={chats}
          roomInfo = {roomInfo}
          roomId={roomId}
        />
    )
}

export default ChatContainer;

// src/screens/Chat/ChatContainer.js
// import React, { useEffect, useState } from "react";
// import { useAuthStore } from "../../store/authStore";
// import { ChatPresenter } from "./ChatPresenter";
// import SocketManager from "../../socket/SocketManager";
// import {
//   setSocketInstance,
//   emitChat,
//   onChat,
//   offChat,
// } from "../../socket/socketApi";

// const ChatContainer = ({ route }) => {
//   const { user } = useAuthStore();
//   const { room } = route.params; // room_id, room_connect_id, room_name, invites

//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");

//   useEffect(() => {
//     // 소켓 인스턴스 설정
//     const mgr = new SocketManager(user.id);
//     const socket = mgr.getSocket();
//     setSocketInstance(socket);

//     // 채팅 수신 핸들러
//     onChat((msg) => {
//       console.log("[Chat] 새 메시지:", msg);
//       setMessages((prev) => [...prev, msg]);
//     });

//     return () => {
//       offChat();
//       mgr.disconnect();
//     };
//   }, [user]);

//   const handleSend = () => {
//     if (!input.trim()) return;
//     emitChat({
//       user_id: user.id,
//       user_name: user.email,
//       room_id: room.room_id,
//       room_connect_id: room.room_connect_id,
//       room_name: room.room_name,
//       invites: room.invites,
//       msg: input,
//     });
//     setInput("");
//   };

//   return (
//     <ChatPresenter
//       messages={messages}
//       input={input}
//       onChangeInput={setInput}
//       onSend={handleSend}
//     />
//   );
// };

// export default ChatContainer;