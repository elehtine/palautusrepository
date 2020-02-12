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
        _id: blog._id,
        title: blog.title,
        author: blog.author,
        likes: blog.likes,
        url: blog.url,
        __v: blog.__v
      }
    }
  })

  return favorite
}

module.exports = {
  dummy, 
  totalLikes,
  favoriteBlog
}
