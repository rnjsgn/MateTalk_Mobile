// import ApiConstant from './ApiConstant';
import ApiManager from '../utils/ApiManager';
import { parameterToPath } from '../utils';
const $http = new ApiManager();

const API = {
  /**
   * 채팅방 생성
   * --
   */
  createRoom: (body) => $http.post(`/rooms`, body),

  /**
   * 채팅방 수정
   * --
   */
  updateRoom: (roomId, body) =>
    $http.put(parameterToPath(`/rooms/:roomId`, { roomId }), body),


  /**
   * 채팅방 상세조회
   * --
   */
  getRoom: (roomId) => $http.get(parameterToPath(`/rooms/:roomId`, { roomId })),

  /**
   * 채팅방 상세조회
   * --
   */
  getChats: (roomId) => $http.get(parameterToPath(`/chat/:roomId`, { roomId })),

  /**
   * 전체 유저 데이터 조회
   * --
   */
  getUsers: () => $http.get('/users'),

  /**
   * 채팅방 상세조회
   * --
   */
  getInvites: (userId) => $http.get('/invite', { userId }),

  /**
   * 파일 목록조회
   * --
   */
  getFiles: (roomId) =>
    $http.get(parameterToPath(`/files/:roomId`, { roomId })),

  /**
   * 파일 업로드
   * --
   */
  uploadFile: (roomId, formData) =>
    $http.multipart(parameterToPath(`/upload/:roomId`, { roomId }), formData),

  /**
   * 회원가입
   * --
   */
  inviteAccess: (inviteId, body) =>
    $http.put(parameterToPath(`/invite/:inviteId/update`, { inviteId }), body),

  /**
   * 회원가입
   * --
   */
  join: (body) => $http.post(`/users`, body),

  /**
   * 로그인
   * --
   */
  login: (body) => $http.post(`/users/login`, body),

  /**
   * 파일다운로드
   * --
   */
  fileDownload: (fileId) =>
    $http.get(parameterToPath(`/download/:fileId`, { fileId })),

  /**
   * 인증코드 발급
   * --
   */
  authCodeSearch: (room_id) => $http.get(`/auth-code`, { room_id }),

  /**
   * 버그 리포트
   * --
   */
  sendBugReport: (body) => $http.post(`/bug/report`, body),

  /**
   * 채팅방 나가기
   * --
   */
  leaveRoom: (roomId) =>
    $http.delete(parameterToPath(`/rooms/:roomId`, { roomId })),

  /**
   * 다운로드 요청
   * --
   */
  download: (body) => $http.post(`/download/file`, { body }),

  /**ㄹ
   * 친구 초대
   * --
   */
  inviteUser: (body) => $http.post(`/invite`, body),
  /**
   * 카카오로그인 요청
   * --
   */
  kakaoLogin: (body) => $http.post(`/kakao`, body),
  /**
   * 유저 데이터 수정
   * --
   */
  updateUserInfo: (body) => $http.post(`/users`, body),
  /**
   * ftp 파일 다운로드
   * --
   */
  ftpDownload: (body) => $http.post(`/download/ftp`, body),

  /**
   * 다운로드 파일 삭제
   * --
   */
  fileDelete: (fileId) =>
    $http.delete(parameterToPath(`/download/:fileId`, { fileId })),

  /**
   * 서비스 탈퇴
   * --
   */
  LeaveService: (userId) =>
    $http.delete(parameterToPath(`/users/:userId`, { userId })),
  //NOTE : 디바이스 생성 추가
  /**
   * 디바이스 생성
   * --
   */
  CreateDevice: (data) => $http.post('/device', data),
  /**
   * 디바이스 토큰 조회
   * --
   */
  GetDevice: (data) => $http.post('/device-token', data),
  /**
   * 디바이스 업데이트
   * --
   */
  UpateDevice: (data) => $http.put('/device', data),
  /**
   * 디바이스 인증
   * --
   */
  ConnectDevice: (data) => $http.post('/device/connect', data),
};
export default API;
