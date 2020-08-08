import React, { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Notification from './components/Notification'
import personService from './services/persons'
import './index.css'

const DeleteButton = ({ id, persons, setPersons, handleMessage }) => {
  const handleClick = () => {
    const name = persons.find(person => person.id === id).name

    if (window.confirm(`Delete ${name} from Phonebook?`)) {
      personService
        .remove(id)
        .then(removed => {
          setPersons(persons.filter(p => p.id !== id))
          handleMessage(`Deleted ${name} from Phonebook`)
        })
        .catch(error => handleMessage(`Error: Couldn't delete ${name} or has already been deleted from the server`))
    }
  }

  return (
    <button onClick={handleClick}>delete</button>
  )
}

//handleMessage is here just to pass it to DeleteButton
const Persons = ({ showAll, persons, newFilter, setPersons, handleMessage }) => {
  const personsToShow = showAll
    ? persons
    : persons.filter(x =>
      x.name
        .toLowerCase()
        .includes(newFilter.toLowerCase()))

  return (
    <>
      {personsToShow.map((person) =>
        <div key={person.name}>
          {person.name} {person.number}
          <DeleteButton
            id={person.id}
            persons={persons}
            setPersons={setPersons}
            handleMessage={handleMessage}
          />
        </div>
      )}
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newFilter, setNewFilter] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [message, setMessage] = useState(null)

  const hook = () => {
    personService
      .getAll()
      .then(initialPersons => setPersons(initialPersons))
  }
  useEffect(hook, [])

  const handleMessage = (text) => {
    setMessage(text)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={message} />
      <Filter
        setShowAll={setShowAll}
        setNewFilter={setNewFilter}
      />
      <h2>Add a new person</h2>
      <PersonForm
        persons={persons}
        setPersons={setPersons}
        handleMessage={handleMessage}
      />
      <h2>Numbers</h2>
      <Persons
        showAll={showAll}
        persons={persons}
        newFilter={newFilter}
        setPersons={setPersons}
        handleMessage={handleMessage}
      />
    </div>
  )
}

export default App