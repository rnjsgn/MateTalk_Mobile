// SocketManager.js
import io from 'socket.io-client';
import { SOCKET_URL } from '../utils'; // SOCKET_URL은 서버 주소

class SocketManager {
  static instance = null;
  socket = null;

  constructor(userId) {
    if (!SocketManager.instance) {
      this.socket = io(SOCKET_URL, {
        transports: ['websocket'],
        query: { userId },
      });
      SocketManager.instance = this;
    }
    return SocketManager.instance;
  }

  connected() {
    return this.socket && this.socket.connected;
  }

  getSocket() {
    return this.socket;
  }

  disconnect() {
    if (this.socket) {
      this.socket.removeAllListeners(); // 이벤트 리스너 정리
      this.socket.disconnect(); // 연결 해제
      this.socket = null;
    }
    SocketManager.instance = null;
  }
}

export default SocketManager;


