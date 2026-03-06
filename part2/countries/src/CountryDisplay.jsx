const CountryDisplay = ({ country }) => {
  console.log(country.flag, country.flag.codePointAt(0))
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

            <div>{ country.flag }</div>
        </div>
    )
}

export default CountryDisplay
