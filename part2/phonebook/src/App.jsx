import { useState } from 'react'
import Person from './Person'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phone: '040-1234567' }
  ])
    const [newName, setNewName] = useState('')
    const [newPhone, setNewPhone] = useState('')

    const handleNameChange = (event) => {
        console.log(event.target.value)
        setNewName(event.target.value)
    }
    const handlePhoneChange = (event) => {
        console.log(event.target.value)
        setNewPhone(event.target.value)
    }
    const handleSubmitName = (event) => {
        event.preventDefault()
        console.log('Name submitted:', newName)

        const newNameIsValid = persons.find((value) => value.name === newName) === undefined
        if (newNameIsValid) {
          const newPerson = {
              name: newName,
              phone: newPhone
          }
          const newPersons = persons.concat(newPerson)
            setPersons(newPersons)
            setNewName('')
            setNewPhone('')
        }
        else {
            alert(`${newName} is already added to the phonebook`)
        }

    }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>name: <input value={newName} onChange={handleNameChange} /></div>
        <div>phone: <input value={newPhone} onChange={handlePhoneChange} /></div>
        <div>
                  <button type="submit" onClick={handleSubmitName}>add</button>
        </div>
      </form>
          <h2>Numbers</h2>
          <ul>{persons.map((person) =>
            <Person key={person.name} person={person}/>
      )}</ul>
    </div>
  )
}

export default App
