import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const albumSlice = createSlice({
  name: 'album',
  initialState: {
    data: [],
    isLoading: [],
    error: null,
  },
  reducers: {},
})
export const albumReducer = albumSlice.reducer
