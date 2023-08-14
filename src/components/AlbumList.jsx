import React from 'react'
import { useFetchAlbumsQuery, useAddAlbumMutation } from '../store'
import Album from './Album'

const AlbumList = ({ user }) => {
  const { data, error, isLoading } = useFetchAlbumsQuery(user)
  const [addAlbum, results] = useAddAlbumMutation()
  let content
  if (isLoading) {
    content = <h1>Loading...</h1>
  } else if (error) {
    content = <h1>Fetching error....</h1>
  } else {
    content = data.map((album) => <Album key={album.id} album={album} />)
  }
  return (
    <div className='border-t-2'>
      <div className='flex justify-between items-center my-4'>
        <p>Albums by {user.name}</p>
        <button
          disabled={results.isLoading}
          className='rounded px-3 py-1 bg-emerald-500 outline-none'
          onClick={() => addAlbum(user)}
        >
          {results.isLoading ? 'Adding...' : 'Add album'}
        </button>
      </div>
      <div>{content}</div>
    </div>
  )
}

export default AlbumList
