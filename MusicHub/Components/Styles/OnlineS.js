import { StyleSheet, Dimensions } from "react-native";
import { store } from "../ReduxKit/store";

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
                // flex: 1,
                padding: 5,
                backgroundColor: theme ? "white" : "rgb(51, 51, 51)",
            },
            v1: {
                // width:"50%",
            },
            t1: {
                color: theme ? "black" : "white",
                fontSize: 22,
                fontWeight: 800,
                borderBottomWidth: 1,
                borderBottomColor: theme? "#7A7A7A" : "white",
                padding: 15,
            },
            v2: {
                flex: 1,
                borderColor: theme ? "#7A7A7A" : "white",
                marginBottom:10
            },
            posterImage: {
                width: width*0.5,
                height: 200,
            },
            flatList1: {
                // borderWidth: 2,
                // borderColor:"green",
            },
            flatListRow: {
                justifyContent: 'space-around',
            },
            flatListHeader: {
            },
            flatListFooter: {
            },
        })
    );
}

export default styles;

