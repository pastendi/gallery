import { GoTrash } from 'react-icons/go'
import {
  MdOutlineArrowCircleDown,
  MdOutlineArrowCircleUp,
} from 'react-icons/md'

import { removeUser } from '../store'
import { useThunk } from '../hooks'
import { useState } from 'react'
import AlbumList from './AlbumList'

const User = ({ user }) => {
  const [showAlbum, setShowAlbum] = useState(false)
  const [doRemoveUser, isLoading, error] = useThunk(removeUser)
  return (
    <div className='mb-2 px-4 py-2 border rounded'>
      <div className='flex justify-between  items-center cursor-pointer  '>
        <div className='flex space-x-4 py-2'>
          <button onClick={() => doRemoveUser(user.id)}>
            <GoTrash color='red' className='hover:scale-125' />
          </button>
          <p> {user.name}</p>
        </div>
        <div onClick={() => setShowAlbum(!showAlbum)}>
          {showAlbum ? (
            <MdOutlineArrowCircleUp size={24} />
          ) : (
            <MdOutlineArrowCircleDown size={24} />
          )}
        </div>
      </div>
      {showAlbum ? <AlbumList user={user} /> : null}
    </div>
  )
}

export default User
