import React from 'react'
import { ImBin } from 'react-icons/im'
import { useDeletePhotoMutation } from '../store'
const Photo = ({ photo }) => {
  const [deletePhoto, results] = useDeletePhotoMutation()
  return (
    <div className=' flex justify-center items-center aspect-video bg-slate-400 relative '>
      <img className='w-full h-full object-cover' src={photo.src} alt='photo' />
      <button
        className='absolute top-4 right-4'
        onClick={() => deletePhoto(photo)}
      >
        <ImBin size={22} color='red' />
      </button>
    </div>
  )
}

export default Photo
