import React, { useEffect, useState } from "react";

import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { Drawer } from "../Drawer/Drawer";
import { useAuthStore } from "../../store/authStore";

import {
  setSocketInstance,
  emitRoomList,
  onRoomList,
  offRoomList,
} from "../../socket/socketApi";
import SocketManager from "../../socket/SocketManager";


export const TopNav = ({
    children,

    // roomList,

    navigation
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const { user, signOut } = useAuthStore();   

    const [name, setName] = useState('사용자')
    const onClose = () => {
        setIsOpen(!isOpen)
    }

    // socket
    const [rName] = useState('Derek');
    const [roomList, setRoomList] = useState([]);

    useEffect(() => {
      if (!user) {
        setName("사용자");
        return;
      }
      setName(user.email);
    //   navigation.navigate("Main");

      // 새 소켓 매니저 생성 (이전 인스턴스 초기화)
      SocketManager.instance = null;
      const socketManager = new SocketManager(user.id);
      const socket = socketManager.getSocket();
      setSocketInstance(socket);

      // RoomList 이벤트 핸들러
      onRoomList((rooms) => {
        console.log("[Main] RoomList 수신:", rooms);
        setRoomList(rooms);
      });

      // 연결 시 RoomList 요청
      socket.on("connect", () => {
        console.log("[Main] 소켓 연결됨");
        emitRoomList(user.id, rName);
      });

      return () => {
        offRoomList();
        socketManager.disconnect();
      };
    }, [user]);

    const topNavStyle = StyleSheet.create({
        container : {
            width : '100%',

            flexDirection : 'row',

            backgroundColor : 'white'
        },

        image : {
            resizeMode : 'contain',

            width : 24,
            height : 24,

            margin : 20,
        }
    })

   

    return(
        <>
            <View style = {topNavStyle.container}>
                <TouchableOpacity
                    onPress={() => setIsOpen(!isOpen)}
                >
                    <Image 
                        source={require('../../assets/images/Tab.png')}

                        style = {topNavStyle.image}
                    />
                </TouchableOpacity>
            </View>
            <Drawer
                isOpen = {isOpen}
                onClose = {onClose}
            
                roomList = {roomList}

                navigation = {navigation}
            />
            {children}
        </>
    )
}