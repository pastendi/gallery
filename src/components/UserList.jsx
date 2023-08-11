import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { fetchUsers, addUser } from '../store'
import { useThunk } from '../hooks'
import Loading from './Loading'
import User from './User'

const UserList = () => {
  const [doFetchUsers, isLoadingFetchUsers, fetchingUsersError] =
    useThunk(fetchUsers)
  const [doAddUser, isLoadingAddUser, addingUserError] = useThunk(addUser)
  const { data } = useSelector((store) => store.users)

  useEffect(() => {
    doFetchUsers()
  }, [doFetchUsers])
  let content
  if (isLoadingFetchUsers) {
    content = <h1>Loading...</h1>
  } else if (fetchingUsersError) {
    content = <h1>Fetching error....</h1>
  } else {
    content = data.map((user) => <User key={user.id} {...user} />)
  }
  return (
    <div>
      <div className='flex justify-between items-center relative'>
        <h1 className='m-2 text-2xl font-semibold'>Users</h1>
        <button
          type='button'
          className='px-3 py-1 rounded bg-blue-600 flex items-center '
          disabled={isLoadingAddUser}
          onClick={() => doAddUser()}
        >
          <div className={`${isLoadingAddUser ? 'block' : 'hidden'}`}>
            <Loading size={4} />
          </div>
          <p>Add user</p>
        </button>
        {addingUserError && (
          <p className='absolute right-24 bottom-2 bg-red-400 px-2 py-0 rounded'>
            Error adding user
          </p>
        )}
      </div>
      {content}
    </div>
  )
}

export default UserList
