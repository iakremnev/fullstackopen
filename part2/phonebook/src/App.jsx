import { useState } from "react";
import PersonsList from "./Person";
import Filter from "./Filter";
import PersonForm from "./PersonForm";

const App = () => {
    const [persons, setPersons] = useState([
        { name: "Arto Hellas", number: "040-123456", id: 1 },
        { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
        { name: "Dan Abramov", number: "12-43-234345", id: 3 },
        { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
    ]);
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
            const newPerson = {
                id: persons.length + 1,
                name: newName,
                number: newNumber,
            };
            const newPersons = persons.concat(newPerson);
            setPersons(newPersons);
            setNewName("");
            setNewNumber("");
        } else {
            alert(`${newName} is already added to the phonebook`);
        }
    };

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
            <PersonsList persons={personsToShow} />
        </div>
    );
};

export default App;
