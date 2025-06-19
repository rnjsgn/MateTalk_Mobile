import React from "react";
import { Text, View } from "react-native";
import { InviteListBox } from "../InviteBox/InviteListBox";

import { InviteListStyle } from "./InviteListStyle";

export const InviteList = ({
    inviteList,
    InviteAccess
}) => {
    return(
        <View style = {InviteListStyle.container}>
            <Text
                style = {InviteListStyle.title}
            >초대 목록</Text>
            {
                inviteList
                .filter(invite => invite?.invite_access === false)
                .map((invite, key) => (
                    <InviteListBox
                        key={key}
                        name={invite?.room.room_name}
                        invite_id={invite?.invite_id}
                        InviteAccess={InviteAccess}
                    />
                ))
            }
        </View>
    )
}