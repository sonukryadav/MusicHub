import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    loadV1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: "center",
    },
    sav: {
        flex: 1,
        backgroundColor:"white"
    },
    v1: {
        flex: 1,
        padding: 5,
    },
    v2: {
        flex:1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems:"center",
        margin: 8,
        backgroundColor: "#EBEBEB",
        padding: 5,
        borderRadius: 15,
    },
    v3: {
        flex:0.97,
        flexDirection: "row",
        alignItems: "center",
    },
    v4: {
    },
    v5: {
        marginLeft: 15,
        width: "80%",
    },
    v6: {
        flex:0.03,
        alignItems: "center",
        padding: 8,
    },
    t1: {
        fontSize:14,
        fontWeight: 700,
        color: "black",
    },
    t2: {
        fontSize: 12,
        fontWeight: 600,
        color: "#474240",
    },
    t3: {
        fontSize: 10,
        fontWeight: 600,
        color: "#474240",
    },
    img1: {
    },
});

export default styles;