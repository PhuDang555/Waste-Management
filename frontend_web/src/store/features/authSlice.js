import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk(
    'auth/login',
    async ({username, password}, {rejectWithValue}) => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/v1/auth/login', {
                username,
                password
            })
            const token = response.data?.data.token;
            localStorage.setItem('token', token);
            // console.log('Token received:', token);
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

export const fetchUser = createAsyncThunk(
  'auth/fetchUser',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      console.log(token);
      const response = await axios.get('http://127.0.0.1:8000/api/v1/auth/me', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log('Response from API:', response.data);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const editUser = createAsyncThunk(
  'auth/editUser',
  async (userData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put('http://127.0.0.1:8000/api/v1/auth/me', userData, {
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
        .addCase(fetchUser.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchUser.fulfilled, (state, action) => {
          state.loading = false;
          state.user = action.payload;
        })
        .addCase(fetchUser.rejected, (state, action) => {
          state.loading = false;
          // console.error("Fetch user failed:", action.payload);
          state.error = action.payload;
        })
        .addCase(editUser.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(editUser.fulfilled, (state, action) => {
          state.loading = false;
          state.user = action.payload;
        })
        .addCase(editUser.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
    },
})
  
export const { logout } = authSlice.actions
export default authSlice.reducer