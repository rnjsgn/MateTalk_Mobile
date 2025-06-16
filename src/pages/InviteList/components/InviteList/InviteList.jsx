import React from "react";
import { Text, View } from "react-native";
import { InviteListBox } from "../InviteBox/InviteListBox";

import { InviteListStyle } from "./InviteListStyle";

export const InviteList = () => {
    return(
        <View style = {InviteListStyle.container}>
            <Text
                style = {InviteListStyle.title}
            >초대 목록</Text>
            <InviteListBox />
            <InviteListBox />
            <InviteListBox />
        </View>
    )
}