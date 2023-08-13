import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import { userReducer } from './slices/userSlice'
import { albumApi } from './apis/albumApi'
export const store = configureStore({
  reducer: {
    users: userReducer,
    [albumApi.reducerPath]: albumApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(albumApi.middleware)
  },
})
setupListeners(store.dispatch)
export * from './slices/userSlice'
export * from './apis/albumApi'
