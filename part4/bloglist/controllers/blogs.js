import express from 'express'
import Blog from '../models/blog.js'
import helper from '../utils/model_helper.js'

const blogsRouter = express.Router()

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  // Note: Assume that there's at least 1 user in DB
  const creatorUser = await helper.getRandomUser()
  const blog = new Blog({ ...request.body, user: creatorUser })
  const addedBlog = await blog.save()
  creatorUser.blogs.push(blog)
  await creatorUser.save()
  response.status(201).json(addedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.sendStatus(204)
})

blogsRouter.put('/:id', async (request, response) => {
  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    request.body,
    { returnDocument: 'after' }
  )
  response.status(200).json(updatedBlog)
})

export default blogsRouter
