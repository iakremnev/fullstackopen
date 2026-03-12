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
    const [notification, setNotification] = useState({
        message: null,
        color: "#fff",
    });

    const clearNotification = () =>
        setNotification({ message: null, color: "#fff" });
    const setNotificationWithTimeout = (notification, timeout) => {
        setNotification(notification)
        setTimeout(clearNotification, timeout)
    }

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
        };

        const existingPerson = persons.find((value) => value.name === newName);
        if (existingPerson) {
            if (
                window.confirm(
                    `${newPerson.name} is already added to the phonebook, replace old number with the new one?`,
                )
            ) {
                const id = existingPerson.id;
                personService
                    .update(id, newPerson)
                    .then((newPerson) => {
                        setPersons(
                            persons.map((person) =>
                                person.id === id ? newPerson : person,
                            ),
                        );
                        setNotificationWithTimeout({
                            message: `Updated ${newPerson.name}`,
                            color: "green",
                        }, 5000);
                    })
                    .catch(error => {
                      if (error.response.status === 404) {
                        setPersons(
                            persons.filter((person) => person.id !== id),
                        );
                        setNotificationWithTimeout({
                            message: `Information of ${newPerson.name} has already been removed from server`,
                            color: "red",
                        }, 5000);
                      } else if (error.response.status == 400) {
                        setNotificationWithTimeout({
                            message: error.response.data.error,
                            color: "red",
                        }, 5000);
                      }
                    });
            }
        } else {
            personService
                .create(newPerson)
                .then(person => {
                  setPersons(persons.concat(person))
                  setNotificationWithTimeout({
                      message: `Added ${newPerson.name}`,
                      color: "green",
                  }, 5000);
                })
                .catch(error => {
                  const errorMessage = error.response.data.error
                  console.error(errorMessage)
                  setNotificationWithTimeout({
                      message: errorMessage,
                      color: "red",
                  }, 5000);
                });
        }

        setNewName("");
        setNewNumber("");
    };
    const handleDeleteOf = (id) => {
        return () => {
            personService.remove(id).then((response) => {
                // response is always empty
                console.log(`Deleted personId=${id}`);
                const newPersons = persons.filter((person) => person.id !== id);
                setPersons(newPersons);
            });
        };
    };

    useEffect(() => {
        personService.getAll().then((persons) => {
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
            <Notification message={notification.message} color={notification.color} />
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
            <PersonsList
                persons={personsToShow}
                handleDeleteOf={handleDeleteOf}
            />
        </div>
    );
};

export default App;
