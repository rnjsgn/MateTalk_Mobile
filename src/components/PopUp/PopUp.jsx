import React, { useEffect, useMemo, useState } from "react";
import { Alert, Modal, Pressable, Switch, Text, View } from "react-native";

import { Colors } from "../../assets/color/globalStyles";
import { PopUpStyle } from "./PopUpStyle";

import { Input } from "../Input/Input";
import { Button } from "../Button/Button";

import { API } from "../../api";
import { useAuthStore } from "../../store/authStore";
import { FtpPopUp } from "./FtpPopUp/FtpPopUp";

export const PopUp = ({
    popOpen,
    popClose,

    type
}) => {
    // 룸 기본 정보
    const [roomInfo, setRoomInfo] = useState({
        room_name : '',
        room_description : '',
        member : [],
    })

    // ftp 기본 정보
    const [ftpInfo, setFtpInfo] = useState({
        room_storage: false,
        room_ftpid: '',
        room_ftppw: '',
        room_ftpip: '',
        room_ftppath: '',
        room_ftpport: '',
        room_ftptype: '',
    })

    const { user } = useAuthStore();

    // fpt storage 열고 닫는 함수
    const [ftpOpen, setFtpOpen] = useState(false);

    const openFtp = () => {
        setFtpOpen(true);
    }

    const ftpClose = () => {
        setFtpOpen(false)
        setFtpInfo({
            room_storage: false,
            room_ftpid: '',
            room_ftppw: '',
            room_ftpip: '',
            room_ftppath: '',
            room_ftpport: '',
            room_ftptype: '',
        })
    }

    const ftpConfirm = () => {
        if (!ftpInfo.room_ftpid.trim() || !ftpInfo.room_ftppw.trim() || !ftpInfo.room_ftpip.trim()) {
            Alert.alert('FTP사용 시 입력정보는 필수입니다.')
            return
        }

        setFtpInfo(prev => ({
            ...prev,
            room_storage: true
        }));

        setFtpOpen(false)
    }

    // 룸 생성시 멤버 초대

    const [memberEmail, setMemberEmail] = useState('');

    const addMember = () => {
    const email = memberEmail.trim();
    if (!email) return;

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            Alert.alert('이메일 형식을 지켜주세요.');
            return;
        }

        setRoomInfo((prev) => ({
            ...prev,
            member: [...prev.member, email]
        }));
        console.log(roomInfo.member)
        setMemberEmail('');
    };

    const removeMember = (index) => {
        setRoomInfo((prev) => {
            const newMembers = [...prev.member];
            newMembers.splice(index, 1);
            return { ...prev, member: newMembers };
        });
    };

    // 이메일 리스트 출력 useMemo
    const renderedMembers = useMemo(() => {
        return roomInfo.member.map((email, index) => (
            <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 3 }}>
                <Text style={{ color: 'black' }}>{email}</Text>
                {/* {
                    console.log(email)
                } */}
                <Pressable onPress={() => removeMember(index)}>
                    <Text style={{ color: 'red', fontWeight: 'bold' }}>삭제</Text>
                </Pressable>
            </View>
        ));
    }, [roomInfo.member]);

    // // 상태 변경 확인용 로그
    // useEffect(() => {
    //     console.log('현재 멤버 리스트:', roomInfo.member);
    // }, [roomInfo.member]);


    // 룸 생성
    const workspaceCreate = async () => {

        const updatedMembers = [...roomInfo.member, user.email];

        const body = {
            room_name : roomInfo.room_name,
            room_storage : ftpInfo.room_storage,
            room_ftpid : ftpInfo.room_ftpid,
            room_ftppw : ftpInfo.room_ftppw,
            room_ftpip : ftpInfo.room_ftpip,
            room_ftppath : ftpInfo.room_ftppath ? ftpInfo.room_ftppath : '/',
            room_ftpport : ftpInfo.room_ftpport ? ftpInfo.room_ftpport : 21,
            room_ftptype : ftpInfo.room_ftptype ? ftpInfo.room_ftptype : 'ftp',
            room_description : roomInfo.room_description,
            members : updatedMembers,
            user_id : user.id,
        }

        const result = await API.createRoom(body)

        if (result.status === 200) {
            // Alert.alert(JSON.stringify(result.data, null, 2))
            Alert.alert('방이 생성되었습니다.')
        } else {
            Alert.alert('실패')
        }
    }

    return(
        <Modal
            transparent
            animationType="fade"
            visible={popOpen}
            onRequestClose={popClose}
        >
            <View style={PopUpStyle.container}>
                <View style = {PopUpStyle.wrap}>
                    <View style = {PopUpStyle.top}>
                        <Pressable onPress={popClose}>
                            <Text style = {PopUpStyle.close}>X</Text>
                        </Pressable>
                    </View>
                    {
                        type === 'workspace'
                        ?
                        <>
                        <View style = {PopUpStyle.middle}>
                            <Text style = {PopUpStyle.title}>워크 스페이스 생성</Text>
                            <Text style = {PopUpStyle.explain}>새로운 서버에 사람들을 추가하여 이야기 해보세요.</Text>
                            <Text style = {PopUpStyle.name}>워크 스페이스 이름</Text>
                            <View style = {PopUpStyle.input}>
                                <Input 
                                    placeholder={'채팅명을 입력해주세요.'}

                                    width = {'80%'}

                                    borderColor={Colors.sub2}
                                    
                                    placeholderColor={'gray'}
                                    placeholderSize={14}
                                    placeholderWeight={'0'}

                                    onChangeText={((room_name) =>
                                        setRoomInfo((prev) => ({
                                            ...prev,
                                            room_name : room_name
                                        }))
                                    )}
                                />
                            </View>
                            <Text style = {PopUpStyle.name}>워크 스페이스 설명</Text>
                            <View style = {PopUpStyle.input}>
                                <Input 
                                    placeholder={'내용을 입력해주세요.'}

                                    width = {'80%'}

                                    borderColor={Colors.sub2}
                                    
                                    placeholderColor={'gray'}
                                    placeholderSize={14}
                                    placeholderWeight={'0'}

                                    onChangeText={((room_description) =>
                                        setRoomInfo((prev) => ({
                                            ...prev,
                                            room_description : room_description
                                        }))
                                    )}
                                />
                            </View>
                            <Text style = {PopUpStyle.name}>멤버</Text>
                            <View style = {PopUpStyle.input}>
                                <Input 
                                    placeholder={'초대할 멤버 이메일을 입력하세요'}

                                    width={'80%'}

                                    borderColor={Colors.sub2}

                                    placeholderColor={'gray'}
                                    placeholderSize={14}

                                    value={memberEmail}
                                    onChangeText={setMemberEmail}

                                    onSubmitEditing={addMember} // Enter key
                                />
                            </View>
                            <View style={{ marginVertical: 10 }}>
                                {renderedMembers}
                            </View>
                            <View style={PopUpStyle.ftpBox}>
                                <Text style = {PopUpStyle.name}>외부스토리지 </Text>
                                <Switch 
                                    value = {ftpOpen}
                                    onValueChange={openFtp}
                                />
                            </View>
                            <Text style={PopUpStyle.terms}>서버를 만들면 메이트톡의 <Text style = {{fontWeight : 'bold', color : Colors.sub2}}>커뮤니티 지침</Text>에 동의하게 됩니다.</Text>
                        </View>
                        <View style = {PopUpStyle.bottom}>
                            <Pressable onPress={popClose}>
                                <Text style = {PopUpStyle.back}>뒤로 가기</Text>
                            </Pressable>
                            <View style = {PopUpStyle.button}>
                                <Button
                                    title={"생성"}

                                    height={40}
                                    
                                    onPress={workspaceCreate}
                                />
                            </View>
                        </View>
                        <FtpPopUp
                            ftpOpen={ftpOpen}

                            ftpClose = {ftpClose}
                            ftpConfirm = {ftpConfirm}

                            setFtpInfo = {setFtpInfo}
                        />
                        </>
                        :
                        <>
                        <View style = {PopUpStyle.middle}>
                            <Text style = {PopUpStyle.title}>구성원 추가</Text>
                            <Text style = {PopUpStyle.name}>구성원 ID</Text>
                            <View style = {PopUpStyle.input}>
                                <Input 
                                    placeholder={'구성원 id를 입력해주세요'}

                                    width = {'80%'}

                                    borderColor={Colors.sub2}
                                    
                                    placeholderColor={'gray'}
                                    placeholderSize={14}
                                    placeholderWeight={'0'}
                                />
                            </View>
                        </View>
                        <View style = {PopUpStyle.bottom}>
                            <Pressable onPress={popClose}>
                                <Text style = {PopUpStyle.back}>뒤로 가기</Text>
                            </Pressable>
                            <View style = {PopUpStyle.button}>
                                <Button
                                    title={"추가"}

                                    height={40}
                                />
                            </View>
                        </View>
                        </>
                    }
                </View>
            </View>
        </Modal>
    )
}