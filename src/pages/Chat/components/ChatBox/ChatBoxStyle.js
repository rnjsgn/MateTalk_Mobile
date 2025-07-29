import { StyleSheet } from "react-native";

export const ChatBoxStyle = StyleSheet.create({
    container : {
        height : '100%',
        flex: 1,
    },

    roominfo : {
        flexDirection : 'row',
        justifyContent : 'space-between',
        padding: 10,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },

    chatHistoryContainer: {
        flex: 1,
        marginBottom: 80, // 키보드 영역을 위한 여백
    },

    keyboard : {
        width : '100%',
        position : 'absolute',
        bottom : 0,
        marginBottom : 64
    }
})