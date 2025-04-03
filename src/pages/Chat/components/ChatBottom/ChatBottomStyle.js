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
    }
})