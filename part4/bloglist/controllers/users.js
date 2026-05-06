import express from 'express'
import User from '../models/user.js'
import password from '../utils/password.js'

const usersRouter = express.Router()

usersRouter.get('/', async (request, response) => {
  const users = await User.find({})
  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const userPayload = request.body

  if (userPayload.username.length < 3) {
    return response.status(400).send({ error: 'Username must be at least 3 characters long' })
  }
  if (userPayload.password.length < 3) {
    return response.status(400).send({ error: 'Password must be at least 3 characters long' })
  }

  const newUser = await User({
    username: userPayload.username,
    passwordHash: await password.hashPassword(userPayload.password),
    name: userPayload.name
  }).save()
  response.status(201).json(newUser)
})

export default usersRouter
