import morgan from 'morgan'
import logger from './logger.js'

const requestLogger = morgan('tiny')

const tokenExtractor = (request, response, next) => {
  const extractToken = (authHeader) => {
    const authScheme = 'Bearer '
    if (authHeader === undefined || !authHeader.startsWith(authScheme)) {
      return null
    }
    return authHeader.slice(authScheme.length)
  }

  const token = extractToken(request.header('Authorization'))
  if (token !== null) {
    request.token = token
  }

  next()
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformed id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message })
  } else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
    return response.status(400).send({ error: 'Username must be unique' })
  }

  next(error)
}

export default { requestLogger, tokenExtractor, errorHandler }
