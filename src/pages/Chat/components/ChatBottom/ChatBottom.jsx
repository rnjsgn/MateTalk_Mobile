import React from "react";
import { View, Text } from "react-native";

import { ChatBottomStyle } from "./ChatBottomStyle";
import { Input } from "../../../../components/Input/Input";
import { Colors } from "../../../../assets/color/globalStyles";

export const ChatBottom = () => {
    return(
        <View style = {ChatBottomStyle.container}>
            <View style = {ChatBottomStyle.wrap}>
                <Input
                    placeholder={"메세지를 입력하세요..."}

                    icon={require("../../../../assets/images/File.png")}
                    behindIcon={require("../../../../assets/images/Send.png")}

                    borderColor={'white'}
                    placeholderColor={Colors.sub2}

                    borderRadius = {20}
                />
            </View>
        </View>
    )
}