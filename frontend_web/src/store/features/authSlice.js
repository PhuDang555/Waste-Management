import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Helper function để lưu và lấy thông tin từ localStorage
const saveUserToStorage = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
};

const getUserFromStorage = () => {
  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    try {
      return JSON.parse(storedUser);
    } catch (error) {
      console.error('Lỗi khi parse thông tin user từ localStorage:', error);
      return null;
    }
  }
  return null;
};

// Axios instance
const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/v1'
});

// Interceptor để tự động thêm token vào mọi request
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export const loginUser = createAsyncThunk(
  'auth/login',
  async ({username, password}, {rejectWithValue}) => {
    try {
      const response = await api.post('/auth/login', {
        username,
        password
      });
      const data = response.data?.data;
      const token = data.token;
      
      // Lưu token và user vào localStorage
      localStorage.setItem('token', token);
      if (data.user) {
        saveUserToStorage(data.user);
      }
      
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || {
        message: 'Lỗi kết nối đến server'
      });
    }
  }
);

export const fetchUser = createAsyncThunk(
  'auth/fetchUser',
  async (_, { rejectWithValue, dispatch}) => {
    try {
      // Kiểm tra xem có user trong localStorage không
      const storedUser = getUserFromStorage();
      if (storedUser) {
        return storedUser;
      }
      
      // Nếu không có trong localStorage thì mới gọi API
      const token = localStorage.getItem('token');
      if (!token) {
        return rejectWithValue({ message: 'Không có token xác thực' });
      }
      
      const response = await api.get('/auth/me');
      const userData = response.data.data;
      
      // Lưu user vào localStorage
      saveUserToStorage(userData);
      
      return userData;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        dispatch(logout());
      }
      return rejectWithValue(error.response?.data || {
        message: 'Lỗi khi lấy thông tin người dùng'
      });
    }
  }
);

export const editUser = createAsyncThunk(
  'auth/editUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.put('/auth/me', userData);
      const updatedUserData = response.data.data;
      
      // Cập nhật thông tin user trong localStorage
      saveUserToStorage(updatedUserData);
      
      return updatedUserData;
    } catch (error) {
      return rejectWithValue(error.response?.data || {
        message: 'Lỗi khi cập nhật thông tin người dùng'
      });
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: getUserFromStorage(), // Lấy user từ localStorage khi khởi tạo
    token: localStorage.getItem('token'),
    loading: false,
    error: null,
    isAuthenticated: !!localStorage.getItem('token')
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      state.user = null;
      state.token = null;
      state.error = null;
      state.isAuthenticated = false;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Login cases
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      })
      
      // Fetch user cases
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Edit user cases
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
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;