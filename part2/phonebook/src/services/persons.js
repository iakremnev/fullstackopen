import axios from "axios";

// const baseUrl = "http://localhost:3001"

const getAll = () => {
    const response = axios.get("/api/persons")
    return response.then(response => response.data)
}

const create = (person) => {
    const response = axios.post("/api/persons", person)
    return response.then(response => response.data)
}

const remove = (id) => {
    const response = axios.delete(`/api/persons/${id}`)
    return response.then(response => response.data)
}

const update = (id, person) => {
    const response = axios.put(`/api/persons/${id}`, person)
    return response.then(response => response.data)
}

export default {getAll, create, remove, update}
