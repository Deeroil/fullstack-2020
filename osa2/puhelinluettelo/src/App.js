import React, { useState, useEffect } from 'react'
import personService from './services/persons'

const Filter = ({ setShowAll, setNewFilter }) => {

  const handleFilterChange = (event) => {
    //oon epävarma tän logiikasta, noh :DD
    if (event.target.value === null) {
      setShowAll(true)
    } else {
      setNewFilter(event.target.value)
      setShowAll(false)
    }
  }

  return (
    <div>
      filter names:
      <input onChange={handleFilterChange} />
    </div>
  )
}

const DeleteButton = ({ id, persons, setPersons }) => {

  const handleClick = () => {
    const removablePerson = persons.find(person => person.id === id)

    if (window.confirm(`Delete ${removablePerson.name} from Phonebook?`)) {
      personService
        .remove(id)
        .then(
          setPersons(
            persons.filter(p => p.id !== id)
          )
        )
    }
  }

  return (
    <button onClick={handleClick}>delete</button>
  )
}

const Persons = ({ showAll, persons, newFilter, setPersons }) => {

  const personsToShow = showAll
    ? persons
    : persons.filter(x =>
      x.name
        .toLowerCase()
        .includes(newFilter.toLowerCase()))

  //Kuuluiskohan toi button muualle :/ hm
  return (
    <>
      {personsToShow.map((person) =>
        <div key={person.name}>
          {person.name} {person.number}
          <DeleteButton id={person.id} persons={persons} setPersons={setPersons} />
        </div>
      )}
    </>
  )
}

//tässäkin on niin paljon propseja, pitäisköhän refaktoroida ja miten? Vai vaan siistiö
//voisko newName, newNumber ja niiden setterit laittaa tänne eikä Appin puolelle? Hmm!
const PersonForm = ({ persons, setPersons }) => {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const updatePerson = (person) => {
    personService
      .update(person.id, person)
      .then(returnedPerson => {
        console.log('Updated')
        setPersons(
          persons.map(p => p.id !== returnedPerson.id ? p : returnedPerson)
        )
      })
  }

  const emptyInputFields = () =>{
    setNewName('')
    setNewNumber('')
  }

  //haluanko että tyhjennetään inputkentät myös jos ei vaihdeta puhnro?
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

    //a person has an id made by server
    personService
      .create(personObj)
      .then(returnedPerson => concatReturned(returnedPerson))
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

const App = () => {
  const [persons, setPersons] = useState([])
  const [newFilter, setNewFilter] = useState('')
  const [showAll, setShowAll] = useState(true)

  //yritin laittaa tän suoraan useEffectin sisälle, tarkista miten se tehdään
  const hook = () => {
    personService
      .getAll()
      .then(initialPersons =>
        setPersons(initialPersons))
  }

  //renderöi vaan ekan kerran
  useEffect(hook, [])

  // äää miks AHAAA true
  // const bool = persons.some(x => x.name === "Arto Hellas")
  // console.log('Bool = ', bool)

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter
        setShowAll={setShowAll}
        setNewFilter={setNewFilter}
      />
      <h2>Add a new person</h2>
      <PersonForm
        persons={persons}
        setPersons={setPersons}
      />
      <h2>Numbers</h2>
      <Persons
        showAll={showAll}
        persons={persons}
        newFilter={newFilter}
        setPersons={setPersons}
      />
    </div>
  )
}

export default App