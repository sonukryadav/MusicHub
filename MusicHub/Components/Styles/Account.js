import { StyleSheet, StatusBar, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
        backgroundColor: "#fff",
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
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
        width: '100%',
    },
    fieldContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        color:"black",
    },
    text: {
        fontSize: 16,
        color: '#444',
    },
    input: {
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
        fontSize: 16,
        color:"black",
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
});

export default styles;