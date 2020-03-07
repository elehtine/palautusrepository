export const initializeBlogs = (blogs) => {
  return {
    type: 'INIT_BLOGS',
    data: blogs
  }
}

export const createComment = (comment, id) => {
  return {
    type: 'NEW_COMMENT',
    data: {
      comment,
      id
    }
  }
}

export const createBlog = (blog, user) => {
  return {
    type: 'NEW_BLOG',
    data: {
      ...blog,
      user
    }
  }
}

export const removeBlog = (id) => {
  return {
    type: 'REMOVE_BLOG',
    data: { id }
  }
}

export const updateBlog = (blog, user) => {
  return {
    type: 'UPDATE_BLOG',
    data: { 
      id: blog.id,
      blog
    }
  }
}

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_BLOG':
      return state.concat(action.data)
    case 'INIT_BLOGS':
      return action.data
    case 'NEW_COMMENT':
      const blog = state.find(blog => blog.id === action.data.id)
      const newComments = blog.comments.concat(action.data.comment)
      return state.map(blog => blog.id !== action.data.id ? blog : {...blog, comments: newComments })
    case 'REMOVE_BLOG':
      const id = action.data.id
      return state.filter(blog => blog.id !== id)
    case 'UPDATE_BLOG':
      const newBlog = action.data.blog
      return state.map(blog => blog.id !== action.data.id ?
        blog : newBlog)
    default:
      return state
  }
}

export default blogReducer
