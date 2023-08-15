import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import { userReducer } from './slices/userSlice'
import { albumApi } from './apis/albumApi'
import { photoApi } from './apis/photoApi'
export const store = configureStore({
  reducer: {
    users: userReducer,
    [albumApi.reducerPath]: albumApi.reducer,
    [photoApi.reducerPath]: photoApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(albumApi.middleware)
      .concat(photoApi.middleware)
  },
})
setupListeners(store.dispatch)
export * from './slices/userSlice'
export * from './apis/albumApi'
export * from './apis/photoApi'
