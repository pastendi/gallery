import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const albumApi = createApi({
  reducerPath: 'album',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000',
  }),
  endpoints(builder) {
    return {
      fetchAlbums: builder.query({
        query: (user) => {
          return {
            url: '/albums',
            params: { userId: user.id },
            method: 'GET',
          }
        },
      }),
    }
  },
})

export const { useFetchAlbumsQuery } = albumApi
export { albumApi }
