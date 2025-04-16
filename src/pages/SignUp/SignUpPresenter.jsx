import React from "react";
import { View } from "react-native";
import { SignUpBox } from "./components/SignUpBox/SignUpBox";

export const SignUpPresenter = ({
    setUserInfo,

    signUp
}) => {
    return(
        <View>
            <SignUpBox 
                setUserInfo = {setUserInfo}

                signUp = {signUp}
            />
        </View>
    )
}