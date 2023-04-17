import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    localAudios : []
}

export const localAudioFiles = createSlice({
    name: "localAudio",
    initialState,
    reducers: {
        sendAudio: (state, action) => {
            return { ...initialState, localAudios : action.payload };
        },
    }
});

export const { sendAudio } = localAudioFiles.actions;
export default localAudioFiles.reducer;