import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");


const styles = StyleSheet.create({
    v0: {
    },
    v1: {
        margin:10
    },
    containerStyle: {
        backgroundColor:"#B3B3B3"
    },
    inputContainerStyle: {
        backgroundColor: "#2A2F4F",
    },
    inputStyle: {
        color:"#ffffff",
    },
    srV1: {
    },
    srV2: {
    },
    srV3: {
    },
    srT1: {
        color:"black",
    },
    srT2: {
        color: "black",
    },
    v2: {
        borderBottomWidth: 2,
        margin: 20,
        borderColor:"grey",
    },
    t1: {
        color: "black",
        fontSize: 30,
        fontWeight: 800,
        marginVertical: 10,
        marginHorizontal:10
    },
    poster1: {
        width: 100,
        height:100
    },
    v3: {
        borderWidth: 2,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#A1C3C7",
        padding: 5,
        margin: 8,
        borderRadius: 10,
        elevation: 10,
        overflow:"hidden",
    },
    v4: {
    },
    v5: {
        flex:1,
        marginLeft: 20,
        marginRight: 10,
        overflow: "hidden",
    },
    t2: {
        color: "black",
        fontSize: 20,
        fontWeight: 600,
        marginRight: 35,
 
    },
    t3: {
        color:"black"
    }
});

export default styles;