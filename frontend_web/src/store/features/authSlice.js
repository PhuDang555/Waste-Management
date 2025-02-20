import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk(
    'auth/login',
    async ({username, password}, {rejectWithValue}) => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/auth/login', {
                username,
                password
            })
          
            localStorage.setItem('token', response.data?.data.token);

            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState: {
      user: null,
      token: localStorage.getItem('token'),
      loading: false,
      error: null,
    },
    reducers: {
      logout: (state) => {
        localStorage.removeItem('token')
        state.user = null
        state.token = null
        state.error = null
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(loginUser.pending, (state) => {
          state.loading = true
          state.error = null
        })
        .addCase(loginUser.fulfilled, (state, action) => {
          state.loading = false
          state.user = action.payload.user
          state.token = action.payload.token
        })
        .addCase(loginUser.rejected, (state, action) => {
          state.loading = false
          state.error = action.payload
        })
    },
})
  
export const { logout } = authSlice.actions
export default authSlice.reducer