import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
    loadV1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: "center",
    },
    sav1: {
        flex: 1,
    },
    scv: {
        flex: 1,
    },
    v1: {
        flex: 1,
    },
    v2: {
        flex: 1,
    },
    v3: {
        flex: 1,
        borderWidth: 4,
        borderColor: "teal",
        justifyContent: "center",
        alignItems: "center",
    },
    flatListView: {
        width: width * 0.9,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        // borderWidth:2,
    },
    v4: {
        width: width * 0.9,
    },
    img1: {
        width: "96%",
        height: height * 0.35,
        borderRadius: 10,
    },
    v5: {
        marginTop: 20,
        width: "70%",
        padding: 10,
        borderRadius: 25,
    },
    v6: {
        width: "75%",
        alignItems: "center",
        marginTop: 15,
    },
    v7: {
        justifyContent: "center",
        alignItems: "center",
        width: "90%",
    },
    v8: {
        width: "83%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    v9: {
        width: "90%",
        flexDirection: "row",
        justifyContent: "space-evenly",
        marginTop: 20,
    },
    t1: {
        color: "#000",
        textAlign: "center",
        fontWeight: 800,
        fontSize: 25,
    },
    t2: {
        color: "#57514E",
        textAlign: "center",
        fontWeight: 600,
        fontSize: 15,
        marginTop: 5,
    },
    slider: {
        width: "100%",
        height: 20,
    },
    time: {
        color: "#363636",
        fontSize: 12,
        fontWeight: 700,
    }
});

export default styles;