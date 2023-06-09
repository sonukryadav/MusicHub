import { StyleSheet, Dimensions} from "react-native";

const { width, height } = Dimensions.get("window");


const styles = StyleSheet.create({
    loadV1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: "center",
    },
    sav: {
        flex: 1,
        backgroundColor: "#fff",
    },
    container0: {
        flex: 1,
        justifyContent: 'center',
        alignItems: "center",
    },
    googleButton: {
        width:width*0.8,
        height: 80,
        backgroundColor: "black",
    },
    textWarn: {
        textAlign: "center",
        color: "black",
    },
    text1: {
        fontSize: 25,
        textAlign: "center",
        color: "black",
        fontWeight: "700",
        marginVertical: 25,
        alignItems:"center",
    },
    v1: {
        justifyContent: "center",
        alignItems: "center",
    },

});

export default styles;