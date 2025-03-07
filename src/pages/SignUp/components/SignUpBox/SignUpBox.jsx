import React from "react";
import { Image, Text, View } from "react-native";

import { SignUpBoxStyle } from "./SignUpBoxStyle";

import Logo from "../../../../assets/images/LOGO.png";

import { SignUpList } from "../SignUpList/SignUpList";

export const SignUpBox = () => {
    return(
        <View style = {SignUpBoxStyle.container}>
            <Image
                source = {Logo}

                style = {SignUpBoxStyle.logo}
            />
            <View>
                <View style={SignUpBoxStyle.titleContainer}>
                    <View style={SignUpBoxStyle.line} />
                    <Text style={SignUpBoxStyle.title}>회원가입</Text>
                    <View style={SignUpBoxStyle.line} />
                </View>
                <SignUpList />
            </View>
        </View>
    )
}