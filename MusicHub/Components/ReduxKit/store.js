import { configureStore } from "@reduxjs/toolkit";
import createUserFirebaseAtSignInSlice from "./CreateUserFirebaseAtSignIn";
import userInputSlice from "./UserInput";
import themeSlice from "./ThemeSlice";
export const store = configureStore({
    reducer: {
        createUserFirebaseAtSignInSlice,
        userInput: userInputSlice,
        theme : themeSlice,
	},
});
