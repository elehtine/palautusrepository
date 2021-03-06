import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import styled from 'styled-components'

import {
  removeBlog,
  updateBlog,
  initializeBlogs,
  createComment
} from '../reducers/blogReducer'
import { setUser } from '../reducers/userReducer'
import {
  createNotification,
  removeNotification
} from '../reducers/notificationReducer'

import blogService from '../services/blogs'
import storage from '../utils/storage'

const Container = styled.div`
  padding: 1em;
`

const Comment = styled.div`
  border: solid #9932CC;
  padding: 10px;
  margin: 1em 0em;
`

const Blog = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.users.user)
  const id = useParams().id
  const history = useHistory()
  const blog = blogs.find(blog => blog.id === id)

  useEffect(() => {
    const user = storage.loadUser()
    dispatch(setUser(user))
  }, [dispatch])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      dispatch(initializeBlogs(blogs))
    )
  }, [dispatch])

  if (!blog) {
    return null
  }

  const own = blog.user.username === user.username

  const handleLike = async () => {
    try {
      const likedBlog = { ...blog, likes: blog.likes + 1, user: blog.user.id }
      const newBlog = await blogService.update(likedBlog)
      dispatch(updateBlog(newBlog))
    } catch(exception) {
      console.log(exception)
    }
  }

  const handleRemove = async () => {
    const ok = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
    if (ok) {
      await blogService.remove(id)
      dispatch(removeBlog(id))
      const timeoutId = setTimeout(() => {
        dispatch(removeNotification())
      }, 5000)
      dispatch(createNotification(`blog ${blog.title} removed`, 'success', timeoutId))
      history.push('/')
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const message = event.target.message.value
    event.target.message.value = ''
    const newComment = await blogService.addComment({ message }, blog.id)
    dispatch(createComment(newComment, blog.id))
  }

  return (
    <Container className='blog'>
      <div>
        <h2>{blog.title} {blog.author}</h2>
      </div>
      <a href={blog.url}>{blog.url}</a>
      <div>likes {blog.likes}
        <button id='like-button' onClick={() => handleLike(blog.id)}>like</button>
      </div>
      <div>{blog.user.name}</div>
      {own&&<button id='remove-button' onClick={() => handleRemove(blog.id)}>remove</button>}
      <div>
        <h3>comments</h3>
        <form onSubmit={handleSubmit}>
          <input id='message' />
          <button type='submit'>add comment</button>
        </form>
        {blog.comments.map(comment => 
          <Comment
            key={comment.id}
          >{comment.message}</Comment>
        )}
      </div>
    </Container>
  )
}

export default Blog
