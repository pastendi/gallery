import { GoTrash } from 'react-icons/go'
import { removeUser } from '../store'
import { useThunk } from '../hooks'

const User = ({ id, name }) => {
  const [doRemoveUser, isLoading, error] = useThunk(removeUser)
  return (
    <div className='mb-2 border rounded'>
      <div className='flex px-4 py-2  items-center cursor-pointer space-x-4 '>
        <button onClick={() => doRemoveUser(id)}>
          <GoTrash color='red' className='hover:scale-125' />
        </button>
        <p> {name}</p>
      </div>
    </div>
  )
}

export default User
