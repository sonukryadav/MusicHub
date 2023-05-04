import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");


const styles = (theme) => {
    return (
        StyleSheet.create({
            v0: {
                backgroundColor: theme ? "white" : "rgb(51, 51, 51)",
            },
            v1: {
                margin: 10
            },
            containerStyle: {
                backgroundColor: "#B3B3B3"
            },
            inputContainerStyle: {
                backgroundColor: "#2A2F4F",
            },
            inputStyle: {
                color: "#ffffff",
            },
            v2: {
                borderBottomWidth: 2,
                margin: 20,
                borderColor: "grey",
            },
            t1: {
                color: theme ? "black" : "white",
                fontSize: 30,
                fontWeight: 800,
                marginVertical: 10,
                marginHorizontal: 10
            },
            poster1: {
                width: 80,
                height:80
            },
            v3: {
                // borderWidth: 2,
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "#A1C3C7",
                padding: 4,
                margin: 8,
                borderRadius: 10,
                elevation: 10,
                shadowColor: theme ? "black" : "white",
                overflow: "hidden",
            },
            v4: {
            },
            v5: {
                flex: 1,
                marginLeft:15,
                overflow: "hidden",
            },
            t2: {
                color: "black",
                fontSize: 20,
                fontWeight: 600,
                marginBottom:4,
            },
            t3: {
                color: "black"
            },
            srv1: {
                flex:1,
                justifyContent: "center",
                alignItems: "center",
            },
            searchedItem: {
                flexDirection: "row",
                width: width * 0.8,
                padding: 10,
                elevation: 5,
                shadowColor: theme ? "black" : "#cfcfcf",
                marginBottom: 10,
                borderRadius: 20,
                backgroundColor: theme ? "#b3b4b5" : "black" ,
            },
            sV1: {
                flex: 0,
            },
            sV2: {
                flex: 1,
                marginLeft:10,
            },
            searchImage: {
                width: 60,
                height:60
            },
            st1: {
                color: theme ? "black" : "#ffffff",
                fontSize:18,
            },
            st2: {
                color: theme ? "black" : "#cfcfcf",
                fontSize: 10,
            },
            foundFor: {
                color: theme ? "black" : "#ffffff",
                fontSize: 20,
                marginVertical: 10,
                fontWeight: 700,
            }
        })
    );
}

export default styles;