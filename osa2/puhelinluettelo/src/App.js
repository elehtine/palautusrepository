import React, { useState } from 'react'

const Number = ({ person }) => {
  return (
    <p>
      {person.name} {person.number}
    </p>
  )
}

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '123-123-321' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

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

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
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
