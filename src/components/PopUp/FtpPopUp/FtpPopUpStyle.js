import { StyleSheet } from "react-native";
import { Colors } from "../../../assets/color/globalStyles";

export const FtpPopUpStyle = StyleSheet.create({
    container : {
        flex : 1,

        justifyContent : 'center',
        alignItems : 'center',
    },

    wrap : {
        width : '80%',
        // height : '45%',

        backgroundColor : Colors.sub4,

        borderRadius : 10,

        padding : 30,
    },

    name : {
        fontSize : 16,
        // fontWeight : 'bold',

        marginBottom : 5,
        marginTop : 10,
    },

    dropdown : {
        width : '30%',
        height : 40,

        borderColor : Colors.sub2,
        borderWidth : 3,
        borderRadius : 10,

        marginBottom : 5,
        padding : 10,

        color : Colors.sub2
    },
    
    bottom : {
        flexDirection: 'row',

        height : 40,
        
        justifyContent : 'space-between',

        marginTop : 15,
    }
})