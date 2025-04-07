import { StyleSheet } from "react-native";
import { Colors } from "../../assets/color/globalStyles";

export const PeopleStyle = StyleSheet.create({
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

        marginRight : 10,
    },

    name : {
        fontSize : 16,
        fontWeight : 'bold',

        color : Colors.sub2
    },

    statusLine : {
        flexDirection : 'row',

        alignItems : 'center'
    },

    statusIcon : {
        width : 12,
        height : 12,

        borderRadius : 30,
    },

    status : {
        fontSize : 12,
        fontWeight : 'bold',

        color : Colors.primary,

        marginLeft : 5,
    }
})