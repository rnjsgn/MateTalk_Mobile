let socket = null;

/**
 * 전역 소켓 인스턴스 설정
 * @param {SocketIOClient} _socket
 */
export const setSocketInstance = (_socket) => {
  socket = _socket;
};

/**
 * RoomList 요청 (emit)
 * @param {string} userId
 * @param {string} rName
 */
export const emitRoomList = (userId, rName) => {
  if (socket?.connected) {
    socket.emit('RoomList', userId, rName);
  } else {
    console.warn('[socketApi] emitRoomList 실패 - 소켓 미연결');
  }
};

/**
 * RoomList 이벤트 리스너 등록
 * @param {(rooms: any[]) => void} callback
 */
export const onRoomList = (callback) => {
  if (socket) {
    socket.on('RoomList', callback);
  }
};

/**
 * RoomList 리스너 해제
 */
export const offRoomList = () => {
  if (socket) {
    socket.off('RoomList');
  }
};

// ====================== Chat APIs ======================

/**
 * 채팅 메시지 전송 (emit)
 * @param {object} chatData
 */
export const emitChat = (chatData) => {
  if (socket?.connected) {
    socket.emit('chat', chatData);
  } else {
    console.warn('[socketApi] emitChat 실패 - 소켓 미연결');
  }
};

/**
 * 채팅 메시지 수신 리스너 등록
 * @param {(message: object) => void} callback
 */
export const onChat = (callback) => {
  if (socket) {
    socket.on('chat', callback);
  }
};

/**
 * 채팅 메시지 리스너 해제
 */
export const offChat = () => {
  if (socket) {
    socket.off('chat');
  }
};
