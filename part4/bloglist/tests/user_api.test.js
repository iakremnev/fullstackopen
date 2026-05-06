import assert from 'node:assert'
import { describe, beforeEach, after, test } from 'node:test'
import supertest from 'supertest'
import app from '../app.js'
import User from '../models/user.js'
import helper from './test_helper.js'
import { reduce } from 'lodash-es'
import mongoose from 'mongoose'

const api = supertest(app)

describe.only('When user is added', () => {

  beforeEach(async () => {
    await User.deleteMany({})
  })

  test('collection of users has 1 more user', async () => {
    const totalBeforeAdd = await User.countDocuments({})
    await api
      .post('/api/users')
      .send(helper.singleUser)
      .expect(201)
    const totalAfterAdd = await User.countDocuments({})

    assert.strictEqual(totalAfterAdd, totalBeforeAdd + 1)
  })

  test('api doesn\'t return user password', async () => {
    const passwordAliases = ['password', 'passwordHash', 'password_hash']
    const response = await api
      .post('/api/users')
      .send(helper.singleUser)
      .expect(201)
    const addedUser = response.body
    assert(reduce(
      passwordAliases,
      (result, alias) => result && !(alias in addedUser),
      true
    ))
  })

  test('can\'t add another user with the same username', async () => {
    const firstResponse = await api
      .post('/api/users')
      .send(helper.singleUser)
      .expect(201)
    const secondResponse = await api
      .post('/api/users')
      .send(helper.singleUser)
      .expect(400)
    assert.strictEqual(secondResponse.body.error, 'Username must be unique')
  })

  test('short username is rejected', async () => {
    const response = await api
      .post('/api/users')
      .send(helper.userWithShortUsername)
      .expect(400)
    assert.strictEqual(response.body.error, 'Username must be at least 3 characters long')
  })

  test('short password is rejected', async () => {
    const response = await api
      .post('/api/users')
      .send(helper.userWithShortPassword)
      .expect(400)
    assert.strictEqual(response.body.error, 'Password must be at least 3 characters long')
  })
})


after(async () => {
  await mongoose.connection.close()
})
