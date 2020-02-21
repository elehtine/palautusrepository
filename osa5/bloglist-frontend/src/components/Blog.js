import React, { useState } from 'react'

const Blog = ({ blog, updateBlog }) => {
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

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  if (visible) {
    return (
      <div style={blogStyle} >
        <div>
          {blog.title} {blog.author} <button 
            onClick={toggleVisible} 
          >hide</button>
        </div>
        <div>
          {blog.url}
        </div>
        <div>
          likes {blog.likes} <button 
            onClick={handleUpdate} 
          >like</button>
        </div>
        <div>
          {JSON.stringify(blog.user)}
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
