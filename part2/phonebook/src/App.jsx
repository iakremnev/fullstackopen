import { useState } from 'react'
import Person from './Person'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
    const [newName, setNewName] = useState('')

    const handleNameChange = (event) => {
        console.log(event.target.value)
        setNewName(event.target.value)
    }
    const handleSubmitName = (event) => {
        event.preventDefault()
        console.log('Name submitted:', newName)

        const newNameIsValid = persons.find((value) => value.name === newName) === undefined
        if (newNameIsValid) {
          const newPerson = {
              name: newName
          }
          const newPersons = persons.concat(newPerson)
            setPersons(newPersons)
            setNewName('')
        }
        else {
            alert(`${newName} is already added to the phonebook`)
        }

    }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
                  name: <input value={ newName } onChange={handleNameChange}/>
        </div>
        <div>
          <button type="submit" onClick={handleSubmitName}>add</button>
        </div>
      </form>
          <h2>Numbers</h2>
          <ul>{persons.map((person) =>
            <Person key={person.name} name={person.name} />
      )}</ul>
    </div>
  )
}

export default App
