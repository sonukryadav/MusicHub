import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    e1state: "",
}


export const userInputSlice = createSlice({
    name: "userInput",
    initialState,
    reducers: {
        userInputAction: (state, action) => {
        }
    }
});


export const { userInputAction } = userInputSlice.actions;
export default userInputSlice.reducer;