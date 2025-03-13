import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import dataInputReducer from "./features/dataInputSlice";
import featurePermissionReducer from "./features/featurePermissionSlice";
import createUserReducer from "./features/createUserSlice";
import wasteCategoryReducer from "./features/wasteCategorySlice";

export const store = configureStore({
    reducer:{
        auth: authReducer,
        dataInput: dataInputReducer,
        featurePermission: featurePermissionReducer,
        createUser: createUserReducer,
        wasteCategory: wasteCategoryReducer,
    },
})