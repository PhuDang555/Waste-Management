import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const listFeaturePermission = createAsyncThunk(
  'featurePermission/list',
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://127.0.0.1:8000/api/v1/management/feature-permission', {
        params: { id },
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const featurePermissionSlice = createSlice({
    name: 'featurePermission',
    initialState: {
      featurePermissions: [],
      loading: false,
      error: null,
    },
    extraReducers: (builder) => {
      builder
      // Xử lý danh sách nhóm quyền 
      .addCase(listFeaturePermission.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(listFeaturePermission.fulfilled, (state, action) => {
        state.loading = false;
        state.featurePermissions = action.payload; // Lưu trữ danh sách nhóm quyền
      })
      .addCase(listFeaturePermission.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    },
});

export default featurePermissionSlice.reducer;