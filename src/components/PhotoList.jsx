import React from 'react'
import Photo from './Photo'
import { useAddPhotoMutation, useFetchPhotosQuery } from '../store'

const PhotoList = ({ album }) => {
  const { data, isFetching, error } = useFetchPhotosQuery(album)
  const [addPhoto, results] = useAddPhotoMutation()
  let content
  if (isFetching) {
    content = <h1>Loading...</h1>
  } else if (error) {
    content = <h1>Fetching error....</h1>
  } else if (data.length == 0) {
    content = <h1>No photos yet in this album</h1>
  } else {
    content = (
      <div className='grid grid-cols-3 gap-3 '>
        {data.map((photo) => (
          <Photo key={photo.id} photo={photo} />
        ))}
      </div>
    )
  }
  return (
    <div className='border-t-2 p-4'>
      <div className='flex justify-between items-center my-4'>
        <p>Photos of {album.title}</p>
        <button
          disabled={results.isLoading}
          className='rounded px-3 py-1 bg-emerald-500 outline-none'
          onClick={() => addPhoto(album)}
        >
          {results.isLoading ? 'Adding...' : 'Add photo'}
        </button>
      </div>
      <div>{content}</div>
    </div>
  )
}

export default PhotoList
