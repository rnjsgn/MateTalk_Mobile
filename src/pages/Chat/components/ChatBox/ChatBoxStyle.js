import { StyleSheet } from "react-native";

export const ChatBoxStyle = StyleSheet.create({
    container : {
        height : '100%'
    },

    roominfo : {
        flexDirection : 'row',

        justifyContent : 'space-between'
    },

    keyboard : {
        width : '100%',

        position : 'absolute',
        bottom : 0,

        marginBottom : 64
    }
})