import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'

const Notification = ({ message, className }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={className}>{message}</div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchName, setSearchName ] = useState('')
  const [ message, setMessage ] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then((response) => {
        setPersons(response)
      })
  },[])

  const addPerson = (event) => {
    event.preventDefault()

    const personObj = {
      name: newName,
      number: newNumber
    }
    let found = false
    persons.forEach(person => {
      if (person.name === newName) {
        found = true
        personObj.id = person.id
      }
    })

    if (found) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        personService
          .update(personObj.id, personObj)
          .then(response => {
            setPersons(persons.map(person => 
              person.id !== personObj.id ? person : personObj
            ))
            setNewName('')
            setNewNumber('')
            setMessage(`Number of ${personObj.name} is changed`)
            setTimeout(() => {
              setMessage(null)
            }, 2000)
          })
          .catch(error => {
            setMessage(`Person ${personObj.name} is not in phonebook`)
            setPersons(persons.filter(person => person.id !== personObj.id))
            setTimeout(() => {
              setMessage(null)
            }, 2000)
          })
      }
      return
    }

    personService
      .create(personObj)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        setMessage(`Person ${personObj.name} added`)
        setTimeout(() => {
          setMessage(null)
        }, 2000)
      })
      .catch(error => {
        setMessage(error.response.data.error)
        setTimeout(() => {
          setMessage(null)
        }, 2000)
      })
  }

  const removePerson = (id) => {
    if (window.confirm(`Delete ${persons.find(p => p.id === id).name}?`)) {
      personService
        .remove(id)
        .then(result => {
          setPersons(persons.filter(person => {
            if (person.id !== id) {
              return true
            }
            setMessage(`Person ${person.name} is deleted`)
            setTimeout(() => {
              setMessage(null)
            }, 2000)
            return false
          }))
        })
    }
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
      <Notification 
        message={message} 
        className='success'
      />
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
