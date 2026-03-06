const CountryList = ({ countries, onShowCountry }) => {
    return (
        <ul>
            {countries.map(country => (
                <li key={country.name.common}>
                    {country.name.common}
                    <button onClick={onShowCountry(country)}>show</button>
                </li>
            ))}
        </ul>
    )
}

export default CountryList
