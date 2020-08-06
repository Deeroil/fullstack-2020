import React, { useState, useEffect } from 'react'
import personService from './services/persons'

const Filter = ({ setShowAll, setNewFilter }) => {

  const handleFilterChange = (event) => {
    //ööh tän logiikka on salee perseellään :DD     !!
    if (event.target.value === null) {
      setShowAll(true)
    } else {
      setNewFilter(event.target.value)
      setShowAll(false)
    }
  }

  return (
    <div>
      filter by:
      <input onChange={handleFilterChange} />
    </div>
  )
}

// TODO / FIXME
// napilla poistaminen tapahtuu serverin puolella,
//MUTTA tieto ei poistu näkymästä ennenkuin refreshataan
const DeleteButton = ({ id, persons, setPersons }) => {

  const handleClick = () => {
    const removablePerson = persons.find(person => person.id === id)

    if (window.confirm(`Delete ${removablePerson.name} from Phonebook?`)) {
      setPersons(persons.filter(p => p.id !== id))
      personService.remove(id)
    }

    /*
    console.log(`id = ${id}`)
    //ööh hetkonen onks toi removedNote tärkeä tossa :DDD ei salee?? removedNote => thenin sisällä siis
    personService.remove(id)
    
    .then(removedPerson => {
        const p = persons.filter(p => p.id !== id)
        console.log(`persons without ${id}: ${p.map(p => p.name )}`)
        //Unhandled Rejection (TypeError): setPersons is not a function
        //setPersons({p})
      })
    .catch(error => {
      console.log('Error:', error)
    })*/

    //.then(console.log("p.filt(p=> p.id !== id) --> ", persons.filter(person => persons.id !== id)))
    //setPersons()//})
  }

  return (
    <button onClick={handleClick}>delete</button>
  )
}

//a person has an id made by server
//tässäkin on niin paljon propseja, pitäisköhän refaktoroida ja miten :DDD
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


const PersonForm = ({ newName, setNewName, newNumber, setNewNumber, persons, setPersons }) => {

  const addPerson = (event) => {
    event.preventDefault()

    //jos laitan tän niin se on aina true...? HMMM
    //ahaa..?? se palauttaa vaan ton,,, nuolen jälkeen olevan tekstin??? ei mitään booleania lmao
    //const nameExists = () => persons.some(x => x.name === newName)
    //console.log('nameExists', nameExists)

    if (persons.some(x => x.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    const personObj = {
      name: newName,
      number: newNumber
    }


    console.log('persons ennen concat: ', persons)

    //miks täällä saa olla setPersons mutta ei DeleteButtonin puolella?
    personService
      .create(personObj)
      .then(returnedPerson => {
        console.log('create promise fulfilled')
        setPersons(persons.concat(returnedPerson))
      })

    console.log('persons after(?) concat: ', persons)
    //setPersons(persons.concat(personObj))
    setNewName('')
    setNewNumber('')
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
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [showAll, setShowAll] = useState(true)

  //yritin laittaa tän suoraan useEffectin sisälle React ei tykännyt
  const hook = () => {
    personService
      .getAll()
      .then(initialPersons =>
        setPersons(initialPersons))
  }

  //renderöi vaan ekan kerran
  useEffect(hook, [])

  // äää miks AHAAA FUCK true
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
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
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
      {console.log(persons.map(p => <div key={p.name}>{p}</div>))}
    </div>
  )
}

export default App