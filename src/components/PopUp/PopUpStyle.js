import { StyleSheet } from "react-native";
import { Colors } from "../../assets/color/globalStyles";

export const PopUpStyle = StyleSheet.create({
    container : {
        flex : 1,

        justifyContent : 'center',
        alignItems : 'center'
    },

    wrap : {
        width : '80%',
        // height : '45%',

        backgroundColor : Colors.sub4,

        borderRadius : 10,
    },

    top : {
        alignItems : 'right'
    },

    close : {
        textAlign : 'right',

        fontSize : 20,
        // fontWeight : 'bold',

        color : 'gray',

        padding : 15,
    },

    middle : {
        alignItems : 'center'
    },

    title : {
        fontSize : 24,
        fontWeight : 'bold',

        // color : Colors.sub2,

        marginBottom : 10,
    },

    explain : {
        fontSize : 14,

        // color : Colors.sub2,

        marginBottom : 30,
    },

    name : {
        fontSize : 14,
        fontWeight : 'bold',

        // color : Colors.sub2,

        alignSelf : 'left',

        marginBottom : 5,
        marginLeft : 20,
    },

    input : {
        width : '85%',

        margin : 5,
        marginBottom : 10,
    },

    ftpBox : {
        flexDirection : 'row',

        // alignSelf : 'flex-start',
        // justifyContent : 'center'
    },

    terms : {
        fontSize : 12,

        // color : Colors.sub2,
    },

    bottom : {
        flexDirection : 'row',

        justifyContent : 'space-between',
        alignItems : 'center',

        marginTop : 50,
        marginLeft : 20,
        marginRight : 20,
        marginBottom : 20,
    },

    back : {
        fontSize : 14,
        fontWeight : 'bold',

        color : 'black'
    },

    button : {
        width : '20%',
    }
})