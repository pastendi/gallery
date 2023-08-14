import { faker } from '@faker-js/faker'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
const pause = (duration) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration)
  })
}
const albumApi = createApi({
  reducerPath: 'album',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000',
    // delay request
    fetchFn: async (...args) => {
      await pause(1000)
      return fetch(...args)
    },
    // delay request
  }),
  endpoints(builder) {
    return {
      fetchAlbums: builder.query({
        providesTags: (result, error, user) => {
          return [{ type: 'Album', id: user.id }]
        },
        query: (user) => {
          return {
            url: '/albums',
            params: { userId: user.id },
            method: 'GET',
          }
        },
      }),
      addAlbum: builder.mutation({
        invalidatesTags: (result, error, user) => {
          return [{ type: 'Album', id: user.id }]
        },
        query: (user) => {
          return {
            url: '/albums',
            method: 'POST',
            body: {
              userId: user.id,
              title: faker.commerce.productName(),
            },
          }
        },
      }),
      deleteAlbum: builder.mutation({
        invalidatesTags: (result, error, album) => {
          return [{ type: 'Album', id: album.userId }]
        },
        query: (album) => {
          return {
            url: `/albums/${album.id}`,
            method: 'DELETE',
          }
        },
      }),
    }
  },
})

export const {
  useFetchAlbumsQuery,
  useAddAlbumMutation,
  useDeleteAlbumMutation,
} = albumApi
export { albumApi }
