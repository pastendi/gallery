import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',
  initialState: {
    data: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
})

export const userReducer = userSlice.reducer
