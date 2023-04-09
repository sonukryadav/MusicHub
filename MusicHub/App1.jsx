import React, { useState, useEffect } from 'react';
import { View, Text, StatusBar } from "react-native";
import { NativeStack1, NativeStack2 } from "./Components/Navigation";
import auth from '@react-native-firebase/auth';

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

    return (
			<>
			<StatusBar backgroundColor="black" barStyle="light-content" />
			{user ? <NativeStack2 /> : <NativeStack1 />}
			</>
		);
}

export default App1;
