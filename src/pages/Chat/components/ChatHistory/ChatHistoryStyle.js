import { StyleSheet } from "react-native";
import { Colors } from "../../../../assets/color/globalStyles";

export const ChatHistoryStyle = StyleSheet.create({
    scrollContainer: {
        flex: 1,
    },

    container : {
        padding : 20,
        flexGrow: 1,
    },

    other : {
        margin : 10,
    },

    info : {
        flexDirection : 'row',

        alignItems : 'center',
    },

    profile: {
        width : 36,
        height : 36,

        resizeMode : 'contain',
    },

    userName : {
        fontSize : 20,
        fontWeight : 'bold',

        marginLeft : 10,
    },

    userTime : {
        fontWeight : 'bold',
        
        color : Colors.sub3,

        marginLeft : 10,
        marginTop : 10,
    },

    otherMessageBox : {
        width : '50%',

        borderWidth : 1,
        borderColor : Colors.sub4,
        borderRadius : 10,

        backgroundColor : Colors.sub4,

        marginTop : 10,
    },

    otherMessage : {
        fontSize : 16,
        fontWeight : 'bold',

        padding : 15,
    },

    MyMessageWrap : {
        flexDirection : 'row',

        justifyContent : 'flex-end',

        margin : 10,
    },

    MyMessageBox : {
        width : '50%',

        borderWidth : 1,
        borderColor : Colors.primary,
        borderRadius : 10,

        backgroundColor : Colors.primary
    },

    MyMessage : {
        fontSize : 16,
        fontWeight : 'bold',

        color : Colors.sub4,

        padding : 15,
    },

    MyTime : {
        fontWeight : 'bold',

        color : Colors.sub3,

        marginLeft : 5,

        alignSelf : 'flex-end'
    },

    // 파일 메시지 스타일
    MyFileBox: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        backgroundColor: Colors.primary,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Colors.primary,
    },

    otherFileBox: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        backgroundColor: Colors.sub4,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Colors.sub4,
    },

    fileIconContainer: {
        marginRight: 10,
    },

    fileIcon: {
        fontSize: 24,
    },

    fileInfo: {
        flex: 1,
    },

    fileName: {
        fontSize: 14,
        fontWeight: 'bold',
        color: Colors.sub1,
        marginBottom: 2,
    },

    fileSize: {
        fontSize: 12,
        color: Colors.sub3,
    }
})