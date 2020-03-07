import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

const Container = styled.div`
  padding: 1em;
`

const UserList = () => {
  const users = useSelector(state => state.users.users)

  return (
    <Container>
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
    </Container>
  )
}

export default UserList
