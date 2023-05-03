import { StyleSheet } from "react-native";

const styles = (theme) => {
    return (
        StyleSheet.create({
            loadV1: {
                flex: 1,
                justifyContent: 'center',
                alignItems: "center",
            },
            sav: {
                flex: 1,
                backgroundColor: theme ? "white" : "rgb(51, 51, 51)",
            },
            v1: {
                flex: 1,
                padding: 5,
            },
            v2: {
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                margin: 8,
                backgroundColor: theme ? "#55a2e0" : "#ffffff",
                padding: 5,
                borderRadius: 15,
            },
            v3: {
                flex: 0.9,
            },
            v3i: {
                flexDirection: "row",
                alignItems: "center",
            },
            v4: {
            },
            v5: {
                marginLeft: 15,
            },
            v6: {
                flex: 0.1,
                alignItems: "center",
            },
            v6i: {
                padding: 10,
            },
            t1: {
                fontSize: 14,
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
        })
    );
}

export default styles;