import React, { useState } from 'react'
import { RiArrowDropRightLine, RiArrowDropDownLine } from 'react-icons/ri'
import { ImBin } from 'react-icons/im'
import { useDeleteAlbumMutation } from '../store'

const Album = ({ album }) => {
  const [showImage, setShowImage] = useState(false)
  const [deleteAlbum, results] = useDeleteAlbumMutation()

  return (
    <div className=' mb-2 py-2 border rounded'>
      <div className='flex justify-between item-center'>
        <div className='flex items-center justify-center'>
          <button
            onClick={() => setShowImage(!showImage)}
            className='hover:text-sky-500'
          >
            {showImage ? (
              <RiArrowDropDownLine size={40} />
            ) : (
              <RiArrowDropRightLine size={40} />
            )}
          </button>
          <p>{album.title}</p>
        </div>
        <button className='mr-6' onClick={() => deleteAlbum(album)}>
          <ImBin size={20} color='red' />
        </button>
      </div>
    </div>
  )
}

export default Album
