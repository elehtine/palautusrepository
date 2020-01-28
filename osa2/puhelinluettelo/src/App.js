import React, { useState } from 'react'

const Number = ({ person }) => {
  return (
    <p>
      {person.name} {person.number}
    </p>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchName, setSearchName ] = useState('')

  const addPerson = (event) => {
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
      name: newName,
      number: newNumber
    }
    setPersons(persons.concat(nameObj))
    setNewName('')
    setNewNumber('')
  }

  const getShowedNumbers = persons.filter(person => 
    person.name.toLowerCase().includes(searchName.toLowerCase()))

  const handleSearchName = (event) => {
    setSearchName(event.target.value)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h1>Phonebook</h1>
      filter shown with<input
        value={searchName}
        onChange={handleSearchName}
      />
      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input
            value={newName}
            onChange={handleNameChange}
          />
        </div>
        <div>
          number: <input 
            value={newNumber}
            onChange={handleNumberChange}
          />
        </div>
        <div><button type="submit">add</button></div>
      </form>

      <h2>Numbers</h2>
      <div>
        {getShowedNumbers.map(person =>
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
