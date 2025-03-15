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

export const createWasteType = createAsyncThunk(
  'wasteCaterogy/createWasteType',
  async (data, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://127.0.0.1:8000/api/v1/category/create-waste-type',data,{
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

export const createWasteDetail = createAsyncThunk(
  'wasteCaterogy/createWasteDetail',
  async (data, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://127.0.0.1:8000/api/v1/category/create-waste-detail',data,{
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

export const deletedGroup = createAsyncThunk(
  'wasteCaterogy/deleteGroup',
  async (id, { rejectWithValue }) => {
    try {
      
      const token = localStorage.getItem('token');
      const response = await axios.delete(`http://127.0.0.1:8000/api/v1/category/delete-waste-group/${id}`,{
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

export const deletedType = createAsyncThunk(
  'wasteCaterogy/deleteType',
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(`http://127.0.0.1:8000/api/v1/category/delete-waste-type/${id}`,{
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

export const deletedDetail = createAsyncThunk(
  'wasteCaterogy/deleteDetail',
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(`http://127.0.0.1:8000/api/v1/category/delete-waste-detail/${id}`,{
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
      // Xử lý create waste type
      .addCase(createWasteType.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createWasteType.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(createWasteType.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Xử lý create waste type
      .addCase(createWasteDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createWasteDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(createWasteDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Xử lý delete waste group
      .addCase(deletedGroup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletedGroup.fulfilled, (state, action) => {
        state.loading = false;
        const { id } = action.payload;
        state.listWasteGroups = state.listWasteGroups.filter((item) => item.id !== id);
      })
      .addCase(deletedGroup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Xử lý delete waste type
      .addCase(deletedType.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletedType.fulfilled, (state, action) => {
        state.loading = false;
        const { id } = action.payload;
        state.listWasteGroups = state.listWasteGroups.filter((item) => item.id !== id);
      })
      .addCase(deletedType.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Xử lý delete waste detail
      .addCase(deletedDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletedDetail.fulfilled, (state, action) => {
          state.loading = false;
          const { id } = action.payload; // id là waste_detail_id
      
          state.listWasteGroups = state.listWasteGroups.map(group => ({
              ...group,
              waste_type: group.waste_type.map(type => ({
                  ...type,
                  waste_detail: type.waste_detail.filter(detail => detail.id !== id)
              }))
          }));
      })
      .addCase(deletedDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      ;
    },
});

export default wasteCategorySlice.reducer;