import assert from 'node:assert'
import { describe, test, beforeEach, after } from 'node:test'
import supertest from 'supertest'
import app from '../app.js'
import Blog from '../models/blog.js'
import helper from './test_helper.js'
import mongoose from 'mongoose'

const api = supertest(app)

describe('reading blogs from the DB', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
  })

  test('all blogs are returned', async () => {
    const responseBlogs = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-type', /application\/json/)

    assert.strictEqual(responseBlogs.body.length, helper.initialBlogs.length)
  })

  test('unique blog identifier is named "id"', async () => {
    const responseBlogs = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-type', /application\/json/)

    responseBlogs.body.forEach(blog => {
      assert('id' in blog)
    })
  })

})

after(async () => {
  await mongoose.connection.close()
})
