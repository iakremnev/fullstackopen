import bcrypt from 'bcrypt'
import express from 'express'
import jwt from 'jsonwebtoken'

import User from '../models/user.js'

const loginRouter = express.Router()

loginRouter.post('/', async (request, response) => {
  if (request.body === undefined || request.body.username === undefined || request.body.password === undefined) {
    return response.status(422).json({ error: 'Username and password are required' })
  }

  const { username, password } = request.body
  const user = await User.findOne({ username })
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return response.status(401).json({ error: 'Invalid username or password' })
  }

  const userForToken = {
    username: user.username,
    id: user._id.toString()
  }
  const token = jwt.sign(userForToken, process.env.JWTSECRET)

  response
    .status(200)
    .json({ token, username: user.username, name: user.name })
})

export default loginRouter
