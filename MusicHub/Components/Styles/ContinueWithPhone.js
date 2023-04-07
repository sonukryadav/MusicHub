import { StyleSheet } from "react-native";
import { Dimensions } from 'react-native';

const windowHeight = Dimensions.get('window').height;


const styles = StyleSheet.create({
	sav: {
		flex:1
	},
	sv: {
		flex:1
	},
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	phone: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#fff',
		borderWidth: 1,
		borderRadius: 5,
		borderColor: '#d9d9d9',
		padding: 10,
		marginHorizontal: 50,
		marginBottom: 15,
	},
	countryPickerButton: {
		paddingHorizontal: 10,
		color:"black",
	},
	phoneInput: {
		flex: 1,
		marginLeft: 10,
		fontSize: 16,
		color: "black"
	},
	label1: {
		fontSize: 20,
		fontWeight: 'bold',
		marginBottom: 15,
		color:"black",
	},
	label2: {
		fontSize: 20,
		fontWeight: 'bold',
		marginTop: 25,
		color: "black",
	},
	otpContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
	otpInput: {
		height: 50,
		width: 50,
		borderWidth: 1,
		borderColor: '#ccc',
		borderRadius: 5,
		paddingHorizontal: 10,
		textAlign: 'center',
		marginHorizontal: 5,
		fontSize: 20,
		color:"black"
	},
	button: {
		backgroundColor: '#4287f5',
		borderRadius: 5,
		paddingVertical: 12,
		paddingHorizontal: 40,
		marginBottom: 10,
	},
	buttonText: {
		color: '#fff',
		fontSize: 16,
		fontWeight: 'bold',
	},
	otpView: {
		marginVertical:20
	},
	line1: {
		fontSize: 20,
		color: "grey",
    },
    warnText: {
		textAlign: "center",
		color: "black",
	},
	selectCode: {
		modal: {
			height: windowHeight - 600,
		},
		textInput: {
			height: 50,
			borderRadius: 0,
			color: "black",
		},
		countryButtonStyles: {
			height: 50,
		},
		countryName: {
			color:"black",
		},
		dialCode: {
			color:"black",
		},
	}

});

export default styles;