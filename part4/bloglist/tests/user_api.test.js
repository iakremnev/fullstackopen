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

  test.only('collection of users has 1 more user', async () => {
    const totalBeforeAdd = await User.countDocuments({})
    await api
      .post('/api/users')
      .send(helper.singleUser)
      .expect(201)
    const totalAfterAdd = await User.countDocuments({})

    assert.strictEqual(totalAfterAdd, totalBeforeAdd + 1)
  })

  test.only('api doesn\'t return user password', async () => {
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
})

after(async () => {
  await mongoose.connection.close()
})
