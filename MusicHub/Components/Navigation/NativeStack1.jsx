import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
    ContinueWithEmailAndPassword,
    ContinueWithGoogle,
    ContinueWithPhone,
    SignIn,
	SignUp,
	UserDetailForm,
	SignInForCreate,
} from "../Screens1";


const NStack = createNativeStackNavigator();

const NativeStack1 = () => {
    return (
			<NStack.Navigator>
				<NStack.Screen
					name="signup"
					component={SignUp}
					options={() => ({ headerShown: false })}
				/>
				<NStack.Screen
					name="signin"
					component={SignIn}
					options={() => ({ headerShown: true, headerTitle: "Sign In" })}
				/>
				<NStack.Screen
					name="withgoogle"
					component={ContinueWithGoogle}
					options={() => ({ headerShown: true, headerTitle: "Continue with Google" })}
				/>
				<NStack.Screen
					name="withphone"
					component={ContinueWithPhone}
					options={() => ({ headerShown: true, headerTitle: "Continue with phone number" })}
				/>
				<NStack.Screen
					name="withemailpassword"
					component={ContinueWithEmailAndPassword}
					options={() => ({ headerShown: true, headerTitle: "Sign up with email & password" })}
    			/>
    			<NStack.Screen
     				name="userdetailform"
     				component={UserDetailForm}
     				options={() => ({ headerShown: true, headerTitle: "User Detail Form" })}
			    />

    			<NStack.Screen
				    name="signinforcreate"
    				component={SignInForCreate}
    				options={() => ({ headerShown: true, headerTitle: "New user Sign in" })}
    			/>

			</NStack.Navigator>
		);
}

export default NativeStack1;
