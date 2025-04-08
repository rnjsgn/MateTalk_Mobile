import React from "react";

import { Button, Text, View } from "react-native";
import { TopNav } from "../../components/TopNav/TopNav";

export const MainPresenter = ({
    navigation
}) => {
    return(
        <TopNav>
            <Text>메인 페이지</Text>
            <Button title="회원가입" onPress={() => navigation.navigate('SignUp')} />
            <Button title="로그인" onPress={() => navigation.navigate('SignIn')} />
            <Button title="채팅으로 이동" onPress={() => navigation.navigate('Chat')} />
        </TopNav>
    )
}