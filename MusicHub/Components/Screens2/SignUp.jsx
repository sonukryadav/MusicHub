import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, Image, SafeAreaView, Alert } from 'react-native';
import styles from "../Styles/SignUp";
import { useNavigation } from "@react-navigation/native";
import img1 from "../Assets/MusicHub-logo.png";
import Toast from 'react-native-toast-message';
import { Toast1 } from "../Views";



const Btn = ({ text, where }) => {
	const navigation = useNavigation();
	return (
		<TouchableOpacity onPress={()=>navigation.navigate(where)}>
			<Text style={styles.button1}>{ text }</Text>
		</TouchableOpacity>
	);
}

const SignUp = () => {
	const navigation = useNavigation();

	React.useEffect(() => {
		Toast.show({
			type: 'success',
			text1: '💝💝        Welcome to MusicHub       💝💝',
		});
	}, []);

    return (
			<SafeAreaView style={styles.safeAreaView}>
				<ScrollView contentContainerStyle={styles.scrollView}>
						<View style={styles.v2}>
							<Image
							style={styles.image1}
								source={img1}
							/>
						</View>
						<View style={styles.v3}>
							<Text style={styles.t1}>Download and listen music for free</Text>
						</View>
						<View style={styles.v4}>
							<Btn text={"Sign in"} where={"signin"} />
							<Btn text={"Continue with Google"} where={"withgoogle"} />
							<Btn text={"Continue with phone number"} where={"withphone"} />
							<Btn text={"Sign up with email & password"} where={"withemailpassword"} />
        				</View>
        				<Toast1 />
				</ScrollView>
			</SafeAreaView>
		);
}

export default SignUp;
