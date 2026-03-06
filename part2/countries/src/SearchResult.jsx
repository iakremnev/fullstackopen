import CountryList from "./CountryList"
import CountryDisplay from "./CountryDisplay"

const MAX_DISPLAY_COUNTRIES = 10

const SearchResult = ({ countries, selectedCountry, onShowCountry }) => {
    if (selectedCountry !== null) {
        return <CountryDisplay country={selectedCountry} />
    }
    if (countries.length > MAX_DISPLAY_COUNTRIES) {
      return <div>Too many matches, specify another filter</div>
    }
    if (1 < countries.length && countries.length <= MAX_DISPLAY_COUNTRIES) {
        return <CountryList countries={countries} onShowCountry={onShowCountry} />
    }
    if (countries.length === 1) {
        return <CountryDisplay country={countries[0]} />
    }
    const style = {fontStyle: 'italic'}
    return <div style={style}>No matching countries</div>
}

export default SearchResult
