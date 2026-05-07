import assert from 'node:assert'
import { describe, test, beforeEach, after, before } from 'node:test'
import supertest from 'supertest'
import app from '../app.js'
import Blog from '../models/blog.js'
import helper from './test_helper.js'
import mongoose from 'mongoose'
import logger from '../utils/logger.js'

const api = supertest(app)

let token

before(async () => {
  await api
    .post('/api/users')
    .send(helper.singleUser2)
  const loginResponse = await api.post('/api/login').send({
    username: helper.singleUser2.username,
    password: helper.singleUser2.password
  })
  token = loginResponse.body.token
})

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

describe.only('Add new blog post', () => {

  beforeEach(async () => {
    await Blog.deleteMany({})
  })

  test('unauthenticated call is not allowed', async () => {
    await api
      .post('/api/blogs')
      .send(helper.singleBlog)
      .expect(401)
  })

  test.only('contents is identical', async () => {
    const response = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(helper.singleBlog)
      .expect(201)
      .expect('Content-type', /application\/json/)

    const addedBlog = response.body
    delete addedBlog.id
    delete addedBlog.user
    assert.deepStrictEqual(addedBlog, helper.singleBlog)
  })

  test('total number of blogs increased by 1', async () => {
    const allBlogsBefore = await helper.allBlogsInDB()

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
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
      .set('Authorization', `Bearer ${token}`)
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
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(helper.blogWithoutUrl)
      .expect(400)
  })

  test('title', async () => {
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
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
      .set('Authorization', `Bearer ${token}`)
      .send(helper.singleBlog)
      .expect(201)

    const totalBeforeDelete = (await helper.allBlogsInDB()).length
    await api
      .delete(`/api/blogs/${response.body.id}`)
      .set('Authorization', `Bearer ${token}`)
    const totalAfterDelete = (await helper.allBlogsInDB()).length

    assert.strictEqual(totalAfterDelete, totalBeforeDelete - 1)
  })

  test('statuscode 204 is returned for valid id', async () => {
    const response = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(helper.singleBlog)

    await api
      .delete(`/api/blogs/${response.body.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)
  })
})

describe('when updating an individual blog post', async () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
  })

  test('total number of blogs doesn\'t change', async () => {
    const response = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(helper.singleBlog)
      .expect(201)

    const newBlog = response.body
    newBlog.likes += 10

    const totalBeforeUpdate = await helper.allBlogsInDB().length
    await api
      .put(`/api/blogs/${newBlog.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(200)
    const totalAfterUpdate = await helper.allBlogsInDB().length
    assert.strictEqual(totalAfterUpdate, totalBeforeUpdate)
  })

  test.only('contents is identical', async () => {
    let response = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(helper.singleBlog)
      .expect(201)

    const newBlog = response.body
    delete newBlog.user
    newBlog.likes += 10

    response = await api
      .put(`/api/blogs/${newBlog.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(200)
    const updatedBlog = response.body
    delete updatedBlog.user
    assert.deepStrictEqual(updatedBlog, newBlog)
  })


})

after(async () => {
  await mongoose.connection.close()
})
