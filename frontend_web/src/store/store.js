import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import dataInputReducer from "./features/dataInputSlice";

export const store = configureStore({
    reducer:{
        auth: authReducer,
        dataInput: dataInputReducer,
    },
})