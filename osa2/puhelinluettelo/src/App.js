import React, { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'

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

const Persons = ({ showedPersons, remove }) => {
  return (
    <div>
      {showedPersons.map(person =>
        <Person
          key={person.name}
          person={person} 
          remove={remove}
        />
      )}
    </div>
  )
}

const Person = ({ person, remove }) => {
  return (
    <p>
      {person.name} {person.number} <button 
        onClick={() => remove(person.id)}
      >delete</button>
    </p>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchName, setSearchName ] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then((response) => {
        setPersons(response)
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

    const personObj = {
      name: newName,
      number: newNumber
    }

    personService
      .create(personObj)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
  }

  const removePerson = (id) => {
    personService
      .remove(id)
      .then(result => {
        if (result) {
          setPersons(persons.filter(person => person.id !== id))
        }
      })
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
      <Persons 
        showedPersons={showedPersons}
        remove={removePerson}
      />
    </div>
  )

}

export default App
