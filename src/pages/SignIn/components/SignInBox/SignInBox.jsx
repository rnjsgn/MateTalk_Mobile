import React from "react";
import { Text, View, Image } from "react-native";

import Logo from "../../../../assets/images/LOGO.png";

import { SignInBoxStyle } from "./SignInBoxStyle";
import { SignInList } from "../SignInList/SignInList";

export const SignInBox = ({
    setLoginInfo,

    login
}) => {
    return(
        <View style = {SignInBoxStyle.container}>
            <Image
                source = {Logo}

                style = {SignInBoxStyle.logo}
            />
            <View>
                <View style={SignInBoxStyle.titleContainer}>
                    <View style={SignInBoxStyle.line} />
                    <Text style={SignInBoxStyle.title}>로그인</Text>
                    <View style={SignInBoxStyle.line} />
                </View>
                <SignInList 
                    setLoginInfo = {setLoginInfo}

                    login = {login}
                />
            </View>
        </View>
    )
}