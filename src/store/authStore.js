//src/store/authStore.js
import { create } from "zustand";
import { setCookie, getCookie, deleteCookie } from "../utils/NativeCookie";

export const useAuthStore = create((set) => ({
    user: null,
    token: null,

    // 사용자 로그인 시 user 정보 저장
    setUser: async (user) => {
        await setCookie('user', JSON.stringify(user));
        set({ user })
    },

    // 사용자 로그인 시 user의 token 정보 저장
    setToken: async (token) => {
        await setCookie('token', token);
        set({ token });
    },

    // 사용자 로그아웃 시 user && token 정보 초기화
    signOut: async () => {
        await deleteCookie('user');
        await deleteCookie('token');
        set({ user : null, token : null});
    },

    // 앱 실행 시 사용자의 로그인 상태 복원(userEffect로 앱 시작 시 호출하면 자동 로그인 기능)
    // initialzeAuth: async () => {
    //     const storedUser = await getCookie('user');
    //     const storedToken = await getCookie('token');
    //     if (storedUser && storedToken) {
    //         set({ user: JSON.parse(storedUser), token : JSON.parse(storedToken)})
    //     }
    // }
}))