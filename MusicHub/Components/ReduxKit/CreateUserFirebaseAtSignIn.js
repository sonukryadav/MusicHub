import { createSlice } from "@reduxjs/toolkit";

const initialState = {
};

export const createUserFirebaseAtSignInSlice = createSlice({
	name: "createUserFirebaseAtSignIn",
	initialState,
	reducers: {
		createdUserData: (state, action) => {
			return {...action.payload };
			// return Object.assign({}, state, action.payload);
			// Object.assign(state, action.payload);
		}
	},
});


export const { createdUserData } = createUserFirebaseAtSignInSlice.actions;
export default createUserFirebaseAtSignInSlice.reducer;
