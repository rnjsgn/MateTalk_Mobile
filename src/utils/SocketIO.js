// socketio.js

import { io } from 'socket.io-client'
import { SOCKET_URL } from './env';

/**
 * [Class] SocketIO
 * --
 */
export default class SocketIO {
  /**
   * 생성자
   * --
   */
  //NOTE : 소켓 ENv추가
  constructor(host = SOCKET_URL, transports = ['websocket']) {
    if (!SocketIO.instance) {
      this.socket = io(host, {
        transports,
        reconnection: true,
        reconnectionDelay: 500,
        reconnectionDelayMax: 3000,
        reconnectionAttempts: 5,
      });
      socket.connect();
      // 싱글톤 변수 할당
      SocketIO.instance = this;
    }
    return SocketIO.instance;
  }
}
