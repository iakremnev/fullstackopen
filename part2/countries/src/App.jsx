import { useState, useEffect } from 'react'

import Filter from './Filter'
import restcountries from './services/restcountries'

const App = () => {

    const [filterString, setFilterString] = useState("")
    const [countries, setCountries] = useState([])

    const handleFilterInput = (event) => {
        console.log(event.target.value)
        setFilterString(event.target.value)
    }

    useEffect(() => setCountries(restcountries.getAll()), [])

    return (
        <Filter filterQuery={filterString}  handleInput={handleFilterInput} />
    )
}

export default App
