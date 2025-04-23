import React, { useState } from "react";
import { SignInPresenter } from "./SignInPresenter";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { API } from "../../api";

import { useAuthStore } from "../../store/authStore";
import { generateToken } from "../../utils/generateToken";

const SignInContainer = () => {
    const [loginInfo, setLoginInfo] = useState({
        id : '',
        pw : '',
    })

    const { setUser, setToken } = useAuthStore();

    const navigation = useNavigation();

    const login = async () => {
        const body = {
            user_account : loginInfo.id,
            user_pw : loginInfo.pw,
        }

        const result = await API.login(body)

        if (result.status === 200) {
            const userId = loginInfo.id;
            const token = generateToken(userId);

            await setUser({ id: userId });
            await setToken(token);

            Alert.alert('로그인에 성공하셨습니다.')
            navigation.navigate('Main')
        } else {
            Alert.alert('로그인에 실패하셨습니다.')
        }
    }

    return(
        <SignInPresenter 
            setLoginInfo = {setLoginInfo}

            login = {login}
        />
    )
}

export default SignInContainer;