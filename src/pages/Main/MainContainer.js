import React, { useCallback, useEffect, useState } from "react";

import { MainPresenter } from "./MainPresenter";
import { useNavigation } from "@react-navigation/native";
import { useAuthStore } from "../../store/authStore";
import { Alert } from "react-native";
import {
  setSocketInstance,
  emitRoomList,
  onRoomList,
  offRoomList,
} from "../../socket/socketApi";
import SocketManager from "../../socket/SocketManager";

const MainContainer = () => {
    const navigation = useNavigation();

    const { user, signOut } = useAuthStore();

    const [name, setName] = useState('사용자')
    
    const logout = async () => {
        await signOut();
        const sm = new SocketManager();
        sm.disconnect();
        Alert.alert('로그아웃 되셨습니다')
    }

    useEffect(() => {
        if (user) {
            setName(user.email);
            navigation.navigate('Main');
        } else {
            setName('사용자'); // 로그아웃 시 기본값으로
        }
    }, [user])

    return(
        <MainPresenter
            navigation = {navigation}

            user = {user}
            name = {name}

            logout = {logout}
            
            // roomList = {roomList}
        />
    )
}




export default MainContainer;