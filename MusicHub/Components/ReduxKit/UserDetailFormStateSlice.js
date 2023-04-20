import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userDetailFormStateData : "false",
};

export const userDetailFormStateSlice = createSlice({
    name: "userDetailFormState",
    initialState,
    reducers: {
        userDetailFormState: (state, action) => {
            state.userDetailFormStateData = action.payload;
        }
    },
});
export const { userDetailFormState } = userDetailFormStateSlice.actions;
export default userDetailFormStateSlice.reducer;