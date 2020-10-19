import React, { useState } from 'react'
import personService from '../services/persons'

const PersonForm = ({ persons, setPersons, handleMessage, setMessage }) => {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const updatePerson = (person) => {
    personService
      .update(person.id, person)
      .then(returnedPerson => {
        setPersons(
          persons.map(p => p.id !== returnedPerson.id ? p : returnedPerson)
        )
        handleMessage(`Updated ${person.name}'s phone number`)
      }).catch(error => {
        //how do you check what caused the error?
        handleMessage(`Error: ${person.name} couldn't be updated`)
      })
  }

  const emptyInputFields = () => {
    setNewName('')
    setNewNumber('')
  }

  //do I want to empty inputs if we don't replace the number?
  const handleNamesake = (namesake) => {
    if (window.confirm(`${namesake.name} is already added to phonebook, replace the old number?`)) {
      const changedPerson = { ...namesake, number: newNumber }
      updatePerson(changedPerson)
      emptyInputFields()
    }
  }

  const addPerson = (event) => {
    event.preventDefault()

    //jos laitan tän niin se on aina true...? HMMM
    //ahaa..?? se palauttaa vaan ton nuolen jälkeen olevan tekstin? eikä booleania
    //const nameExists = () => persons.some(x => x.name === newName)
    //console.log('nameExists', nameExists)

    const namesake = persons.find(p => p.name === newName)
    if (namesake !== undefined) {
      handleNamesake(namesake)
      return
    }

    const personObj = {
      name: newName,
      number: newNumber
    }

    const concatReturned = (returnedPerson) => {
      setPersons(persons.concat(returnedPerson))
      emptyInputFields()
    }

    //a person has an id created by the server
    personService
      .create(personObj)
      .then(returnedPerson => {
        concatReturned(returnedPerson)
        handleMessage(`Added ${returnedPerson.name} to Phonebook`)
      })
      .catch(error => {
        console.log(error.response.data)
        handleMessage(`Error: ${error.response.data.error}`)
      })

    }

  //jos yritän tehdä näistä onelinerit, niin se kadottaa sen viitteen? eiks se osaa..? hmm?
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <form onSubmit={addPerson}>
      <div>
        name:
            <input
          value={newName}
          onChange={handleNameChange}
        />
      </div>
      <div>
        phone:
            <input
          value={newNumber}
          onChange={handleNumberChange}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm