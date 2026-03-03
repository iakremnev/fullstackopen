const Person = ({ person, handleDelete }) => {
    return (
        <li>
            {person.name} {person.number}
            <button onClick={handleDelete}>delete</button>
        </li>
    );
};

const PersonsList = ({ persons, handleDeleteOf }) => {
    return (
        <ul>
            {persons.map((person) => (
                <Person key={person.id} person={person} handleDelete={handleDeleteOf(person.id)}/>
            ))}
        </ul>
    );
};

export default PersonsList;
