import { useState } from 'react'
import Person from './Person'
import Input from './Input'
import Button from './Button'
import PersonsList from './Person'

const App = () => {
  const [persons, setPersons] = useState([
      { name: 'Arto Hellas', phone: '040-123456', id: 1 },
      { name: 'Ada Lovelace', phone: '39-44-5323523', id: 2 },
      { name: 'Dan Abramov', phone: '12-43-234345', id: 3 },
      { name: 'Mary Poppendieck', phone: '39-23-6423122', id: 4 }
    ])
    const [newName, setNewName] = useState('')
    const [newPhone, setNewPhone] = useState('')
    const [filterString, setFilterString] = useState('')

    const handleFilterChange = (event) => {
        console.log('Filter:', event.target.value)
        setFilterString(event.target.value)
    }

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
              id: persons.length + 1,
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

    const personsToShow = persons.filter(
        (person) => person.name.toLowerCase().includes(filterString.toLowerCase())
    )

  return (
    <div>
          <h2>Phonebook</h2>
          <Input label="filter shown with"  value={filterString} onChange={handleFilterChange}/>
          <h2>add a new</h2>
          <form>
              <Input label="name:" value={newName} onChange={handleNameChange} />
              <Input label="phone:" value={newPhone} onChange={handlePhoneChange} />
              <Button text="add" onClick={handleSubmitName} />
      </form>
          <h2>Numbers</h2>
          <PersonsList persons={personsToShow}/>
    </div>
  )
}

export default App
