import React from "react";

import { Button, Text, View } from "react-native";
import { InviteList } from "./components/InviteList/InviteList";

export const InviteListPresenter = ({
    navigation
}) => {
    return(
        <View>
            <Button title="메인으로 이동" onPress={() => navigation.navigate('Main')}/>
            <InviteList />
        </View>
    )
}