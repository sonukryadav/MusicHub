import { configureStore } from "@reduxjs/toolkit";
import createUserFirebaseAtSignInSlice from "./CreateUserFirebaseAtSignIn";
import userInputSlice from "./UserInput";
export const store = configureStore({
    reducer: {
        createUserFirebaseAtSignInSlice,
        userInput: userInputSlice,
	},
});
