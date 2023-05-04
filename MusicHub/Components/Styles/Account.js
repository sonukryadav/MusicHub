import { StyleSheet, StatusBar, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const styles = (theme) => {
    return (
        StyleSheet.create({
            safeAreaView: {
                flex: 1,
                backgroundColor: theme ? "#fff" : "rgb(51, 51, 51)",
            },
            scr: {
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
            },
            profileImg: {
            },
            image: {
                width: 150,
                height: 150,
                borderRadius: 75,
                marginBottom: 20,
            },
            fieldsContainer: {
                width: width * 0.9,
            },
            fieldContainer: {
                marginBottom: 20,
                borderWidth: 1,
                padding: 10,
                borderColor: theme ? "grey" : "grey",
                elevation:5,
                shadowColor: theme ? "#6eb1f5" : "#6eb1f5",
                borderRadius: 15,
            },
            label: {
                fontSize: 18,
                fontWeight: 'bold',
                marginBottom: 5,
                color: theme ? "black" : "#fff",
            },
            text: {
                fontSize: 16,
                color: theme ? "black" : "#fff",

            },
            input: {
                height: 40,
                borderWidth: 2,
                borderColor: theme ? "#9b9d9e" : "#9b9d9e",
                borderRadius: 5,
                paddingHorizontal: 10,
                fontSize: 16,
                color: theme ? "black" : "#fff",
            },
            editButton: {
                backgroundColor: '#007aff',
                paddingVertical: 10,
                paddingHorizontal: 60,
                borderRadius: 5,
            },
            editButtonText: {
                color: '#fff',
                fontSize: 18,
                fontWeight: 'bold',
            },
            saveButton: {
                backgroundColor: '#007aff',
                paddingVertical: 10,
                paddingHorizontal: 60,
                borderRadius: 5,
            },
            saveButtonText: {
                color: '#fff',
                fontSize: 18,
                fontWeight: 'bold',
            },
        })
    );
}

export default styles;