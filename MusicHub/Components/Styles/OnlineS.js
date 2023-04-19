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
        padding:5,
    },
    v1: {
        // width:"50%",
    },
    t1: {
        color: "black",
        fontSize: 22,
        fontWeight: 800,
        borderBottomWidth: 1,
        borderBottomColor: "#7A7A7A",
        padding:15,
    },
    v2: {
        flex: 1,
        padding:10,
    },
    posterImage: {
        width: "100%",
        height:200
    },
    flatList1: {
        paddingTop:1,
        borderWidth: 3,
        borderColor:"green",
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

