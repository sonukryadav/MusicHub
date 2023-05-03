import React, { useEffect , useState} from 'react';
import { StatusBar } from "react-native";
import { NativeStack2 } from "./Components/Navigation";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AsyncGet, AsyncSet } from "./Components/AsyncStorage/AsyncStorage";
import { useSelector, useDispatch } from "react-redux";
import { toggle1 } from "./Components/ReduxKit/ThemeSlice";


const Stack = createNativeStackNavigator();

const App1 = () => {
	const { theme } = useSelector(state => state.theme);
	const dispatch = useDispatch();


	useEffect(() => {
		(async () => {
			const themeStored = await AsyncGet("theme");
			if (themeStored === true) {
				dispatch(toggle1(true));
			} else if (themeStored === false) {
				dispatch(toggle1(false));
			} else {
				dispatch(toggle1(false));
				await AsyncSet("theme", false);
			}
		})();
	},[])


    return (
			<>
			<StatusBar backgroundColor="black" barStyle="light-content" />
			<Stack.Navigator>
				<Stack.Group>
					<Stack.Screen name="home" component={NativeStack2} options={() => ({ headerShown: false })} />
				</Stack.Group>
			</Stack.Navigator>
			</>
		);
}

export default App1;
