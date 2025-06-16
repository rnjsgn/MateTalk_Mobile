import { StyleSheet } from "react-native";
import { Colors } from "../../../../assets/color/globalStyles";

export const InviteListBoxStyle = StyleSheet.create({
    container : {
        width : '80%',
        
        padding : 15,
        marginTop : 10,
        marginBottom : 5,

        borderColor : Colors.sub2,
        borderWidth : 1,
        borderRadius : 10,
    },

    titleBox : {
        flexDirection : 'row',

        justifyContent : 'space-between',

        marginBottom : 10,
    },

    title : {
        fontSize : 16,
        fontWeight : 'bold'
    },

    inviteName : {
        fontSize : 16,
        fontWeight : 'bold'
    },

    buttonBox : {
        flexDirection : 'row',

        justifyContent : 'space-between',
    }
})