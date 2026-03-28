import assert from 'node:assert'
import { describe, test, beforeEach, after } from 'node:test'
import supertest from 'supertest'
import app from '../app.js'
import Blog from '../models/blog.js'
import helper from './test_helper.js'
import mongoose from 'mongoose'

const api = supertest(app)

describe('Fetch blogs from DB', () => {
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

describe('Add new blog post', () => {

  beforeEach(async () => {
    await Blog.deleteMany({})
  })

  test('contents is identical', async () => {
    const response = await api
      .post('/api/blogs')
      .send(helper.singleBlog)
      .expect(201)
      .expect('Content-type', /application\/json/)

    const addedBlog = response.body
    delete addedBlog.id
    assert.deepStrictEqual(addedBlog, helper.singleBlog)
  })

  test('total number of blogs increased by 1', async () => {
    const allBlogsBefore = await helper.allBlogsInDB()

    await api
      .post('/api/blogs')
      .send(helper.singleBlog)
      .expect(201)
      .expect('Content-type', /application\/json/)

    const allBlogsAfter = await helper.allBlogsInDB()

    assert.strictEqual(allBlogsAfter.length, allBlogsBefore.length + 1)
  })
})

after(async () => {
  await mongoose.connection.close()
})
