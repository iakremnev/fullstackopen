import express from 'express'

let persons = [
    {
      "id": "1",
      "name": "Arto Hellas",
      "number": "040-123456"
    },
    {
      "id": "2",
      "name": "Ada Lovelace",
      "number": "39-44-5323523"
    },
    {
      "id": "3",
      "name": "Dan Abramov",
      "number": "12-43-234345"
    },
    {
      "id": "4",
      "name": "Mary Poppendieck",
      "number": "39-23-6423122"
    }
]

const generateId = () => {
  const MAX = 1000
  return Math.ceil(Math.random() * MAX)
}

const app = express()
app.use(express.json())

app.get('/info', (request, response) => {
  const time = new Date()
  const message = `Phonebook has info for ${persons.length} people`
  const html = `<html><body><p>${message}</p><p>${time.toString()}</p></body></html>`
  response.send(html)
})

app.get('/api/persons', (request, response) => {
  response.send(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find(person => person.id === id)
  if (person === undefined) {
    response.sendStatus(404)
  }
  else {
    response.send(person)
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  persons = persons.filter(person => person.id !== id)
  response.sendStatus(204)
})

app.post('/api/persons', (request, response) => {
  const data = request.body
  if (!data) {
    return response.sendStatus(422)
  }
  // Assume that if the data is not empty, it's well-formatted
  const person = {
    id: generateId(),
    name: data.name,
    number: data.number
  }
  persons.push(person)
  response.send(person)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Phonebook server listening on port ${PORT}`)
})
