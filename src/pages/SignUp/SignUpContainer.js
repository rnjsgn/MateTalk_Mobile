import React, { useState } from "react";

import { SignUpPresenter } from "./SignUpPresenter";

import { Alert } from "react-native";
import { API } from "../../api";

const SignUpContainer = () => {
    const [userInfo, setUserInfo] = useState({
        name : '',
        phone : '',
        id : '',
        pw : '',
        pw_check : ''
    })

    const signUp = async () => {
        const body = {
            user_name: userInfo.name,
            phone_number : userInfo.phone,
            user_account : userInfo.id,
            user_pw : userInfo.pw,
        }

        const result = await API.join(body)

        Alert.alert("회원가입 정보", JSON.stringify(result));
    }
    
    return(
        <SignUpPresenter
            setUserInfo = {setUserInfo}

            signUp = {signUp}
        />
    )
}

export default SignUpContainer;