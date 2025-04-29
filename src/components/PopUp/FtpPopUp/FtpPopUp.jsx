import React, { useState } from "react";
import { Modal, Text, View } from "react-native";
import { Button } from "../../Button/Button";
import { FtpPopUpStyle } from "./FtpPopUpStyle";
import { Input } from "../../Input/Input";
import { Dropdown } from "react-native-element-dropdown";
import { Colors } from "../../../assets/color/globalStyles";

export const FtpPopUp = ({
    ftpOpen,
    ftpClose,

    setFtpInfo
}) => {
    const type = [
        { label : 'sftp', value : 'SFTP'},
        { label : 'ftp', value : 'FTP'},
    ]

    const [selectedType, setSelectedType] = useState('');

    return(
        <Modal
            transparent
            animationType="fade"
            visible={ftpOpen}
            onRequestClose={ftpClose}
        >
            <View style = {FtpPopUpStyle.container}>
                <View style = {FtpPopUpStyle.wrap}>
                    <Text style={FtpPopUpStyle.name}>FTP서버</Text>
                    <View>
                        <Dropdown
                            style={FtpPopUpStyle.dropdown}
                            selectedTextStyle={{ color: Colors.sub3, fontWeight : 'bold' }}
                            data={type}
                            labelField="label"
                            valueField="value"
                            placeholder="ftp"
                            value={selectedType}
                            onChange={item => {
                                setSelectedType(item.value); // <- 이 줄 추가
                                setFtpInfo(prev => ({
                                    ...prev,
                                    room_ftptype: item.value
                                }));
                            }}
                        />
                        <Input 
                            placeholder={'FTP 주소를 입력해주세요'}

                            onChangeText={((room_ftpip) =>
                                setFtpInfo((prev) => ({
                                    ...prev,
                                    room_ftpip : room_ftpip
                                }))
                            )}
                        />
                    </View>
                    <Text style={FtpPopUpStyle.name}>저장경로</Text>
                    <Input 
                        placeholder={'저장경로를 입력해주세요'}

                        onChangeText={((room_ftppath) =>
                            setFtpInfo((prev) => ({
                                ...prev,
                                room_ftppath : room_ftppath
                            }))
                        )}
                    />
                    <Text style={FtpPopUpStyle.name}>계정</Text>
                    <Input 
                        placeholder={'FTP 아이디를 입력해주세요'}

                        onChangeText={((room_ftpid) =>
                            setFtpInfo((prev) => ({
                                ...prev,
                                room_ftpid : room_ftpid
                            }))
                        )}
                    />
                    <Text style={FtpPopUpStyle.name}>패스워드</Text>
                    <Input 
                        placeholder={'FTP 패스워드를 입력해주세요'}

                        onChangeText={((room_ftppw) =>
                            setFtpInfo((prev) => ({
                                ...prev,
                                room_ftppw : room_ftppw
                            }))
                        )}
                    />
                    <Text style={FtpPopUpStyle.name}>포트</Text>
                    <Input 
                        placeholder={'21'}

                        onChangeText={((room_ftpport) =>
                            setFtpInfo((prev) => ({
                                ...prev,
                                room_ftpport : room_ftpport
                            }))
                        )}
                    />
                    <View style={FtpPopUpStyle.bottom}>
                        <Button
                            title={'닫기'}

                            onPress={ftpClose}

                            width={'40%'}
                        />
                        <Button
                            title={'확인'}

                            onPress={ftpClose}

                            width={'40%'}
                        />
                    </View>
                </View>
            </View>
        </Modal>
    )
}