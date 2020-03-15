import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import Recommend from './components/Recommend'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('user-token')
    if (token) {
      setToken(token)
    }
  }, [])

  const logout = () => {
    setToken(null)
    localStorage.clear()
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button
          onClick={() => setPage('login')}
          style={ token === null ? {} : { display: 'none' } }
        >login</button>
        <button
          onClick={() => setPage('add')}
          style={ token === null ? { display: 'none' } : {} }
        >add book</button>
        <button
          onClick={() => setPage('favorites')}
          style={ token === null ? { display: 'none' } : {} }
        >favorites</button>
        <button
          onClick={logout}
          style={ token === null ? { display: 'none' } : {} }
        >logout</button>
      </div>

      <Authors
        show={page === 'authors'}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
      />

      <Login
        show={page === 'login'}
        setToken={setToken}
        setPage={setPage}
      />

      <Recommend
        show={page === 'favorites'}
      />

    </div>
  )
}

export default App
