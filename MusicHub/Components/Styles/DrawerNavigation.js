import { StyleSheet } from "react-native";

const lightTheme = StyleSheet.create({
    drawerContScroll: {
        backgroundColor: "white",
        marginTop : -3,
    },
    view1: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 15,
        backgroundColor: "rgb(0, 153, 255)",
    },
    toggle1: {
    },
    toggle2: {
        color: "white"
    },
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 100,
        borderWidth: 2,
        borderColor: "white"
    },
    userName: {
        fontWeight: 700,
        margin: 5,
        color: "white"
    },
    userNumber: {
        color: "white",
        fontSize: 11
    },
    drawerText: {
        fontWeight: 600,
        fontSize: 14,
        color: "black"
    },
    v7: {
        backgroundColor: "rgb(51, 153, 255)",
        padding: 10,
        borderRadius: 50,
        borderWidth: 3,
        borderColor: "black"
    }
});


const darkTheme = StyleSheet.create({
    drawerContScroll: {
        backgroundColor: "rgb(51, 51, 51)"
    },
    view1: {
        flex: 1,
        borderWidth: 2,
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 15,
        backgroundColor: "black"
    },
    toggle1: {
    },
    toggle2: {
        color: "white"
    },
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 100,
        borderWidth: 2,
        borderColor: "white"
    },
    userName: {
        fontWeight: 700,
        margin: 5,
        color: "white"
    },
    userNumber: {
        color: "white",
        fontSize: 11
    },
    drawerText: {
        fontWeight: 600,
        fontSize: 14,
        color: "white"
    },
    v7: {
        backgroundColor: "rgb(51, 153, 255)",
        padding: 10,
        borderRadius: 50,
        borderWidth: 3,
        borderColor: "white"
    }
});

export { lightTheme, darkTheme };