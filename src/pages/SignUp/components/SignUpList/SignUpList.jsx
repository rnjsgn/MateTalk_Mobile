import React from "react";
import { View } from "react-native";

import { Input } from "../../../../components/Input/Input";
import { Button } from "../../../../components/Button/Button";

export const SignUpList = () => {
    return(
        <View>
            <Input 
                placeholder={"이름"}
            />
            <Input 
                placeholder={"전화번호"}
            />
            <Input 
                placeholder={"ID"}

                button={"중복 체크"}
            />
            <Input 
                placeholder={"PW"}
            />
            <Input 
                placeholder={"PW 확인"}
            />
            <Button 
                title={"회원가입"}

                width={"100%"}
                height={"50"}

                buttonSize = {20}
            />
        </View>
    )
}