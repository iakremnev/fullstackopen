import express from 'express'

const app = express()

const persons = [
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

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Phonebook server listening on port ${PORT}`)
})
