import React, { useEffect, useState } from "react";
import { InviteListPresenter } from "./InviteListPresenter";
import { useNavigation } from "@react-navigation/native";
import { useAuthStore } from "../../store/authStore";
import { API } from "../../api";
import { Alert } from "react-native";

const InviteListContainer = () => {
    const navigation = useNavigation();

    const [inviteList , setInviteList] = useState([]);

    const { user } = useAuthStore();

    useEffect(() => {
        (
            async() => {
                const getInviteList = await API.getInvites(user.id);

                const result = getInviteList.data
                setInviteList(result)

                console.log("확인:", result)
            }
        )()
    }, [])

    const InviteAccess = async (inviteId) => {
        const Inviteresult = await API.inviteAccess(inviteId, { invite_access : 1 })

        // console.log('확인: ', Inviteresult)

        if (Inviteresult.status === 200) {
            Alert.alert('초대 수락하셨습니다.')
        }
    }

    return(
        <InviteListPresenter
            navigation = {navigation}

            inviteList = {inviteList}
            InviteAccess = {InviteAccess}
        />
    )
}

export default InviteListContainer;