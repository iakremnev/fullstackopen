import jwt from 'jsonwebtoken'
import morgan from 'morgan'
import logger from './logger.js'
import User from '../models/user.js'

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

const userExtractor = async (request, response, next) => {
  if (request.token !== undefined) {
    const decoded = jwt.verify(request.token, process.env.JWTSECRET)
    const user = await User.findById(decoded.id)
    if (!user) {
      console.log(`User id not found: ${decoded.id}`)
      return response.sendStatus(403)
    }
    request.user = user
  }
  next()
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    response.status(400).send({ error: 'malformed id' })
  } else if (error.name === 'ValidationError') {
    response.status(400).send({ error: error.message })
  } else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
    response.status(400).send({ error: 'Username must be unique' })
  } else if (error.name === 'JsonWebTokenError') {
    response.sendStatus(403)
  }

  next(error)
}

export default { requestLogger, tokenExtractor, userExtractor, errorHandler }
