import { StyleSheet } from "react-native";

const styles = (theme) => {
    return (
        StyleSheet.create({
            sav: {
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor:"#fff",
            },
            scr: {
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            },
            t1: {
                color: "#FFFFFF",
                fontSize: 25,
                fontWeight: 700,
                paddingVertical: 14,
                paddingHorizontal: 28,
                borderWidth: 2,
                borderColor: "#000000",
                borderRadius: 10,
                backgroundColor:"#5996f7"
            },
        })
    )
}

export default styles;