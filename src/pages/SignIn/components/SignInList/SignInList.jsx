import React from "react";
import { View } from "react-native";

import { Input } from "../../../../components/Input/Input";
import { Button } from "../../../../components/Button/Button";

export const SignInList = ({
    setLoginInfo,

    login
}) => {
    return(
        <View>
            <Input 
                placeholder={"ID"}

                marginBottom = {30}

                onChangeText={((id) =>
                    setLoginInfo(prev => ({
                        ...prev,
                        id : id
                    }))
                )}
            />
            <Input 
                placeholder={"PW"}

                marginBottom = {30}

                onChangeText={((pw) => 
                    setLoginInfo(prev => ({
                        ...prev,
                        pw : pw
                    }))
                )}
            />
            <Button 
                title={"로그인"}

                width={"100%"}
                height={"50"}

                buttonSize={20}

                onPress={login}
            />
        </View>
    )
}