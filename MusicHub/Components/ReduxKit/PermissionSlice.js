import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    storagePerms: false,
};

export const permissionSlice = createSlice({
    name: "permission",
    initialState,
    reducers: {
        storagePermission: (state, action) => {
            state.storagePerms = action.payload;
        },
    }
});

// Action creators are generated for each case reducer function
export const { storagePermission } = permissionSlice.actions;
export default permissionSlice.reducer;