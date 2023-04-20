import { StyleSheet, Platform } from "react-native";


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        // marginTop: Platform.select({ android: 0, ios: 0, web: 0 }),
        // padding: 60,
    },
    v0: {
        alignItems:"center",
    },
    viewStart: {
        flex: 1,
        justifyContent: "center",
        width:"70%"
    },
    text1: {
        fontSize: 30,
        textAlign: "center",
        color: "black",
        fontWeight: "600",
        marginVertical:25,
    },
    input1: {
        height: 45,
        borderWidth: 1.5,
        borderRadius: 20,
        paddingLeft: 20,
        fontSize: 20,
        color: "black",
    },
    input2: {
        flex: 1,
        height: 45,
        borderWidth: 1.5,
        borderRadius: 20,
        paddingLeft: 20,
        fontSize: 20,
        color: "black",
    },
    text2: {
        fontSize: 14,
        marginHorizontal: 20,
        marginVertical: 8,
        marginBottom: 20,
        color:"black"
    },
    text3: {
        fontSize: 14,
        marginHorizontal: 20,
        marginVertical: 8,
        marginBottom: 20,
        color:"black"
    },
    text4: {
        fontSize: 20,
        borderWidth: 1,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 25,
        fontWeight: 600,
        textAlign: "center",
        backgroundColor: "#5FACFA",
        color: "#0D0D0D",
        elevation: 10,
    },
    v1: {
        flexDirection: "row",
    },
    icon1: {
        position: "absolute",
        right: 10,
        alignSelf: "center",
    },
    err1: {
        textAlign: "center",
        color: "black",
    },
});

export default styles;