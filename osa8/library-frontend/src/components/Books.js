import React, { useState, useEffect } from 'react'
import { useLazyQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const _ = require('lodash')

const Books = (props) => {
  const [books, setBooks] = useState([])

  const [getBooks, result] = useLazyQuery(ALL_BOOKS, {
    fetchPolicy: 'no-cache'
  })


  useEffect(() => {
    getBooks()
  }, [getBooks])

  useEffect(() => {
    if (result.data) {
      setBooks(result.data.allBooks)
    }
  }, [result.data])

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return (
      <div>
        Loading...
      </div>
    )
  }

  const genres = _.union.apply(null, _.map(books, 'genres'))

  const setGenre = (genre) => {
    getBooks({ variables: genre === '' ? {} : { genre } })
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <div>
        {genres.map(g => 
          <button key={g} onClick={() => setGenre(g)}>{g}</button>)}
          <button onClick={() => setGenre('')}>all genres</button>
      </div>
    </div>
  )
}

export default Books
