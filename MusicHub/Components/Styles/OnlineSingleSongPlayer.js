import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
    sav: {
        flex: 1,
    },
    scrollV: {
        flex: 1,
        padding: 5,
        alignItems: "center",
    },
    v1: {
        flexDirection: "row",
    },
    img1: {
        width: "100%",
        height: 300,
    },
    v1i: {
        justifyContent: "center",
        alignItems: "center",
        width: "80%",
        backgroundColor: "#9FC7D6",
        padding: 10,
        marginTop: 25,
        borderRadius:10,
    },
    slider: {
        width: "100%",
        height: 20,

    },
    v1ii: {
        width: "80%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    time: {
        color: "#363636",
        fontSize: 12,
        fontWeight: 700,
    },
    v2: {
        width: "90%",
        justifyContent:"center",
        marginTop: 20,
        // borderWidth: 1,
    },
    t1: {
        color: "black",
        textAlign: "center",
        fontSize: 25,
        fontWeight: 700,
    },
    v3: {
        width: "90%",
        flexDirection: "row",
        justifyContent: "space-between",
        // borderWidth: 1,
        marginTop: 18,
        padding: 8,
        backgroundColor: "#E6E6E6",
        borderRadius:10,
    },
    t2: {
        flex:0.5,
        color: "black",
        // textAlign: "center",
        fontSize: 16,
        fontWeight:700,
    },
    t3: {
        flex:0.5,
        color: "black",
        // textAlign: "center",
        fontSize: 16,
        fontWeight: 500,
    },
    v4: {
        width:"100%",
        // borderWidth: 2,
        marginTop: 25,
        alignItems:"center",
    },
    t4: {
        color: "black",
        textAlign: "center",
        fontSize: 16,
        fontWeight:600,
    },
});

export default styles;