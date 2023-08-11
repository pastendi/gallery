import { faker } from '@faker-js/faker'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
const fetchUsers = createAsyncThunk('users/fetch', async () => {
  const res = await axios.get('http://localhost:5000/users')
  await pause(1000)
  return res.data
})
const addUser = createAsyncThunk('users/add', async () => {
  const res = await axios.post('http://localhost:5000/users', {
    name: faker.person.fullName(),
  })
  await pause(1000)
  return res.data
})
const removeUser = createAsyncThunk('users/remove', async (userId) => {
  await axios.delete(`http://localhost:5000/users/${userId}`)
  return userId
})

const pause = (duration) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration)
  })
}
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
      .addCase(addUser.pending, (state, action) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.data.push(action.payload)
        state.error = null
      })
      .addCase(addUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      .addCase(removeUser.pending, (state, action) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(removeUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.data = state.data.filter((user) => user.id !== action.payload)
        state.error = null
      })
      .addCase(removeUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  },
})

export const userReducer = userSlice.reducer
export { fetchUsers, addUser, removeUser }
