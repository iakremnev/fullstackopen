import { useState, useEffect } from "react";

import personService from "./services/persons";
import PersonsList from "./Person";
import Filter from "./Filter";
import PersonForm from "./PersonForm";

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");
    const [filterString, setFilterString] = useState("");

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

        const newNameIsValid =
            persons.find((value) => value.name === newName) === undefined;
        if (newNameIsValid) {
            personService
                .create({
                    name: newName,
                    number: newNumber,
                })
                .then((person) => setPersons(persons.concat(person)));

            setNewName("");
            setNewNumber("");
        } else {
            alert(`${newName} is already added to the phonebook`);
        }
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
