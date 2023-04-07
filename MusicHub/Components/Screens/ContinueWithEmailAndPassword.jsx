import React from "react";
import {
	View,
	Text,
	ScrollView,
	SafeAreaView,
	TextInput,
	Alert,
	TouchableOpacity,
} from "react-native";
import styles from "../Styles/ContinueWithEmailAndPassword";
import FontAwesome5  from "react-native-vector-icons/FontAwesome5";
import auth from '@react-native-firebase/auth';
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { createdUserData } from "../ReduxKit/CreateUserFirebaseAtSignIn";


const ContinueWithEmailAndPassword = () => {
	const [input, setInput] = React.useState({
		email: "",
		password: "",
	});
	const [active, setActive] = React.useState(false);
	const [emailV, setEmailV] = React.useState(false);
	const [showHide, setShowHide] = React.useState(false);
	const [message1, setMessage1] = React.useState("");
	const navigation = useNavigation();
	const dispatch = useDispatch();
	const invalid = `Your password is weak, it should have : \n- password should be of 6 characters length \n- password should contain\n• uppercase letter\n• lowercase letter\n• number\n• special character`;

	const inputs = (name, value) => {
		setInput({ ...input, [name]: value });
	};

	React.useEffect(() => {
		let password = input.password;

		let length = password.length;
		let upperCharLength = (() => {
			let matches = password.match(/[A-Z]/g);
			return matches ? matches.length : 0;
		})();
		let lowerCharLength = (() => {
			let matches = password.match(/[a-z]/g);
			return matches ? matches.length : 0;
		})();
		let digitLength = (() => {
			let matches = password.match(/\d/g);
			return matches ? matches.length : 0;
		})();

		let specialCharLength = (() => {
			let matches = password.match(/[^\w\s]/g);
			return matches ? matches.length : 0;
		})();

		let emailValidation = (function validateEmail(email) {
			const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			return regex.test(email);
		})(input.email);

		if (emailValidation) {
			setEmailV(true);
		} else {
			setEmailV(false);
		}

		if (
			length >= 6 &&
			upperCharLength &&
			lowerCharLength &&
			digitLength &&
			specialCharLength
		) {
			setActive(true);
		} else {
			setActive(false);
		}
	}, [input]);

	React.useEffect(() => {
		setMessage1("");
	}, [input.email, input.password])


	const signOutAndVerify = async(result) => {
		await auth().currentUser.sendEmailVerification();
		await auth().signOut();
		Alert.alert("Verify your email, a link has been sent and then sign in.");
		setInput({
			email: "",
			password: "",
		});
		navigation.navigate("signinforcreate");
	}

	const createAccount = async() => {
			if (emailV && active) {
				auth()
					.createUserWithEmailAndPassword(input.email, input.password)
					.then((result) => {
						setMessage1('User account created now signed in!');
						signOutAndVerify(result);
					})
					.catch(error => {
						// setMessage1(error.message);
						if (error.code === 'auth/email-already-in-use') {
							// If already signup then signin
							auth().signInWithEmailAndPassword(input.email, input.password).then((result) => {
								setMessage1('Signed In!Signed In Successful!.');
								Alert.alert('Signed In!', "Signed In Successful!.");
								const userDetails = {
									displayName: result.user.providerData[0].displayName,
									email: result.user.email,
									emailVerified: result.user.emailVerified,
									phoneNumber: result.user.providerData[0].phoneNumber,
									photoURL: result.user.providerData[0].photoURL,
									uid: result.user.uid,
								}
								dispatch(createdUserData(userDetails));
								setInput({
									email: "",
									password: "",
								});
								navigation.navigate("home");
							}).catch(error => {
								setMessage1(error.message);
								Alert.alert("Seems this email address is already in use, please sign in.");
							});
						} else if (error.code === 'auth/invalid-email') {
							setMessage1(error.message);
							Alert.alert('That email address is invalid!');
						} else if (error.code === 'auth/wrong-password') {
							console.log("wrong password---------------");
							setMessage1(error.message);
							Alert.alert('Invalid password!!');
						} else {
							setMessage1(error.message);
							Alert.alert("Error Occurred! Please try later");
						}
						console.log(error);
					});

			} else {
				setMessage1("Check your email and password!!!");
				Alert.alert("Check your email and password!!!");
			}
	}


	return (
		<SafeAreaView style={styles.container}>
			<ScrollView contentContainerStyle={styles.v0}>
				<View style={styles.viewStart}>
					<Text style={styles.text1}>Create new account</Text>
					<TextInput
						style={styles.input1}
						placeholder="Enter Email"
						value={input.email}
						onChangeText={(email) => inputs("email", email)}
						keyboardType="email-address"
						placeholderTextColor="#4D4D4D"
					/>
					<Text style={styles.text2}>
						{input.email.length === 0 ? "" : !emailV && "❌ Invalid Email"}
					</Text>

					<View style={styles.v1}>
						<TextInput
							style={styles.input2}
							placeholder="Enter Password"
							value={input.password}
							onChangeText={(password) => inputs("password", password)}
							secureTextEntry={!showHide}
							placeholderTextColor="#4D4D4D"
						/>
						<TouchableOpacity style={styles.icon1} onPress={() => setShowHide((pre) => !pre)}>
							{input.password.length === 0 ? "" :
								<FontAwesome5 name={showHide ? "eye-slash" : "eye"} size={25} color={"black"} />
							}
						</TouchableOpacity>
					</View>

					<Text style={styles.text3}>
						{input.password.length === 0 ? "" : !active && invalid}
					</Text>

					<TouchableOpacity onPress={createAccount} disabled={!emailV && !active}>
						<Text style={styles.text4}>Create account</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
			<Text style={styles.err1}>{ message1 }</Text>
		</SafeAreaView>
	);
};

export default ContinueWithEmailAndPassword;

// password should be of 8 characters length
//     - password should contain
//         - uppercase letter
//         - lowercase letter
//         - number
//         - special character
