import React, { useState, useEffect } from 'react';
import { View, Text, StatusBar } from "react-native";
import { NativeStack1, NativeStack2 } from "./Components/Navigation";
import auth from '@react-native-firebase/auth';
import { createNativeStackNavigator } from '@react-navigation/native-stack';



const Stack = createNativeStackNavigator();

const App1 = () => {
	const [initializing, setInitializing] = useState(true);
	const [user, setUser] = useState(null);


	// console.log(user);
	function onAuthStateChanged(user) {
		setUser(user);
		if (initializing) setInitializing(false);
	}

	useEffect(() => {
		const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
		return subscriber; // unsubscribe on unmount
	}, []);

	if (initializing) {
		return null;
	}

	console.log(user);

    return (
			<>
			{/* <StatusBar backgroundColor="black" barStyle="light-content" /> */}
			<Stack.Navigator>
				{user ? (
					<Stack.Group>
						<Stack.Screen name="home" component={NativeStack2} options={() => ({ headerShown: false })} />
					</Stack.Group>
				) : (
					<Stack.Group>
							<Stack.Screen name="auth" component={NativeStack1} options={() => ({ headerShown: false })} />
					</Stack.Group>
				)}
			</Stack.Navigator>
			</>
		);
}

export default App1;
