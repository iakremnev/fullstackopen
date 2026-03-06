import Weather from "./Weather"

const CountryDisplay = ({ country }) => {
    return (
        <div>
            <h1>{country.name.common}</h1>
            <p>Capital {country.capital.join(', ')}</p>
            <p>Area {country.area} km2</p>

            <h2>Languages</h2>
            <ul>
                {Object.entries(country.languages).map(([key, value]) => (
                  <li key={ key }>{value}</li>
                ))}
            </ul>

            <img src={country.flags.png} alt={country.flags.alt} />
            <Weather city={ country.capital[0] } />
        </div>
    )
}

export default CountryDisplay
