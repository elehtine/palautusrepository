import React, { useEffect } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
import { ALL_BOOKS, ME } from '../queries'

const Recommend = ({ show }) => {
  const [getBooks, result] = useLazyQuery(ALL_BOOKS)
  const userResult = useQuery(ME)

  useEffect(() => {
    if (userResult.data) {
      getBooks({ variables: { genre: userResult.data.me.favoriteGenre } })
    }
  }, [userResult]) // eslint-disable-line

  if (userResult.loading) {
    return (
      <h2>Loading...</h2>
    )
  }

  if (!show) {
    return null
  }

  const books = result.data === undefined ? [] : result.data.allBooks

  return (
    <div>
      <h2>recommendations</h2>
      <div>books in your favorite genre {userResult.data.me.favoriteGenre}</div>
      <ul>
      {books.map(book => 
        <li key={book.id}>{book.title}, {book.author.name}, {book.published}</li>)}
      </ul>
    </div>
  )
}

export default Recommend
