import {createSlice} from "@reduxjs/toolkit";


const initialState = {
    open: false,
    message: null,
    type: "success", // success, error, info, warning
}
export const snackbarSlice = createSlice({
    name: "snackbar",
    initialState,
    reducers: {
       openSnackbar: (state, action) => {
            const { message, type } = action.payload;
            state.open = true;
            state.message = message;
            state.type = type || "success";
       },
       closeSnackbar: (state) => {
            state.open = false;
            state.message = null;
            state.type = "success";
       }
}})

export const { openSnackbar, closeSnackbar } = snackbarSlice.actions;
export default snackbarSlice.reducer; 