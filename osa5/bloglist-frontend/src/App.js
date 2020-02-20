import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(async () => {
    const blogs = await blogService.getAll()
    setBlogs( blogs )
    console.log(blogs)
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log(`${username} is trying to login with password ${password}`)

    try {
      const user = await loginService.login({
        username, password
      })

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (expection) {
      console.log(expection)
    }
    console.log(user)
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="Username"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  console.log(`user is ${user}`)
  console.log(`blogs is ${blogs}`)

  return (
    <div>
      <h2>blogs</h2>
      <p>{user.name} logged in</p>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App
