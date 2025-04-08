import React from "react";
import { Image, Text, View } from "react-native";

import { PeopleStyle } from "./PeopleStyle";
import { Colors } from "../../assets/color/globalStyles";

export const People = ({
    name,

    status
}) => {
    return(
        <View style = {PeopleStyle.container}>
            <View style = {PeopleStyle.title}>
                <Image 
                    source={require("../../assets/images/User.png")}
                    style = {PeopleStyle.icon}
                />
                <Text style = {PeopleStyle.name}>{name}</Text>
            </View>
            <View style={PeopleStyle.statusLine}>
            <View
                style={[
                    PeopleStyle.statusIcon,
                    status == 'online'
                        ? { backgroundColor: Colors.primary }
                        : status == 'offline'
                        ? { backgroundColor: 'red' }
                        : { backgroundColor: Colors.sub3 },
                ]}
            />
            {
                status == 'online'
                ?
                (
                    <Text style = {[PeopleStyle.status, {color : Colors.primary}]}>온라인</Text>
                )
                :
                status == 'offline'
                ?
                (
                    <Text style = {[PeopleStyle.status, {color : 'red'}]}>오프라인</Text>
                )
                :
                (
                    <Text style = {[PeopleStyle.status, {color : Colors.sub3}]}>자리비움</Text>
                )
            }
            </View>
        </View>
    )
}