import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { EDIT_AUTHOR } from '../queries'

const AuthorForm = () => {
  const [name, setName] = useState('')
  const [year, setYear] = useState('')

  const [ setToBorn ] = useMutation(EDIT_AUTHOR)

  const submit = (event) => {
    event.preventDefault()
    setToBorn({ variables: { name, year: Number(year) } })
    setName('')
    setYear('')
  }

  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          name
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          born
          <input
            type="number"
            value={year}
            onChange={({ target }) => setYear(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default AuthorForm
