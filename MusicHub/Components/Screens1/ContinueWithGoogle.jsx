import { View, Text, Button, ScrollView, Alert } from 'react-native';
import React, { useState } from 'react';
import styles from '../Styles/ContinueWithGoogle';
import auth from '@react-native-firebase/auth';
import { useNavigation } from "@react-navigation/native";
import { createdUserData } from "../ReduxKit/CreateUserFirebaseAtSignIn";
import { useDispatch } from "react-redux";
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import ENV from '../../ENV';
import { SafeAreaView } from 'react-native-safe-area-context';

GoogleSignin.configure({
	webClientId: `${ENV.WEB_CLIENT_ID}`,
});


export default function ContinueWithGoogle() {
	const [isSigninInProgress, setIsSigninInProgress] = useState(false);
	const [warn, setWarn] = useState("");
	const navigation = useNavigation();
	const dispatch = useDispatch();

	const signIn = async () => {
		try {
			setIsSigninInProgress(true);
			await GoogleSignin.hasPlayServices();
			const { idToken } = await GoogleSignin.signIn();
			// Create a Google credential with the token
			const googleCredential = auth.GoogleAuthProvider.credential(idToken);
			const userInfo = await auth().signInWithCredential(googleCredential);
			const userData = {
				displayName: userInfo.user.displayName,
				email: userInfo.user.email,
				emailVerified: userInfo.user.emailVerified,
				phoneNumber: userInfo.user.phoneNumber,
				photoURL: userInfo.user.photoURL,
				uid: userInfo.user.uid
			}
			dispatch(createdUserData(userData));
			Alert.alert("Hurray! You are registered successfully.");
			// console.log(userInfo);
			setIsSigninInProgress(false);
			navigation.navigate("userdetailform");
		} catch (error) {
			setIsSigninInProgress(false);
			console.log(error);
			if (error.code === statusCodes.SIGN_IN_CANCELLED) {
				// user cancelled the login flow
				setWarn(error.message);
				Alert.alert(error.message);
			} else if (error.code === statusCodes.IN_PROGRESS) {
				// operation (e.g. sign in) is in progress already
				setWarn(error.message);
				Alert.alert(error.message);
			} else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
				// play services not available or outdated
				setWarn(error.message);
				Alert.alert(error.message);
			} else {
				// some other error occurred
				setWarn(error.message);
				Alert.alert(error.message);
			}
		}
	};


	return (
		<SafeAreaView style={styles.sav}>
			<ScrollView contentContainerStyle={styles.container0}>
				<Text style={styles.text1}>{"Verify with Google"}</Text>
				<View style={styles.v1}>
					<GoogleSigninButton
						style={styles.googleButton}
						size={GoogleSigninButton.Size.Wide}
						color={GoogleSigninButton.Color.Light}
						onPress={signIn}
						disabled={isSigninInProgress}
					/>
				</View>
			<Text style={styles.textWarn}>{warn}</Text>
		</ScrollView>
		</SafeAreaView>
	);
}
