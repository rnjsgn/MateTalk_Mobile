import React from "react";
import { Text, View } from "react-native";
import { Button } from "../../../../components/Button/Button";
import { InviteListBoxStyle } from "./InviteListBoxStyle";

export const InviteListBox = () => {
    return(
        <View style = {InviteListBoxStyle.container}>
            <View style = {InviteListBoxStyle.titleBox}>
                <Text style = {InviteListBoxStyle.title}>방 이름</Text>
                <Text style = {InviteListBoxStyle.inviteName}>12312312323</Text>
            </View>
            <View style = {InviteListBoxStyle.buttonBox}>
                <Button
                    width={'40%'}
                    height={30}

                    title = {'수락'}
                />
                <Button
                    width={'40%'}
                    height={30}

                    backgroundColor = {'red'}

                    title = {'거절'}
                />
            </View>
        </View>
    )
}