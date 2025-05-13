import React, { useCallback, useEffect, useState } from "react";

import { MainPresenter } from "./MainPresenter";
import { useNavigation } from "@react-navigation/native";
import { useAuthStore } from "../../store/authStore";
import { Alert } from "react-native";

import SocketManager from "../../socket/SocketManager";

const MainContainer = () => {
    const navigation = useNavigation();

    const { user, signOut } = useAuthStore();

    const [name, setName] = useState('사용자')
    
    const logout = async () => {
        await signOut();
        Alert.alert('로그아웃 되셨습니다')
    }

    //socket
    const [rName] = useState('Derek');
    const [roomList, setRoomList] = useState([]);

    // useEffect(() => {
    //     if (user) {
    //         setName(user.email);
    //         navigation.navigate('Main')

    //         //소켓
    //         let socketManager = new SocketManager(user.id);
    //         let socket = socketManager.getSocket();
            
    //         console.log("소켓: " + socket)
    //         if(socket) {
    //             console.log(user.id)
    //             // socket.on('RoomList', (data) => {
    //             //     setRoomList(data);
    //             //     console.log("방 조회: " + data);
    //             // })

    //             socket.on('RoomList', (data, key) => {
    //                 console.log("RoomList typeof:", typeof data);
    //                 console.log("RoomList isArray:", Array.isArray(data));
    //                 console.log("RoomList data:", data);
    //                 setRoomList(data);
    //               });
                  
    
    //             // ✅ 소켓 연결 완료 후 emit
    //             socket.on('connect', () => {
    //                 console.log('소켓 연결됨');
    //                 socket.emit('RoomList', user.id, rName);
    //             });
                
    //             // const call = () => {
    //             //     socket.on('RoomList', (data) => {
    //             //         setRoomList(data);
    
    //             //         console.log("방 조회: " + roomList);
    //             //     })
    //             // }
    
    //             // if(socket) {
    //             //     call();
    //             //     handleGetRoomList();
    //             // }
    //             return () => {
    //                 if(socket === null || socket.connected === null) {
    //                     return;
    //                 }
    //                 socket.disconnect();
    //                 socket = undefined;
    //             }
    //         }
            
    //     } else {
    //         setName('사용자'); // 로그아웃 시 기본값으로
    //     }
        
       
    // }, [user]);

    useEffect(() => {
        if (user) {
          setName(user.email);
          navigation.navigate('Main');
      
          // ✅ 이전 소켓 인스턴스를 명시적으로 제거
          SocketManager.instance = null;
      
          const socketManager = new SocketManager(user.id);
          const socket = socketManager.getSocket();
      
          if (socket) {
            // ✅ 이벤트 먼저 등록
            socket.on('RoomList', (data) => {
              console.log("RoomList typeof:", typeof data);
              console.log("RoomList isArray:", Array.isArray(data));
              console.log("RoomList data:", data);
              setRoomList(data);
            });
      
            socket.on('connect', () => {
              console.log('소켓 연결됨');
              // ✅ 이벤트 등록 후 emit
              socket.emit('RoomList', user.id, rName);
            });
      
            return () => {
              socketManager.disconnect(); // ✅ 깔끔한 정리
            };
          }
        } else {
          setName('사용자'); // 로그아웃 시 기본값
        }
      }, [user]);
      

    //ljw
    // const handleGetRoomList = useCallback(() => {
    //     socket.emit('RoomList', user.id, rName);
    // },[rName])

    //ljw
    // useEffect(() => {
    //     const call = () => {
    //         socket.on('RoomList', (data) => {
    //             setRoomList(data);

    //             console.log("방 조회: " + roomList);
    //         })
    //     }

    //     if(socket) {
    //         call();
    //         handleGetRoomList();
    //     }

    //     return () => {
    //         if(socket == null || socket.connected == null) {
    //             return;
    //         }
    //         socket.disconnect();
    //         socket = undefined;
    //     }
    // }, [handleGetRoomList])

    return(
        <MainPresenter
            navigation = {navigation}

            user = {user}
            name = {name}

            logout = {logout}
            
            roomList = {roomList}
        />
    )
}




export default MainContainer;