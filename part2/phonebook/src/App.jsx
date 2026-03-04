import { useState, useEffect } from "react";

import personService from "./services/persons";
import PersonsList from "./Person";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Notification from "./notification";

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");
    const [filterString, setFilterString] = useState("");
    const [notificationMessage, setNotificationMessage] = useState(null)

    const clearNotification = () => setNotificationMessage(null)

    const handleFilterChange = (event) => {
        console.log("Filter:", event.target.value);
        setFilterString(event.target.value);
    };

    const handleNameChange = (event) => {
        console.log(event.target.value);
        setNewName(event.target.value);
    };
    const handleNumberChange = (event) => {
        console.log(event.target.value);
        setNewNumber(event.target.value);
    };
    const handleSubmitName = (event) => {
        event.preventDefault();
        console.log("Name submitted:", newName);

        const newPerson = {
          name: newName,
          number: newNumber,
        }

        const existingPerson =
            persons.find((value) => value.name === newName);
        if (existingPerson) {
            if (window.confirm(`${newPerson.name} is already added to the phonebook, replace old number with the new one?`)) {
              const id = existingPerson.id
              personService
                  .update(id, newPerson)
                  .then(newPerson => setPersons(persons.map(person => person.id === id ? newPerson : person)))
                setNotificationMessage(`Updated ${newPerson.name}`)
                setTimeout(clearNotification, 5000)
            }
        } else {
          personService
              .create(newPerson)
              .then((person) => setPersons(persons.concat(person)));
            setNotificationMessage(`Added ${newPerson.name}`)
            setTimeout(clearNotification, 5000)
        }

        setNewName("");
        setNewNumber("");
    };
    const handleDeleteOf = (id) => {
        return () => {
            personService
                .remove(id)
                .then(response => { // response is always empty
                    console.log(`Deleted personId=${id}`)
                    const newPersons = persons.filter(person => person.id !== id)
                    setPersons(newPersons)
                })
        }
    }

    useEffect(() => {
        personService.getAll().then(persons => {
            console.log("fetched phonebook");
            setPersons(persons);
        });
    }, []);

    const personsToShow = persons.filter((person) =>
        person.name.toLowerCase().includes(filterString.toLowerCase()),
    );

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={notificationMessage} />
            <Filter value={filterString} onChange={handleFilterChange} />
            <h2>Add a new</h2>
            <PersonForm
                name={newName}
                number={newNumber}
                onNameChange={handleNameChange}
                onNumberChange={handleNumberChange}
                onButtonClick={handleSubmitName}
            />
            <h2>Numbers</h2>
            <PersonsList persons={personsToShow} handleDeleteOf={handleDeleteOf}/>
        </div>
    );
};

export default App;
