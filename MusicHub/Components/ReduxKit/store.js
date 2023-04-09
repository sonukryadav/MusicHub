import { configureStore } from "@reduxjs/toolkit";
import createUserFirebaseAtSignInSlice from "./CreateUserFirebaseAtSignIn";
import userInputSlice from "./UserInput";
import themeSlice from "./ThemeSlice";
import permissionSlice from "./PermissionSlice";


export const store = configureStore({
    reducer: {
        createUserFirebaseAtSignInSlice,
        userInput: userInputSlice,
        theme: themeSlice,
        permission : permissionSlice,
	},
});

