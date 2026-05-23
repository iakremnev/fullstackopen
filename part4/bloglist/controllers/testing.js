import { Router } from "express";
import Blog from "../models/blog.js";
import User from "../models/user.js";

const testingRouter = Router()

testingRouter.post('/reset', async (request, response) => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  response.sendStatus(204).end()
})

testingRouter.post('/anonymousblog', async (request, response) => {
  const blog = Blog({ ...request.body, user: null })
  await blog.save()
  response.status(201).json(blog)
})

export default testingRouter
