import { StyleSheet } from "react-native";
import { Colors } from "../../../../assets/color/globalStyles";

export const SignUpBoxStyle = StyleSheet.create({
    container : {
        alignItems : 'center'
    },

    logo : {
        marginTop : 30,
        marginBottom : 70
    },

    titleContainer: {
        flexDirection: "row",

        alignItems: "center",

        marginTop: 10,
        marginBottom : 50,

        width: '75%',
    },

    line: {
        flex: 1,

        height: 1.5,

        backgroundColor: Colors.sub3,
    },

    title : {
        color : Colors.sub3,

        fontSize : 20,
        fontWeight: 'bold',
        
        marginHorizontal: '25',
    }
})