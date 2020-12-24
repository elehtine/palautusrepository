import React, { useState, useEffect } from 'react'
import { useApolloClient, useLazyQuery, useSubscription } from '@apollo/client'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Recommend from './components/Recommend'
import Login from './components/Login'

import { ME, BOOK_ADDED, ALL_BOOKS, BOOKS_BY_GENRE } from './queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [ favorite, setFavorite ] = useState('')
  const [ getMe, me ] = useLazyQuery(ME)
  const client = useApolloClient()

  const updateCache = (newBook) => {
    const includedIn = (set, object) => 
      set.map(p => p.id).includes(object.id)

    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    if (includedIn(dataInStore.allBooks, newBook)) {
      return
    }

    newBook.genres.forEach(g => {
      const dataInStore = client.readQuery({ query: BOOKS_BY_GENRE, variables: { genre: g } })

      client.writeQuery({
        query: BOOKS_BY_GENRE,
        variables: { genre: g },
        data: {
          ...dataInStore,
          allBooks: [ ...dataInStore.allBooks, newBook ]
        }
      })
    })

    client.writeQuery({
      query: ALL_BOOKS,
      data: {
        ...dataInStore,
        allBooks: [ ...dataInStore.allBooks, newBook ]
      }
    })
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const book = subscriptionData.data.bookAdded
      window.alert(`New book "${book.title}"!`)
      updateCache(book)
    }
  })

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
