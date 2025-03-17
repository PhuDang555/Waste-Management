import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const listManageUnit = createAsyncThunk(
  'createUser/listManageUnit',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://127.0.0.1:8000/api/v1/management/list-manage-unit', {
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

export const listUser = createAsyncThunk(
  'createUser/listUser',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://127.0.0.1:8000/api/v1/management/list-user', {
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

export const listProvince = createAsyncThunk(
  'createUser/listProvince',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://127.0.0.1:8000/api/v1/management/list-province', {
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

export const listDistrict = createAsyncThunk(
  'createUser/listDistrict',
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://127.0.0.1:8000/api/v1/management/list-district', {
        params:{ id },
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

export const listWard = createAsyncThunk(
  'createUser/listWard',
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://127.0.0.1:8000/api/v1/management/list-ward', {
        params:{ id },
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

export const getUser = createAsyncThunk(
  'createUser/getUser',
  async (id, { rejectWithValue }) => {
    try {
      
      const token = localStorage.getItem('token');
      const response = await axios.get('http://127.0.0.1:8000/api/v1/management/get-user', {
        params:{ id },
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

export const create = createAsyncThunk(
  'createUser/create',
  async (data, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://127.0.0.1:8000/api/v1/management/create-user',data,{
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const edit = createAsyncThunk(
  'createUser/edit',
  async (data, { rejectWithValue }) => {
    try {

      const token = localStorage.getItem('token');
      const response = await axios.post('http://127.0.0.1:8000/api/v1/management/edit-user',data,{
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleted = createAsyncThunk(
  'createUser/delete',
  async (data, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://127.0.0.1:8000/api/v1/management/delete-user',data,{
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const block = createAsyncThunk(
  'createUser/block',
  async (data, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://127.0.0.1:8000/api/v1/management/block-user',data,{
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


const createUserSlice = createSlice({
    name: 'createUser',
    initialState: {
      listManageUnits: [],
      listUsers:[],
      listProvinces:[],
      listDistricts:[],
      listWards:[],
      loading: false,
      error: null,
    },
    extraReducers: (builder) => {
      builder
      // Xử lý danh sách đơn vị quản lý 
      .addCase(listManageUnit.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(listManageUnit.fulfilled, (state, action) => {
        state.loading = false;
        state.listManageUnits = action.payload; // Lưu trữ danh sách đơn vị quản lý 
      })
      .addCase(listManageUnit.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Xử lý danh sách user 
      .addCase(listUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(listUser.fulfilled, (state, action) => {
        state.loading = false;
        state.listUsers = action.payload; // Lưu trữ danh sách user
      })
      .addCase(listUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Xử lý danh sách tỉnh/tp 
      .addCase(listProvince.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(listProvince.fulfilled, (state, action) => {
        state.loading = false;
        state.listProvinces = action.payload; // Lưu trữ danh sách tỉnh/tp
      })
      .addCase(listProvince.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Xử lý danh sách quận/huyện 
      .addCase(listDistrict.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(listDistrict.fulfilled, (state, action) => {
        state.loading = false;
        state.listDistricts = action.payload; // Lưu trữ danh sách quận/huyện
      })
      .addCase(listDistrict.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Xử lý danh sách phường/xã 
      .addCase(listWard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(listWard.fulfilled, (state, action) => {
        state.loading = false;
        state.listWards = action.payload; // Lưu trữ danh sách phường/xã
      })
      .addCase(listWard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Xử lý create
      .addCase(create.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(create.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(create.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Xử lý edit
      .addCase(edit.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(edit.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(edit.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Xử lý deleted
      .addCase(deleted.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleted.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(deleted.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      ;
    },
});

export default createUserSlice.reducer;