import { StyleSheet, StatusBar, Dimensions} from "react-native";

const { width , height} = Dimensions.get("window");

const styles = StyleSheet.create({
	safeAreaView: {
		flex: 1,
		backgroundColor: "#fff",
	},
	scrollView: {
		justifyContent:"center",
	},
	v2: {
		alignItems: "center",
	},
	image1: {
		width: width*0.5,
		height: 250,
	},
	v3: {
		alignItems: "center",
	},
	t1: {
		fontSize: 25,
		fontWeight: 800,
		color: "black",
	},
	v4: {
		alignItems: "center",
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
		width:width *0.7,
	},
});

export default styles;