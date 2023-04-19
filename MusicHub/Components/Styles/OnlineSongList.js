import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
    loadV1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: "center",
    },
    sav: {
        flex: 1,
    },
    v1: {
        // width:"50%",
    },
    v2: {
        flex: 1,
        padding: 10,
    },
    t1: {
        color: "black",
        fontSize: 22,
        fontWeight: 800,
        borderBottomWidth: 1,
        borderBottomColor: "#7A7A7A",
        padding: 15,
    },
    t2: {
        color: "black",
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
        borderWidth: 3,
        borderColor: "green",
    },
    flatListRow: {
        justifyContent: 'space-between',
    },
    flatListHeader: {
    },
    flatListFooter: {
    },
});

export default styles;