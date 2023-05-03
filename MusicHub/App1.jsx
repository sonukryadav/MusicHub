import React, { useState, useEffect } from 'react';
import { View, Text, StatusBar } from "react-native";
import { NativeStack1, NativeStack2 } from "./Components/Navigation";
import auth from '@react-native-firebase/auth';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AsyncSet, AsyncGet, AsyncDelete } from "./Components/AsyncStorage/AsyncStorage";
import { userDetailFormState } from "./Components/ReduxKit/UserDetailFormStateSlice";
import { useDispatch, useSelector } from "react-redux";
import { USERDETAILFORMSTATE } from "./ENV.js"
import { SignUp} from "./Components/Screens2";



const Stack = createNativeStackNavigator();

const App1 = () => {
	const [initializing, setInitializing] = useState(true);
	const [user, setUser] = useState(null);
	const dispatch = useDispatch();

	const { userDetailFormStateData } = useSelector((state) => state.userDetailFormState);
	function onAuthStateChanged(user) {
		setUser(user);
		if (initializing) setInitializing(false);
	}

	useEffect(() => {
		const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
		return subscriber; // unsubscribe on unmount
	}, []);

	useEffect(() => {
		(async () => {
			const userDetailFormState1 = await AsyncGet(`${USERDETAILFORMSTATE.UDFS}`);
			if (!userDetailFormState1) {
				await AsyncSet(`${USERDETAILFORMSTATE.UDFS}`, userDetailFormState1);
				dispatch(userDetailFormState(userDetailFormState1));
			}
			if (userDetailFormState1) {
				dispatch(userDetailFormState(userDetailFormState1));
			}
		})();
	});

	if (initializing) {
		return null;
	}

    return (
			<>
			<StatusBar backgroundColor="black" barStyle="light-content" />
			<Stack.Navigator>
				<Stack.Group>
				{/* {user  ? ( */}
					<Stack.Screen name="home" component={NativeStack2} options={() => ({ headerShown: false })} />
				{/* ) : ( */}
					{/* <Stack.Screen name="auth" component={SignUp} options={() => ({ headerShown: false })} /> */}
				{/* )} */}
				</Stack.Group>
			</Stack.Navigator>
			</>
		);
}

export default App1;
