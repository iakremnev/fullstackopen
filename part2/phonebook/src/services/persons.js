import axios from "axios";

const getAll = () => {
    const response = axios.get("http://localhost:3001/persons")
    return response.then(response => response.data)
}

const create = (person) => {
    const response = axios.post("http://localhost:3001/persons", person)
    return response.then(response => response.data)
}

const remove = (id) => {
    const response = axios.delete(`http://localhost:3001/persons/${id}`)
    return response.then(response => response.data)
}

const update = (id, person) => {
    const response = axios.put(`http://localhost:3001/persons/${id}`, person)
    return response.then(response => response.data)
}

export default {getAll, create, remove, update}
