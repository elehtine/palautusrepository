import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [ blogs, setBlogs ] = useState([])
  const [ message, setMessage ] = useState(null)

  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ user, setUser ] = useState(null)

  useEffect(() => {
    blogService
      .getAll()
      .then(blogs => {
        setBlogs(blogs)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogout = (event) => {
    event.preventDefault()
    console.log(`${user.name} is logged out`)
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log(`${username} is trying to login with password ${password}`)

    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setMessage(null)
    } catch (expection) {
      setMessage('wrong username or password')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const createBlog = async (title, author, url) => {
    const newBlog = await blogService.create({
      title, author, url
    })
    setBlogs(blogs.concat(newBlog))
    setMessage(`new blog ${newBlog.title} ${newBlog.author} added`)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const updateBlog = async (id, newBlog) => {
    const returnedBlog = await blogService.update(id, newBlog)
    setBlogs(blogs.map(blog => blog.id !== id ? blog :
      { ...blog, likes: returnedBlog.likes }))
  }

  const compareLikes = (a, b) => {
    return b.likes - a.likes
  }

  if (user === null) {
    return (
      <div>
        <h1>Log in to application</h1>
        <Notification
          type="error"
          message={message}
        />
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

  return (
    <div>
      <h1>blogs</h1>
      <Notification 
        type="info"
        message={message}
      />
      <p>{user.name} logged in</p>
      <form onSubmit={handleLogout} >
        <button type="submit" >logout</button>
      </form>
      <Togglable buttonLabel="create new blog" >
        <h2>create new</h2>
        <BlogForm createBlog={createBlog} />
      </Togglable>

      {blogs
          .sort(compareLikes)
          .map(blog =>
        <Blog 
          key={blog.id} 
          blog={blog} 
          updateBlog={updateBlog}
        />
      )}
    </div>
  )
}

export default App
