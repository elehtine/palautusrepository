import React, { useState, useEffect } from 'react'
import { useApolloClient, useLazyQuery } from '@apollo/client'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Recommend from './components/Recommend'
import Login from './components/Login'

import { ME } from './queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [ favorite, setFavorite ] = useState('')
  const [ getMe, me ] = useLazyQuery(ME)
  const client = useApolloClient()

  useEffect(() => {
    if (me.data && me.data.me) {
      setFavorite(me.data.me.favoriteGenre)
    }
  }, [me.data])

  const login = async (token) => {
    setToken(token)
    localStorage.setItem('phonenumbers-user-token', token)
    setPage('authors')
    getMe()
  }


  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('authors')
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        { token ? 
          <>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => setPage('recommend')}>recommend</button>
            <button onClick={logout}>logout</button>
          </> :
          <button onClick={() => setPage('login')}>login</button>
        }
      </div>

      <Authors
        show={page === 'authors'}
        token={token}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
      />

      <Recommend
        show={page === 'recommend'}
        favorite={favorite}
      />

      <Login
        show={page === 'login'}
        storeToken={login}
      />

    </div>
  )
}

export default App
