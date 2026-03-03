import axios from "axios";

const getAll = () => {
    const response = axios.get("http://localhost:3001/persons")
    return response.then(response => response.data)
}

const create = (person) => {
    const response = axios.post("http://localhost:3001/persons", person)
    return response.then(response => response.data)
}

export default {getAll, create}
