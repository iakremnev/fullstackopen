const Person = ({ person }) => {
    return (
        <li>
            {person.name} {person.phone}
        </li>
    );
};

const PersonsList = ({ persons }) => {
    return (
        <ul>
            {persons.map((person) => (
                <Person key={person.id} person={person} />
            ))}
        </ul>
    );
};

export default PersonsList;
