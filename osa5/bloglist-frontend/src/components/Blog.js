import React, { useState } from 'react'

const Blog = ({ blog, updateBlog, user, removeBlog }) => {
  const [ visible, setVisible ] = useState(false)

  const toggleVisible = () => {
    setVisible(!visible)
  }

  const handleUpdate = () => {
    const id = blog.id
    const newBlog = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }
    updateBlog(id, newBlog)
  }

  const handleRemove = () => {
    removeBlog(blog)
  }

  const removeButton = () => (
    <div>
      <button onClick={handleRemove}
      >remove</button>
    </div>
  )

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  if (visible) {
    return (
      <div id="blog" style={blogStyle} >
        <div>
          {blog.title} {blog.author} <button
            onClick={toggleVisible}
          >hide</button>
        </div>
        <div>
          {blog.url}
        </div>
        <div id="likes" >
          likes {blog.likes} <button
            onClick={handleUpdate}
          >like</button>
        </div>
        <div>
          {blog.user.name}
        </div>
        <div>
          {user.username === blog.user.username && removeButton()}
        </div>
      </div>
    )
  }

  return (
    <div style={blogStyle} >
      {blog.title} {blog.author} <button
        onClick={toggleVisible} >view</button>
    </div>
  )
}

export default Blog
