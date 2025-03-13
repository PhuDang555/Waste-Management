import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const listWasteGroup = createAsyncThunk(
  'wasteCaterogy/listWasteGroup',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://127.0.0.1:8000/api/v1/category/waste-group', {
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
  'wasteCaterogy/listUser',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://127.0.0.1:8000/api/v1/category/list-user', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response.data.data);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const listProvince = createAsyncThunk(
  'wasteCaterogy/listProvince',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://127.0.0.1:8000/api/v1/category/list-province', {
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
  'wasteCaterogy/listDistrict',
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://127.0.0.1:8000/api/v1/category/list-district', {
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
  'wasteCaterogy/listWard',
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://127.0.0.1:8000/api/v1/category/list-ward', {
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

export const createWasteGroup = createAsyncThunk(
  'wasteCaterogy/createWasteGroup',
  async (data, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://127.0.0.1:8000/api/v1/category/create-waste-group',data,{
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
  'wasteCaterogy/edit',
  async (dataInput, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.patch('http://127.0.0.1:8000/api/v1/category/edit-user',dataInput,{
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

export const deleted = createAsyncThunk(
  'wasteCaterogy/delete',
  async (data, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://127.0.0.1:8000/api/v1/category/delete-user',data,{
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
  'wasteCaterogy/block',
  async (data, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://127.0.0.1:8000/api/v1/category/block-user',data,{
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


const wasteCategorySlice = createSlice({
    name: 'wasteCaterogy',
    initialState: {
      listWasteGroups: [],
      listUsers:[],
      listProvinces:[],
      listDistricts:[],
      listWards:[],
      loading: false,
      error: null,
    },
    extraReducers: (builder) => {
      builder
      // Xử lý danh sách nhóm rác
      .addCase(listWasteGroup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(listWasteGroup.fulfilled, (state, action) => {
        state.loading = false;
        state.listWasteGroups = action.payload; // Lưu trữ danh sách nhóm rác
      })
      .addCase(listWasteGroup.rejected, (state, action) => {
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
      // Xử lý create waste group
      .addCase(createWasteGroup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createWasteGroup.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(createWasteGroup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      ;
    },
});

export default wasteCategorySlice.reducer;