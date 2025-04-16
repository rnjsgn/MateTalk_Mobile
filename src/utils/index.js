// ✅ .env 파일에서 변수 불러오기
import {
  REACT_APP_HOST_URL,
  REACT_APP_BACKEND_URL,
  REACT_APP_SOCKET_URL,
  REACT_APP_DEPLOY_TYPE,
  REACT_APP_NODE_ENV,
} from '@env';

export { default as ApiManager } from './ApiManager';
export { default as MessageAlert } from './MessageAlert';
export { default as TypeManager } from './TypeManager';

// ✅ 환경 변수로부터 설정값 가져오기
export const PUBLIC_URL = REACT_APP_HOST_URL;
export const BACKEND_URL = REACT_APP_BACKEND_URL;
export const SOCKET_URL = REACT_APP_SOCKET_URL;

// API Status Code
export const SUCCESS_CODE = 200;
export const FAILURE_CODE = 400;

// 배포 타입 설정
const deployType = REACT_APP_DEPLOY_TYPE ? REACT_APP_DEPLOY_TYPE : REACT_APP_NODE_ENV;
export const HOST_URL = REACT_APP_HOST_URL;
export const envType = deployType;

// FCM CONFIG
export const VAPID_PUBLIC_KEY =
  'BPGk2ib0CZmR6PmIDuvaR9A06iXlBBN751iwGDnajvkzk90iXJhdU6lmGH0oRIqh8GecEawuVeXMWAAoh5PeSww';

export const FireBaseInstance = {
  apiKey: "AIzaSyD4VrDymJUPl_Lsl8w7k83aqVybKzas2-k",
  authDomain: "matetalk-b34ce.firebaseapp.com",
  projectId: "matetalk-b34ce",
  storageBucket: "matetalk-b34ce.firebasestorage.app",
  messagingSenderId: "909361401072",
  appId: "1:909361401072:web:7a8dca6228f71278fc8635",
  measurementId: "G-LW7S1VHDSK"
};

// 쿠키 관련 함수
export const getCookie = (name, options = null) => {
  const value = window?.document?.cookie?.match(
    '(^|;) ?' + name + '=([^;]*)(;|$)'
  );
  return value ? decodeURIComponent(value[2]) : null;
};

export const setCookie = (name, value, expires = 1, callback = false) => {
  var date = new Date();
  date.setTime(date.getTime() + expires * 1000 * 60 * 60 * 24);
  window.document.cookie = `${name}=${encodeURIComponent(
    value
  )};expires=${date.toUTCString()}; path=/`;
  if (callback) callback();
};

export const deleteCookie = (name) => {
  var date = new Date();
  date.setTime(date.getTime() - 1000);
  if (getCookie(name)) {
    window.document.cookie = `${name}=;path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
  }
};

// API 파라미터 Replace 함수
export const parameterToPath = (path, params = {}) => {
  const keys = Object.keys(params);
  let newStr = path;
  for (let key of keys) {
    newStr = newStr.replace(`:${key}`, params[key]);
  }
  return newStr;
};
