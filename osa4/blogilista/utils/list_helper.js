const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  let likes = 0
  blogs.forEach(blog => {
    likes += blog.likes
  })
  return likes
}

const favoriteBlog = (blogs) => {
  let favorite = null
  blogs.forEach(blog => {
    if (favorite === null || favorite.likes < blog.likes) {
      favorite = {
        title: blog.title,
        author: blog.author,
        likes: blog.likes
      }
    }
  })

  return favorite
}

const mostBlogs = (blogs) => {
  const most =  _
    .chain(blogs)
    .countBy('author')
    .toPairs()
    .maxBy('1')
    .value()
  return { 
    author: most[0],
    blogs: most[1]
  }
}

module.exports = {
  dummy, 
  totalLikes,
  favoriteBlog,
  mostBlogs
}
