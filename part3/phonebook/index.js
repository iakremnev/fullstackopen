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

app.get('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  Person
    .findById(id)
    .then(result => {
      if (result) {
        response.send(result)
      }
      else {
        response.sendStatus(404)
      }
    })
    .catch(error => next(error))
})

const validatePayload = (data, response) => {
  if (!data) {
    return {
      status: 422,
      error: 'missing body'
    }
  }
  // Error if any of the required fields are missing
  if (data.name === undefined) {
    return {
      status: 422,
      error: 'name is missing'
    }
  }
  if (data.number === undefined)  {
    return {
      status: 422,
      error: 'number is missing'
    }
  }
  return {status: null, error: null}
}

app.put('/api/persons/:id', (request, response, next) => {
  const data = request.body
  const {status, error} = validatePayload(data)
  if (error) {
    return response.status(status).send({error: error})
  }

  const id = request.params.id
  Person
    .findById(id)
    .then(person => {
      if (!person) {
        return response.sendStatus(404)
      }
      person.name = data.name
      person.number = data.number
      person
        .save()
        .then(updatedPerson => response.send(updatedPerson))
        .catch(error => next(error))
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  Person
    .findByIdAndDelete(id)
    .then(result => response.sendStatus(204))
    .catch(error => next(error))
})

app.post('/api/persons', (request, response) => {
  const data = request.body
  const {status, error} = validatePayload(data)
  if (error) {
    return response.status(status).send({error: error})
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
  person
    .save()
    .then(addedPerson => response.json(addedPerson))
    .catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
  if (error.name === 'CastError') {
    response.status(400).send({error: 'malformed id'})
  } else if (error.name === 'ValidationError') {
    response.status(400).json({error: error.message})
  }
  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Phonebook server listening on port ${PORT}`)
})
