import React, { useState, useEffect } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
import _ from 'lodash'

import { ALL_BOOKS, BOOKS_BY_GENRE } from '../queries'

const Books = (props) => {
  const [ genre, setGenre ] = useState('all genres')
  const [ showBooks, setShowBooks ] = useState([])
  const result = useQuery(ALL_BOOKS)
  const [ getBooks, books ] = useLazyQuery(BOOKS_BY_GENRE)

  const changeGenre = (genre) => {
    setGenre(genre)
    if (genre === 'all genres') {
      setShowBooks(result.data.allBooks)
    } else {
      getBooks({ variables: { genre } })
    }
  }

  useEffect(() => {
    if (books.data) {
      setShowBooks(books.data.allBooks)
    }
  }, [books])

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  const genres = _.union.apply(null, _.map(result.data.allBooks, 'genres'))

  return (
    <div>
      <h2>books</h2>

      { genre === 'all genres' ?
        "in all genres" :
        `in genre ${genre}`
      }
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {showBooks.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>

      { genres.map(g => <button
          onClick={() => changeGenre(g)}
          key={g}
        >{g}</button>
      )}
      <button
        onClick={() => changeGenre('all genres')}
        key='all genres'
      >all genres</button>
    </div>
  )
}

export default Books
