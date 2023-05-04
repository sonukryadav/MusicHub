import { StyleSheet, Dimensions} from "react-native";

const { width, height } = Dimensions.get("window");


const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
	},
	v0: {
		flex:1,
		alignItems: "center",
		justifyContent: "center",
	},
	viewStart: {
		justifyContent: "center",
		width: width*0.92,
	},
	text1: {
		fontSize: 25,
		textAlign: "center",
		color: "black",
		fontWeight: "700",
		marginVertical: 25,
	},
	input1: {
		width:width *0.92,
		height: 45,
		borderWidth: 1.5,
		borderRadius: 20,
		paddingLeft: 20,
		fontSize: 20,
		color: "black",
	},
	inpV2: {
		width: width * 0.92,
	},
	input2: {
		width: width * 0.92,
		height: 45,
		borderWidth: 1.5,
		borderRadius: 20,
		paddingLeft: 20,
		fontSize: 20,
		color: "black",
	},
	text2: {
		fontSize: 14,
		marginHorizontal: 20,
		marginVertical: 8,
		marginBottom: 20,
		color: "black",
		alignSelf:"flex-start"
	},
	text3: {
		fontSize: 14,
		marginHorizontal: 20,
		marginVertical: 8,
		marginBottom: 20,
		color:"black",
	},
	text4: {
		fontSize: 20,
		borderWidth: 1,
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderRadius: 25,
		fontWeight: 600,
		textAlign: "center",
		backgroundColor: "#5FACFA",
		color: "#0D0D0D",
		elevation: 10,
		width: width * 0.92,
	},
	v1: {
		flexDirection:"row",
	},
	icon1: {
		position: "absolute",
		right: 10,
		alignSelf:"center",
	},
	err1: {
		textAlign: "center",
		color:"black",
    },
});

export default styles;