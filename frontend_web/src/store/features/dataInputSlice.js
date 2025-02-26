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

const dataInputSlice = createSlice({
    name: 'dataInput',
    initialState: {
      collectingUnits: [],
      wasteTypes: [],
      loading: false,
      error: null,
    },
    extraReducers: (builder) => {
      builder
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
      });
    },
})
  
export default dataInputSlice.reducer