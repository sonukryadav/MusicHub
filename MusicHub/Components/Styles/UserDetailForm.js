import { StyleSheet, Dimensions } from "react-native";

const { width} = Dimensions.get("window");

const styles = StyleSheet.create({
    sav: {
        flex: 1,
        alignItems:"center"
    },
    container: {
        flex: 1,
        width:width *0.9,
        justifyContent: "center",
    },
    text2: {
        fontSize: 14,
        color:"black",
    },
    input: {
        borderWidth: 1,
        borderColor: "gray",
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginBottom: 1,
        fontSize: 18,
        color:"black",
    },

    pickerContainer: {
        borderWidth: 1,
        borderColor: "gray",
        borderRadius: 5,
        marginBottom: 20,
        marginTop: 16,
    },

    picker: {
        height: 50,
        color: "black",
    },
    datePickerButton: {
        borderWidth: 1,
        borderColor: "gray",
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginBottom: 10,
        justifyContent: "center",
    },
    pickerV: {
        flexDirection:"row",
        justifyContent: "space-between",
    },
    datePickerButtonText: {
        fontSize: 16,
        paddingHorizontal: 8,
        color: "black",
    },
    createAccount1:{
        textAlign: "center",
        backgroundColor: "#276db3",
        padding: 15,
        borderRadius: 10,
        fontSize: 20,
        fontWeight: 700,
        marginVertical: 20,
        elevation:15
    },
    v1: {
        flexDirection: "row",
    },
    input2: {
        flex: 1,
        borderWidth: 1,
        borderColor: "grey",
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 15,
        fontSize: 18,
        color:"black",
    },
    icon1: {
        position: "absolute",
        right: 10,
        alignSelf: "center",
    },
    text3: {
        fontSize: 14,
        color:"black",
    },
    textBottom: {
        textAlign: "center",
        color: "black",
    }
});

export default styles;