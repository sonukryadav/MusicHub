import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

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
                // width:"50%",
            },
            v2: {
                flex: 1,
                padding: 10,
            },
            t1: {
                color: theme? "black": "white",
                fontSize: 22,
                fontWeight: 800,
                borderBottomWidth: 1,
                borderBottomColor: "#7A7A7A",
                padding: 15,
            },
            t2: {
                color: theme ? "black" : "white",
                textAlign: "center",
                padding: 5,
                fontSize: 14,
                fontWeight: 500,
            },
            posterImage: {
                width: "100%",
                height: 200,
                borderRadius: 10,
            },
            flatList1: {
                paddingTop: 1,
            },
            flatListRow: {
                justifyContent: 'space-between',
            },
            flatListHeader: {
            },
            flatListFooter: {
            },
        })
    );
}

export default styles;