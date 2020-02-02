import React from 'react'

const Person = ({ person, remove }) => {
  return (
    <p>
      {person.name} {person.number} <button 
        onClick={() => remove(person.id)}
      >delete</button>
    </p>
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

export default Persons
