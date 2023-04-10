import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    sav1: {
        flex: 1,
        borderWidth: 2,
        borderColor:"red",
    },
    v1: {
        flex: 1,
        borderWidth: 2,
        borderColor:"green",
    },
    v2: {
        flex: 1,
        borderWidth: 2,
    },
    v3: {
    flex: 1,
        borderWidth: 2,
        borderBottomColor: "teal",
        justifyContent: "center",
        alignItems: "center",
    },
    v4: {
        width: 300,
        height: 300,
        elevation:15
    },
    img1: {
        width: "100%",
        height: "100%",
        borderRadius: 15,
    },
    v5: {
        marginTop: 20,
        width: "65%",
        // backgroundColor: "#E3E3E3",
        padding: 10,
        borderRadius:25,
    },
    v6: {
        // backgroundColor:"#005"
        width: "70%",
        alignItems: "center",
        marginTop:15,
    },
    v7: {
        justifyContent: "center",
        alignItems:"center",
        width: "90%",
    },
    v8: {
        width:"83%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems:"center",
    },
    v9: {
        width: "70%",
        flexDirection:"row",
        justifyContent: "space-evenly",
        marginTop:20,
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
        marginTop:5,
    },
    slider: {
        width: "100%",
        height: 20,
        // backgroundColor:"rgba(255, 255, 255,0.95)"
    },
    time: {
        color: "#363636",
        fontSize: 12,
        fontWeight:700,
    }
});

export default styles;