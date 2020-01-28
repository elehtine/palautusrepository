import React, { useState } from 'react'

const Number = ({ person }) => {
  return (
    <p>
      {person.name}
    </p>
  )
}

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const addName = (event) => {
    event.preventDefault()
    let found = false
    persons.forEach(person => {
      if (person.name === newName) {
        found = true
      }
    })
    if (found) {
      window.alert(`${newName} is already added to phonebook`)
      return
    }
    const nameObj = {
      name: newName
    }

    setPersons(persons.concat(nameObj))
    setNewName('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input
            value={newName}
            onChange={handleNameChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map(person =>
          <Number
            key={person.name}
            person={person} 
          />
        )}
      </div>
    </div>
  )

}

export default App
