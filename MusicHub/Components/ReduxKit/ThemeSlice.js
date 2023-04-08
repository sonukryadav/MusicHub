import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    theme: true,
};

export const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        toggle1: (state) => {
            state.theme = !state.theme;
        },
    }
});

// Action creators are generated for each case reducer function
export const { toggle1 } = themeSlice.actions;

export default themeSlice.reducer;