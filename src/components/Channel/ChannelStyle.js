import { StyleSheet } from "react-native";
import { Colors } from "../../assets/color/globalStyles";

export const ChannelStyle = StyleSheet.create({
    container : {
        width : '100%',

        paddingLeft : 25,
        paddingRight : 25,
        
        marginTop : 10,
        marginBottom : 10,

        flexDirection: 'row',

        justifyContent : 'space-between',
        alignItems : 'center'
    },

    title : {
        flexDirection : 'row',

        alignItems : 'center'
    },

    icon : {
        width : 32,
        height : 32,
        resizeMode : 'contain',

        marginRight : 5,
    },

    name : {
        fontSize : 16,
        fontWeight : 'bold',

        color : Colors.sub2
    },

    count : {
        width : '10%',

        fontWeight : 'bold',
        color : Colors.sub4,

        backgroundColor : Colors.primary,

        borderRadius : 10,

        textAlign : 'center',
    }
})