import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    theme: false,
};

export const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        toggle1: (state, action) => {
            state.theme = action.payload;
        },
    }
});

// Action creators are generated for each case reducer function
export const { toggle1 } = themeSlice.actions;

export default themeSlice.reducer;