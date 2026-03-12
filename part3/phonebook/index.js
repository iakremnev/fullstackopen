import express from 'express'
import morgan from 'morgan'
import Person from './models/person.js'


const logFormat = (tokens, request, response) => [
  tokens.method(request, response),
  tokens.url(request, response),
  tokens.status(request, response),
  tokens.res(request, response, 'content-length'), '-',
  tokens['response-time'](request, response), 'ms',
  JSON.stringify(request.body)
  ].join(' ')

const app = express()
app.use(express.json())
app.use(morgan(logFormat))
app.use(express.static('dist'))


app.get('/info', (request, response) => {
  const time = new Date()
  Person.find({}, '').then(result => {
    const message = `Phonebook has info for ${result.length} people`
    const html = `<html><body><p>${message}</p><p>${time.toString()}</p></body></html>`
    response.send(html)
  })
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(result => {
    response.send(result)
  })
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  Person
    .findById(id)
    .then(result => response.send(result))
    .catch(error => response.sendStatus(404))
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

  // Error if any of the required fields are missing
  if (data.name === undefined) {
    return response.status(422).send({
      error: 'name is missing'
    })
  }
  if (data.number === undefined)  {
    return response.status(422).send({
      error: 'number is missing'
    })
  }
  // TODO: Check if name is already in the phonebook
  // if (existingPerson) {
  //   return response.status(409).send({
  //     error: 'person with given name already exists in the phonebook'
  //   })
  // }
  const person = new Person({
    name: data.name,
    number: data.number
  })
  person.save().then(result => {
    response.send(person)
  })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Phonebook server listening on port ${PORT}`)
})
