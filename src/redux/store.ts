import { configureStore } from "@reduxjs/toolkit";
import { rootApi } from "../services/rootAPI";
import authReducer from "./slices/authSlice";
import snackbarReducer from "./slices/snackbarSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        snackbar: snackbarReducer,
        [rootApi.reducerPath]: rootApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(rootApi.middleware),
})