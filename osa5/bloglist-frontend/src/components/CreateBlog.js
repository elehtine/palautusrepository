import React from 'react'

const CreateBlog = ({ title, setTitle, author, setAuthor, url, setUrl, createBlog }) => (
  <div>
    <form onSubmit={createBlog} >
      <div>
        title:
        <input 
          type="text"
          name="title"
          value={title}
          onChange={({target}) => setTitle(target.value)}
        />
      </div>
      <div>
        author:
        <input 
          type="text"
          name="author"
          value={author}
          onChange={({target}) => setAuthor(target.value)}
        />
      </div>
      <div>
        url:
        <input 
          type="text"
          name="url"
          value={url}
          onChange={({target}) => setUrl(target.value)}
        />
      </div>
      <div>
        <button type="submit">create</button>
      </div>
    </form>
  </div>
)

export default CreateBlog
