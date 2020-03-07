import React, { useState } from 'react'

const NewBlog = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleNewBlog = (event) => {
    event.preventDefault()

    createBlog({
      title, author, url
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleNewBlog}>
        <table>
          <thead>
          </thead>
          <tbody>
            <tr>
              <td>author:</td>
              <td>
                <input
                  id='author'
                  value={author}
                  onChange={({ target }) => setAuthor(target.value)}
                />
              </td>
            </tr>
            <tr>
              <td>title:</td>
              <td>
                <input
                  id='title'
                  value={title}
                  onChange={({ target }) => setTitle(target.value)}
                />
              </td>
            </tr>
            <tr>
              <td>url:</td>
              <td>
                <input
                  id='url'
                  value={url}
                  onChange={({ target }) => setUrl(target.value)}
                />
              </td>
            </tr>
            <tr>
              <td />
              <td><button id="create">create blog</button></td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  )
}

export default NewBlog
