import { faker } from '@faker-js/faker'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
const pause = (duration) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration)
  })
}
const photoApi = createApi({
  reducerPath: 'photo',
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
      fetchPhotos: builder.query({
        providesTags: (result, error, album) => {
          const tags = result.map((photo) => {
            return { type: 'Photo', id: photo.id }
          })
          tags.push({ type: 'AlbumPhotos', id: album.id })
          return tags
        },
        query: (album) => {
          return {
            url: '/photos',
            params: { albumId: album.id },
            method: 'GET',
          }
        },
      }),
      addPhoto: builder.mutation({
        invalidatesTags: (result, error, album) => {
          return [{ type: 'AlbumPhotos', id: album.id }]
        },
        query: (album) => {
          return {
            url: '/photos',
            method: 'POST',
            body: {
              albumId: album.id,
              src: faker.image.url(),
            },
          }
        },
      }),
      deletePhoto: builder.mutation({
        invalidatesTags: (result, error, photo) => {
          return [{ type: 'Photo', id: photo.id }]
        },
        query: (photo) => {
          return {
            url: `/photos/${photo.id}`,
            method: 'DELETE',
          }
        },
      }),
    }
  },
})

export const {
  useFetchPhotosQuery,
  useAddPhotoMutation,
  useDeletePhotoMutation,
} = photoApi
export { photoApi }
