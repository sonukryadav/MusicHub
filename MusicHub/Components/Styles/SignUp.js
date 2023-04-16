import { StyleSheet, StatusBar} from "react-native";


const styles = StyleSheet.create({
	safeAreaView: {
		flex: 1,
	},
	scrollView: {
		flex: 1,
	},
	v1: {
		flex: 1,
		alignItems: "center",
		backgroundColor: "#fff",
		justifyContent: "center"
	},
	v2: {
		alignItems: "center",
	},
	image1: {
		width: 320,
		height: 250,
	},
	v3: {
		alignItems: "center",
	},
	t1: {
		fontSize: 25,
		fontWeight: 800,
		color:"black"
	},
	v4: {
		paddingVertical: 30,
	},
	button1: {
		fontSize: 20,
		borderWidth: 1,
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderRadius: 25,
		marginVertical: 15,
		fontWeight: 600,
		textAlign: "center",
		backgroundColor: "#5FACFA",
		color: "#0D0D0D",
		elevation: 10,
	},
});

export default styles;