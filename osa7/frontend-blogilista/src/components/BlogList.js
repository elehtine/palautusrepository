import React, { useEffect } from 'react'
import blogService from '../services/blogs'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import Togglable from './Togglable'
import NewBlog from './NewBlog'

import {
  createBlog,
  initializeBlogs
} from '../reducers/blogReducer'
import {
  createNotification,
  removeNotification
} from '../reducers/notificationReducer'

const BlogList = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.users.user)
  const blogFormRef = React.createRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      dispatch(initializeBlogs(blogs))
    )
  }, [dispatch])

  const newBlog = async (blog) => {
    try {
      const newBlog = await blogService.create(blog)
      dispatch(createBlog(newBlog, user))
      const timeoutId = setTimeout(() => {
        dispatch(removeNotification())
      }, 5000)
      dispatch(createNotification(`Blog ${newBlog.title} created`, 'success', timeoutId))
      blogFormRef.current.toggleVisibility()
    } catch(exception) {
      console.log(exception)
    }
  }

  const byLikes = (b1, b2) => b2.likes - b1.likes

  return (
    <div>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <NewBlog createBlog={newBlog}/>
      </Togglable>
      {blogs.sort(byLikes).map(blog => 
        <div className='blog' key={blog.id}>
          <Link
            key={blog.id}
            to={`/blogs/${blog.id}`}
          >{blog.title}</Link>
        </div>
      )}
    </div>
  )
}

export default BlogList
