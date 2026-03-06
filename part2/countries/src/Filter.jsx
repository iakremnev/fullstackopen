const Filter = ({filterQuery, handleInput}) => {
    return (
        <form name="countryFilter">
            <label htmlFor="filterInput">find countries</label>
            <input id="filterInput" value={ filterQuery } onChange={handleInput}/>
        </form>
    )
}

export default Filter
