import React from 'react'
import { useSelector } from 'react-redux'

const UserList = () => {
  const users = useSelector(state => state.users.users)

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <td>name</td>
            <td>blogs created</td>
          </tr>
        </thead>
        <tbody>
          {users.map(u => <tr key={u.id}>
              <td>
                <a href={`users/${u.id}`}>{u.name}</a>
              </td>
              <td>{u.blogs.length}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default UserList
