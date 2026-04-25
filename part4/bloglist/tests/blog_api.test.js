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

describe('Default values', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
  })

  test('likes = 0', async () => {
    const response = await api
      .post('/api/blogs')
      .send(helper.blogWithoutLikes)
      .expect(201)
      .expect('Content-type', /application\/json/)

    assert.strictEqual(response.body.likes, 0)
  })
})

describe('Required blog fields', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
  })

  test('url', async () => {
    const response = await api
      .post('/api/blogs')
      .send(helper.blogWithoutUrl)
      .expect(400)
  })

  test('title', async () => {
    const response = await api
      .post('/api/blogs')
      .send(helper.blogWithoutTitle)
      .expect(400)
  })
})

describe('when a blog post is deleted', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
  })

  test('total number of blogs is 1 less', async () => {
    const response = await api
      .post('/api/blogs')
      .send(helper.singleBlog)
      .expect(201)

    const totalBeforeDelete = (await helper.allBlogsInDB()).length
    await api.delete(`/api/blogs/${response.body.id}`)
    const totalAfterDelete = (await helper.allBlogsInDB()).length

    assert.strictEqual(totalAfterDelete, totalBeforeDelete - 1)
  })

  test('statuscode 204 is returned for valid id', async () => {
    const response = await api
      .post('/api/blogs')
      .send(helper.singleBlog)

    await api
      .delete(`/api/blogs/${response.body.id}`)
      .expect(204)
  })
})

after(async () => {
  await mongoose.connection.close()
})
