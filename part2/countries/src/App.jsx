import { useState } from 'react'
import Filter from './Filter'

const App = () => {

    const [filterString, setFilterString] = useState("")

    const handleFilterInput = (event) => {
        console.log(event.target.value)
        setFilterString(event.target.value)
    }

    return (
        <Filter filterQuery={filterString}  handleInput={handleFilterInput} />
    )
}

export default App
