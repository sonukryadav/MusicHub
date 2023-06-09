import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity,  Alert, SafeAreaView, ScrollView } from 'react-native';
import { CountryPicker } from "react-native-country-codes-picker";
import auth from '@react-native-firebase/auth';
import styles from '../Styles/ContinueWithPhone';
import { useNavigation } from "@react-navigation/native";
import { createdUserData } from "../ReduxKit/CreateUserFirebaseAtSignIn";
import { useDispatch } from "react-redux";
import Toast from 'react-native-toast-message';
import { Toast1 } from "../Views";
import { Loading1 } from "../Views"


const ContinueWithPhone = () => {
	const [phoneNumber, setPhoneNumber] = useState('');
	const [countryCodeDigit, setCountryCodeDigit] = useState("+91");
	const [otp, setOtp] = useState('');
	const [confirm, setConfirm] = useState(null);
	const inputRefs = useRef([]);
	const [warn, setWarn] = useState("");
	const navigation = useNavigation();
	const dispatch = useDispatch();
	const [show, setShow] = useState(false);
	const [load, setLoad] = useState(false);


	useEffect(() => {
		setWarn("");
	}, [phoneNumber, otp]);

	const handleSendOtp = async () => {
		try {
			if (phoneNumber.length < 10) {
				setWarn("Please check your number, it seems invalid.");
				Toast.show({
					type: 'error',
					text1: 'Check your number',
				});
				return;
			}
			setLoad(true);
			const confirmation = await auth().signInWithPhoneNumber(`${countryCodeDigit}${phoneNumber}`);
			setConfirm(confirmation);
			setLoad(false);
			setWarn("OTP has been sent, please verify.");
			Toast.show({
				type: 'success',
				text1: 'OTP has been sent, please verify!',
			});
		} catch (error) {
			console.log(error);
			setLoad(false);
			if (error.code === "auth/too-many-requests") {
				setWarn(error.message);
				Toast.show({
					type: 'info',
					text1: 'To many attempts please try after some time or try with other number.',
				});
				return;
			}
			setWarn(error.message);
			Toast.show({
				type: 'error',
				text1: 'Please check your number',
			});
		}
	}

		const handleVerifyOtp = async() => {
			try {
				if (!confirm) {
					setWarn("Please enter your number and touch on send OTP button");
					Toast.show({
						type: 'info',
						text1: 'Please enter your number',
					});
					return;
				}
				if (otp.length !== 6) {
					setWarn("Please check your OTP, it seems you have entered wrong or invalid.");
					Toast.show({
						type: 'error',
						text1: 'Please check your entered OTP',
					});
					return;
				}
				let result = await confirm.confirm(otp);
				const userDetails = {
					displayName: result.user.providerData[0].displayName,
					email: result.user.email,
					emailVerified: result.user.emailVerified,
					phoneNumber: result.user.providerData[0].phoneNumber,
					photoURL: result.user.providerData[0].photoURL,
					uid: result.user.uid,
				}
				dispatch(createdUserData(userDetails));
				setWarn("Congratulations your number is now verified.");
				Toast.show({
					type: 'success',
					text1: 'Hurrya, Your number is now verified.',
				});
				setPhoneNumber("");
				setOtp("");
				navigation.navigate("userdetailform");
			} catch (error) {
				console.log(error);
				if (error.code === "auth/session-expired") {
					setWarn("Your OTP is expired, please try again");
					Toast.show({
						type: 'info',
						text1: 'Your OTP is expired, please try again',
					});
					return;
				}
				if (error.code === "auth/invalid-verification-code") {
					setWarn("It seems you have entered wrong OTP, Please try again!");
					Toast.show({
						type: 'info',
						text1: 'Entered wrong OTP, Please try again!',
					});
					return;
				}
				setWarn(error.message);
				Toast.show({
					type: 'error',
					text1: error.message,
				});
			}
		}

		const handleOtpChange = (index, value) => {
			const newOtp = otp.split('');
			newOtp[index] = value;
			setOtp(newOtp.join(''));
			if (value && index < 5) {
				inputRefs.current[index + 1].focus();
			}
		}

		const renderOtpInputs = () => {
			const inputs = [];
			for (let i = 0; i < 6; i++) {
				inputs.push(
					<TextInput
						key={i}
						ref={ref => inputRefs.current[i] = ref}
						style={styles.otpInput}
						value={otp[i] || ''}
						onChangeText={text => handleOtpChange(i, text)}
						keyboardType="numeric"
						maxLength={1}
						placeholderTextColor="#4D4D4D"
					/>
				);
			}
			return inputs;
		}

		const onSelectCountry = (item) => {
			setCountryCodeDigit(item.dial_code);
			setShow(false);
	};

	if (load) {
		return (<View style={styles.loadingA}><Loading1 text={"verifying..."} /></View>)
	}

	return (
		<SafeAreaView style={styles.sav}>
			<ScrollView contentContainerStyle={styles.sv}>
				<View style={styles.container}>
					<View style={styles.container}>

						<Text style={styles.label1}>Enter Phone Number:</Text>
						<View style={styles.phone}>
							<TouchableOpacity onPress={() => setShow(true)}>
								<Text style={styles.countryPickerButton}>{countryCodeDigit}</Text>
							</TouchableOpacity>
							<CountryPicker
								initialState={"+91"}
								show={show}
								pickerButtonOnPress={onSelectCountry}
								style={styles.selectCode}
							/>

							<Text style={styles.line1}>|</Text>
							<TextInput
								style={styles.phoneInput}
								placeholder="Enter phone number"
								value={phoneNumber}
								onChangeText={(text) => setPhoneNumber(text)}
								keyboardType="phone-pad"
								placeholderTextColor="#4D4D4D"
							/>
						</View>

						<TouchableOpacity style={styles.button} onPress={handleSendOtp}>
							<Text style={styles.buttonText}>Send OTP</Text>
						</TouchableOpacity>

						<Text style={styles.label2}>Enter OTP:</Text>

						<View style={styles.otpView}>
							<View style={styles.otpContainer}>
								{renderOtpInputs()}
							</View>
						</View>

						<TouchableOpacity style={styles.button} onPress={handleVerifyOtp}>
							<Text style={styles.buttonText}>Verify OTP</Text>
						</TouchableOpacity>

					</View>
					<Text style={styles.warnText}>{warn}</Text>
					<Toast1 />
				</View>
			</ScrollView>
		</SafeAreaView>
		);
}

export default ContinueWithPhone;
