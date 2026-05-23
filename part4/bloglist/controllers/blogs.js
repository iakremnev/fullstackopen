import express from 'express'
import Blog from '../models/blog.js'

const blogsRouter = express.Router()

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const user = request.user
  if (!user) {
    return response.sendStatus(401)
  }

  const blog = new Blog({ ...request.body, user: user.id })
  user.blogs.push(blog)
  const addedBlog = await blog.save()
  await user.save()
  await blog.populate('user', { username: 1, name: 1 })
  response.status(201).json(addedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  const user = request.user
  if (user === undefined) {
    return response.sendStatus(401)
  }

  const blog = await Blog.findById(request.params.id)
  if (blog === null) {
    return response.sendStatus(404)
  }
  if (blog.user.toString() !== user._id.toString()) {
    return response.sendStatus(403)
  }

  await Blog.findByIdAndDelete(blog._id.toString())
  response.sendStatus(204)
})

blogsRouter.put('/:id', async (request, response) => {
  const user = request.user
  if (!user) {
    return response.sendStatus(401)
  }
  const blog = await Blog.findById(request.params.id)
  if (blog === null) {
    return response.sendStatus(404)
  }
  // if (blog.user.toString() !== user._id.toString()) {
  //   return response.sendStatus(403)
  // }

  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    // { ...request.body, user },
    request.body,
    { returnDocument: 'after' }
  ).populate('user', { username: 1, name: 1 })

  response.status(200).json(updatedBlog)
})

export default blogsRouter
