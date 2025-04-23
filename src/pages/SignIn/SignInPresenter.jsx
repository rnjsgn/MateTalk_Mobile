import React from "react";
import { View } from "react-native";

import { SignInBox } from "./components/SignInBox/SignInBox";

export const SignInPresenter = ({
    setLoginInfo,

    login
}) => {
    return(
        <View>
            <SignInBox 
                setLoginInfo = {setLoginInfo}

                login = {login}
            />
        </View>
    )
}