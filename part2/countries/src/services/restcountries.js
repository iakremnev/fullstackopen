// Basic information about countries from https://studies.cs.helsinki.fi/restcountries/

import axios from 'axios'

const BASE_URL = 'https://studies.cs.helsinki.fi/restcountries'

const getAll = () => {
    const response = axios.get(`${BASE_URL}/api/all`)
    return response.then(response => response.data)
}

const getName = (name) => {
    const response = axios.get(`${BASE_URL}/api/name/${name}`)
    return response.then(response => response.data)
}

export default {getAll, getName}
