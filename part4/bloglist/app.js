import express from 'express'
import mongoose from 'mongoose'

import config from './utils/config.js'
import blogsRouter from './controllers/blogs.js'
import logger from './utils/logger.js'
import middleware from './utils/middleware.js'

const app = express()

logger.info('connecting to', config.MONGODB_URI)

mongoose
  .connect(config.MONGODB_URI, { family: 4 })
  .then(() => {
    logger.info('Connected to MongoDB')
  })
  .catch(error => {
    logger.error('Error connecting to MongoDB:', error.message)
  })

app.use(express.static('dist'))
app.use(express.json())
// app.use(middleware.requestLogger)

app.use('/api/blogs', blogsRouter)

app.use(middleware.errorHandler)

export default app
