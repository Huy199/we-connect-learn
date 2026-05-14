import {createSlice} from "@reduxjs/toolkit";


const initialState = {
    accessToken: null,
    refreshToken: null,
}
export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            const { accessToken, refreshToken } = action.payload;
            state.accessToken = accessToken;
            state.refreshToken = refreshToken;
        },
        logout: (state) => {
            state.accessToken = null;   
    }
}})

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;