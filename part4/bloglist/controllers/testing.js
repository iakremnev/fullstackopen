import { response, Router } from "express";
import Blog from "../models/blog.js";
import User from "../models/user.js";

const testingRouter = Router()

testingRouter.post('/reset', async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  response.sendStatus(204).end()
})

export default testingRouter
