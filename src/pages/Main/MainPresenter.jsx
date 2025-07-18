import React from "react";

import { Button, Text, View } from "react-native";
import { TopNav } from "../../components/TopNav/TopNav";

export const MainPresenter = ({
    navigation,

    user,
    name,

    logout,

    // roomList
}) => {
    return(
        <TopNav
            // roomList = {roomList}

            navigation = {navigation}
        >
            <Text>메인 페이지</Text>
            <Text>{name}님 반갑습니다.</Text>
            {
                user
                ?
                <>
                    <Button title="로그아웃" onPress={logout}/>
                    <Button title="채팅으로 이동" onPress={() => navigation.navigate('Chat')} />
                    <Button title="초대목록으로 이동" onPress={() => navigation.navigate('InviteList')} />
                </>
                :
                <>
                    <Button title="회원가입" onPress={() => navigation.navigate('SignUp')} />
                    <Button title="로그인" onPress={() => navigation.navigate('SignIn')} />
                    
                </>
            }
        </TopNav>
    )
}