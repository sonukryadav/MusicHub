import React from 'react';
import { View, Text, StatusBar } from "react-native";
import { NativeStack1 } from "./Components/Navigation";

const App1 = () => {
    return (
			<>
				<StatusBar backgroundColor="black" barStyle="light-content" />
			    <NativeStack1 />
			</>
		);
}

export default App1;
