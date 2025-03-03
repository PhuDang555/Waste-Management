import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const listCollectingUnit = createAsyncThunk(
  'dataInput/listCollectingUnit',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      // console.log(token);
      const response = await axios.get('http://127.0.0.1:8000/api/v1/data-input/collecting-unit',{
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

export const listWasteType = createAsyncThunk(
  'dataInput/listWasteType',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://127.0.0.1:8000/api/v1/data-input/waste-type',{
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

export const listDataInput = createAsyncThunk(
  'dataInput/listDataInput',
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://127.0.0.1:8000/api/v1/data-input/waste-collection-management', {
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

export const getDataInputId = createAsyncThunk(
  'dataInput/dataInputId',
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://127.0.0.1:8000/api/v1/data-input/waste-collection-management/${id}`, {
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
  'dataInput/create',
  async (dataInput, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://127.0.0.1:8000/api/v1/data-input/create',dataInput,{
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
  'dataInput/edit',
  async (dataInput, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.patch('http://127.0.0.1:8000/api/v1/data-input/create',dataInput,{
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
  'dataInput/delete',
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://127.0.0.1:8000/api/v1/data-input/delete/${id}`,{
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      return { id };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const dataInputSlice = createSlice({
    name: 'dataInput',
    initialState: {
      collectingUnits: [],
      selectedDataInput: null,
      wasteTypes: [],
      dataInputs: [],
      loading: false,
      error: null,
    },
    reducers: {
    clearSelectedDataInput: (state) => {
      state.selectedDataInput = null;
    },
  },
    extraReducers: (builder) => {
      builder
      // Xử lý listCollectingUnit
      .addCase(listCollectingUnit.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(listCollectingUnit.fulfilled, (state, action) => {
        state.loading = false;
        state.collectingUnits = action.payload; // Lưu trữ danh sách đơn vị thu gom
      })
      .addCase(listCollectingUnit.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Xử lý listWasteType
      .addCase(listWasteType.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(listWasteType.fulfilled, (state, action) => {
        state.loading = false;
        state.wasteTypes = action.payload; // Lưu trữ danh sách loại rác
      })
      .addCase(listWasteType.rejected, (state, action) => {
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
      // Xử lý listDataInput
      .addCase(listDataInput.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(listDataInput.fulfilled, (state, action) => {
        state.loading = false;
        state.dataInputs = action.payload; // Lưu trữ danh sách quan lý thu gom rác
      })
      .addCase(listDataInput.rejected, (state, action) => {
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
        const { id } = action.payload;
        state.dataInputs = state.dataInputs.filter((item) => item.id !== id);
      })
      .addCase(deleted.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Xử lý getDataInputId
      .addCase(getDataInputId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDataInputId.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedDataInput = action.payload; // Lưu dữ liệu chi tiết vào state
      })
      .addCase(getDataInputId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.selectedDataInput = null; // Reset nếu lỗi
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
      });
    },
});

export const { clearSelectedDataInput } = dataInputSlice.actions;
export default dataInputSlice.reducer;