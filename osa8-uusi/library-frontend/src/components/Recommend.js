import React, { useEffect } from 'react'

import { BOOKS_BY_GENRE } from '../queries'
import { useQuery, useLazyQuery } from '@apollo/client'

const Recommend = (props) => {
  const [ getBooks, result ] = useLazyQuery(BOOKS_BY_GENRE)
  const favorite = props.favorite

  useEffect(() => {
    if (favorite !== '') {
      getBooks({ variables: { genre: favorite } })
    }
  }, [favorite])

  if (!props.show) {
    return null
  }


  if (favorite === '' || !result.data) {
    return <div>loading...</div>
  }

  const books = result.data.allBooks

  return (
    <div>
      <h2>recommendations</h2>
      books in your favorite genre <strong>{favorite}</strong>
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
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Recommend
