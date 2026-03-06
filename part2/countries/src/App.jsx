import { useState, useEffect } from "react";

import Filter from "./Filter";
import SearchResult from "./SearchResult";
import restcountries from "./services/restcountries";

const countryMatchesFilter = (country, filterString) => {
    const countryNameLowerCase = country.name.common.toLowerCase()
    return countryNameLowerCase.includes(filterString.toLowerCase());
};

const App = () => {
    const [filterString, setFilterString] = useState("");
    const [countries, setCountries] = useState([]);

    const handleFilterInput = (event) => setFilterString(event.target.value)

    useEffect(
        () => {
            restcountries.getAll().then((countries) => setCountries(countries))
        },
        []
    );

    const filteredCountries = countries.filter((country) =>
        countryMatchesFilter(country, filterString),
    );
    console.log(`Countries matching filter "${filterString}": ${filteredCountries.length}`)

    return (
        <div>
            <Filter
                filterQuery={filterString}
                handleInput={handleFilterInput}
            />
            <SearchResult countries={filteredCountries} />
        </div>
    );
};

export default App;
