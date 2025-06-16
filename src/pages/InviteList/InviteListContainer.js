import React, { useEffect, useState } from "react";
import { InviteListPresenter } from "./InviteListPresenter";
import { useNavigation } from "@react-navigation/native";
import { useAuthStore } from "../../store/authStore";
import { API } from "../../api";

const InviteListContainer = () => {
    const navigation = useNavigation();

    const [inviteList , setInviteList] = useState({
            invite_id : '',
            room_name : '',
        });

    const { user } = useAuthStore();


    useEffect(() => {
        (
            async() => {
                const getInviteList = await API.getInvites(user.id);

                const result = getInviteList.data.map(item => item)
                console.log("dr:",result.room_name)
            }
        )()
    }, [])

    return(
        <InviteListPresenter 
            navigation = {navigation}
        />
    )
}

export default InviteListContainer;