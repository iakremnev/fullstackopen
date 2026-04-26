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
  const newUser = await User({
    username: userPayload.username,
    passwordHash: await password.hashPassword(userPayload.password),
    name: userPayload.name
  }).save()
  response.status(201).json(newUser)
})

export default usersRouter
