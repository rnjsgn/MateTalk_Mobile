import React from "react";
import { View } from "react-native";

import { Input } from "../../../../components/Input/Input";
import { Button } from "../../../../components/Button/Button";

export const SignInList = () => {
    return(
        <View>
            <Input 
                placeholder={"ID"}
            />
            <Input 
                placeholder={"PW"}
            />
            <Button 
                title={"로그인"}

                width={"100%"}
                height={"50"}

                buttonSize={20}
            />
        </View>
    )
}