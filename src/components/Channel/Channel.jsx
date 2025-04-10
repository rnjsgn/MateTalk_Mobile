import React from "react";
import { Image, Text, View } from "react-native";

import { ChannelStyle } from "./ChannelStyle";

export const Channel = ({
    name,

    count
}) => {
    return(
        <View style ={ChannelStyle.container}>
            <View style = {ChannelStyle.title}>
                <Image 
                    source={require("../../assets/images/Channel.png")}
                    style = {ChannelStyle.icon}
                />
                <Text style = {ChannelStyle.name}>{name}</Text>
            </View>
            <Text style = {ChannelStyle.count}>{count}</Text>
        </View>
    )
}