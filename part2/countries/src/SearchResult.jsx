import CountryList from "./CountryList"

const MAX_DISPLAY_COUNTRIES = 10

const SearchResult = ({ countries }) => {
    if (countries.length > MAX_DISPLAY_COUNTRIES) {
      return <div>Too many matches, specify another filter</div>
    }
    if (1 < countries.length && countries.length <= MAX_DISPLAY_COUNTRIES) {
        return <CountryList countries={countries} />
    }
    if (countries.length === 1) {
        const countryName = countries[0].name.common
        const style = {fontStyle: 'italic'}
      return <div style={style}>Matching single country: {countryName}</div>
    }
    const style = {fontStyle: 'italic'}
    return <div style={style}>No matching countries</div>
}

export default SearchResult
