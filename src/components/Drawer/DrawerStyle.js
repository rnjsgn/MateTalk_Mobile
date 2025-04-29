import { StyleSheet } from "react-native";

import { Colors } from "../../assets/color/globalStyles";

export const drawerStyle = StyleSheet.create({
    container: {
        width : '70%',
        height : '100%',

        position : 'absolute',
        left : 0,
        top : 0,
        zIndex : 10,

        backgroundColor : 'white',
    },

    overlay: {
        position: "absolute",
        top: 0,
        left: 0,

        zIndex : 10,

        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.3)",
    },

    search : {
        width : '80%',

        marginTop : 30,
        marginBottom : 20,

        alignSelf : 'center',
    },

    title : {
        flexDirection: 'row',
        
        alignItems: 'center',
        justifyContent : 'space-between',

        borderBottomWidth : 1,
        borderBottomColor : Colors.sub2,

        marginLeft : 20,
        marginRight : 20,
        marginBottom : 10,
        marginTop : 10,

        padding : 10,
    },

    members : {
        flexDirection : 'row',
    },

    name : {
        fontSize : 20,
        fontWeight : 'bold',

        color : Colors.sub2,
    },

    image : {
        resizeMode : 'contain',

        width : 24,
        height : 24,
    }
})