import React, { useState } from 'react'
import Select from 'react-select'
import { useMutation } from '@apollo/client'
import { EDIT_AUTHOR } from '../queries'

const AuthorForm = ({ authors }) => {
  const [name, setName] = useState('')
  const [year, setYear] = useState('')

  const [ setToBorn ] = useMutation(EDIT_AUTHOR)

  const submit = (event) => {
    event.preventDefault()
    setToBorn({ variables: { name, year: Number(year) } })
    setName('')
    setYear('')
  }

  const handleChange = selectedOption => {
    setName(selectedOption.label)
  }

  const options = authors.map(a => {
    return {
      label: a,
      value: a
    }
  })

  const label = { label: name }

  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          <Select
            value={label}
            onChange={handleChange}
            options={options}
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
