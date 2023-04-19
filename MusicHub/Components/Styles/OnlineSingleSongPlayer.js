import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
    sav: {
        flex:1,
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
    v2: {
        width:"90%",
        flexDirection: "row",
        justifyContent: "space-between",
        borderWidth: 1,
        marginVertical:20,
    },
    t1: {
        flex:0.5,
        color: "black",
        textAlign: "center",
        fontSize: 16,
        fontWeight:700,
    },
    t2: {
        flex:0.5,
        color: "black",
        textAlign: "center",
        fontSize: 16,
        fontWeight: 500,
    }
});

export default styles;