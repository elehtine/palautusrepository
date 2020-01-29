import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({ searchName, handleSearchName }) => {
  return (
    <div>
      filter shown with<input
        value={searchName}
        onChange={handleSearchName}
      />
    </div>
  )
}

const PersonForm = (props) => {
  return (
    <div>
      <form onSubmit={props.addPerson}>
        <div>
          name: <input
            value={props.newName}
            onChange={props.handleNameChange}
          />
        </div>
        <div>
          number: <input 
            value={props.newNumber}
            onChange={props.handleNumberChange}
          />
        </div>
        <div><button type="submit">add</button></div>
      </form>
    </div>
  )
}

const Persons = ({ showedPersons }) => {
  return (
    <div>
      {showedPersons.map(person =>
        <Number
          key={person.name}
          person={person} 
        />
      )}
    </div>
  )
}

const Number = ({ person }) => {
  return (
    <p>
      {person.name} {person.number}
    </p>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchName, setSearchName ] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then((response) => {
        console.log(response.data)
        setPersons(response.data)
      })
  },[])

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

  const showedPersons = persons.filter(person => 
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
      <Filter searchName={searchName} handleSearchName={handleSearchName} />
      <h2>add a new</h2>
      <PersonForm 
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons showedPersons={showedPersons} />
    </div>
  )

}

export default App
