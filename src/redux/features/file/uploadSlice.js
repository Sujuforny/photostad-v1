import { BASE_URL } from '@/app/api/BaseAPI';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Define the initial state
const initialState = {
  file: null,
  isLoading: false,
  error: null,
};

// Define the uploadImage async thunk
export const uploadImage = createAsyncThunk(
  'upload/uploadImage',
  async (file, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(`${BASE_URL}file`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Define the upload slice
const uploadSlice = createSlice({
  name: 'upload',
  initialState,
  reducers: {
    setFile: (state, action) => {
      state.file = action.payload;
    },
    resetUpload: (state) => {
      state.file = null;
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Handle the pending state while the upload is in progress
    builder.addCase(uploadImage.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });

    // Handle the fulfilled state when the upload is successful
    builder.addCase(uploadImage.fulfilled, (state, action) => {
      state.isLoading = false;
      state.file = action.payload;
    });

    // Handle the rejected state when the upload fails
    builder.addCase(uploadImage.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const { setFile, resetUpload } = uploadSlice.actions;

export default uploadSlice.reducer;