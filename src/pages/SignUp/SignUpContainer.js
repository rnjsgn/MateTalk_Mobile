import React, { useState } from "react";

import { SignUpPresenter } from "./SignUpPresenter";

import { Alert } from "react-native";
import { API } from "../../api";
import { useNavigation } from "@react-navigation/native";

const SignUpContainer = () => {
    const navigation = useNavigation();

    const [userInfo, setUserInfo] = useState({
        name : '',
        phone : '',
        id : '',
        pw : '',
        pw_check : ''
    })

    const phoneRegex = /^[0-9]{3}-[0-9]{4}-[0-9]{4}$/

    const signUp = async () => {
        const body = {
            user_name: userInfo.name,
            phone_number : userInfo.phone,
            user_account : userInfo.id,
            user_pw : userInfo.pw,
            pw_check : userInfo.pw_check
        }

        if (body.user_name.trim() == '') {
            Alert.alert('이름을 입력해주세요.')
            return
        }

        if (body.phone_number.trim() == '') {
            Alert.alert('전화번호를 입력해주세요.')
            return
        }

        if (!phoneRegex.test(body.phone_number)) {
            Alert.alert('전화번호 양식을 지켜주세요.(000-0000-0000)')
            return
        }

        if (body.user_account.trim() == '') {
            Alert.alert('ID를 입력해주세요.')
            return
        }

        if (body.user_pw.trim() == '') {
            Alert.alert('비밀번호를 입력해주세요.')
            return
        }

        if (body.user_pw != body.pw_check) {
            Alert.alert('비밀번호가 맞지 않습니다.')
            return
        }

        const result = await API.join(body)

        if (result.status === 200) {
            Alert.alert('회원가입 되었습니다.')
            navigation.navigate('SignIn')
        } else {
            Alert.alert('회원가입에 실패하셨습니다. 다시 시도해주세요.')
        }
    }
    
    return(
        <SignUpPresenter
            setUserInfo = {setUserInfo}

            signUp = {signUp}
        />
    )
}

export default SignUpContainer;