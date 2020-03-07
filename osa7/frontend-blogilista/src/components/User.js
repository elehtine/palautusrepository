import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

const Container = styled.div`
  padding: 1em;
`

const User = () => {
  const id = useParams().id
  const user = useSelector(state =>
    state.users.users.find(u => u.id === id))

  if (!user) {
    return null
  }

  return (
    <Container>
      <h2>{user.name}</h2>
      <ul>
        {user.blogs.map(blog => <li key={blog.id}>
          {blog.title}
        </li>)}
      </ul>
    </Container>
  )
}

export default User
