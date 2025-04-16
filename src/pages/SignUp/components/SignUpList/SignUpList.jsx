import React from "react";
import { View } from "react-native";

import { Input } from "../../../../components/Input/Input";
import { Button } from "../../../../components/Button/Button";

export const SignUpList = ({
    setUserInfo,

    signUp
}) => {
    return(
        <View>
            <Input 
                placeholder={"이름"}

                marginBottom = {30}

                onChangeText={((name) => 
                        setUserInfo(prev => ({
                            ...prev,
                            name: name
                        }))
                )}
            />
            <Input 
                placeholder={"전화번호"}

                marginBottom = {30}

                onChangeText={((phone) => 
                        setUserInfo(prev => ({
                            ...prev,
                            phone: phone
                        }))
                )}
            />
            <Input 
                placeholder={"ID"}

                marginBottom = {30}

                button={"중복 체크"}

                onChangeText={((id) => 
                        setUserInfo(prev => ({
                            ...prev,
                            id: id
                        }))
                )}
            />
            <Input 
                placeholder={"PW"}

                marginBottom = {30}

                onChangeText={((pw) => 
                        setUserInfo(prev => ({
                            ...prev,
                            pw: pw
                        }))
                )}
            />
            <Input 
                placeholder={"PW 확인"}

                marginBottom = {30}

                onChangeText={((pw_check) => 
                        setUserInfo(prev => ({
                            ...prev,
                            pw_check: pw_check
                        }))
                )}
            />
            <Button 
                title={"회원가입"}

                width={"100%"}
                height={"50"}

                buttonSize = {20}

                onPress={signUp}
            />
        </View>
    )
}