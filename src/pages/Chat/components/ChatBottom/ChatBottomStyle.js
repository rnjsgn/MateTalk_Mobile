import { StyleSheet } from "react-native";
import { Colors } from "../../../../assets/color/globalStyles";

export const ChatBottomStyle = StyleSheet.create({
    container : {
        width : '100%',
        height : 80,

        backgroundColor : Colors.sub2,

        justifyContent : 'center',
        alignItems : 'center',

        // position : 'absolute',
        // bottom : 0,
    },

    wrap : {
        width : '95%',
    },

    fileInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: Colors.sub4,
        padding: 10,
        marginTop: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Colors.sub3,
    },

    fileName: {
        fontSize: 14,
        fontWeight: 'bold',
        color: Colors.sub1,
        flex: 1,
    },

    sendButton: {
        backgroundColor: Colors.primary,
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 5,
        marginLeft: 10,
    },

    sendButtonDisabled: {
        backgroundColor: Colors.sub3,
        opacity: 0.6,
    },

    sendButtonText: {
        color: Colors.sub4,
        fontSize: 12,
        fontWeight: 'bold',
    }
})