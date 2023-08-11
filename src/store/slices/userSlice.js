import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
const fetchUsers = createAsyncThunk('users/fetch', async () => {
  const res = await axios.get('http://localhost:5000/users')
  return res.data
})

const userSlice = createSlice({
  name: 'user',
  initialState: {
    data: [],
    isLoading: false,
    error: null,
  },
  extraReducers(builder) {
    builder
      .addCase(fetchUsers.pending, (state, action) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false
        state.data = action.payload
        state.error = null
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  },
})

export const userReducer = userSlice.reducer
export { fetchUsers }
