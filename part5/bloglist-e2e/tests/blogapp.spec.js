import { test, expect, beforeEach, describe } from '@playwright/test'
import testHelper from './helper.js'

describe('Blog app', () => {
  beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    const loginHeader = page.getByText('Login')
    await expect(loginHeader).toBeVisible()
  })

  describe('login', () => {
    beforeEach(async ({request}) => {
      await testHelper.resetDB(request)
      await testHelper.createTestUser(request)
    })

    test('successful', async ({page}) => {
      const user = testHelper.testUser
      await testHelper.loginWith(page, user.username, user.password)
      await expect(page.getByText(`${user.name} logged in`)).toBeVisible()
    })

    test('failed', async ({page}) => {
      await testHelper.loginWith(page, 'some_name', 'wrongPassword')
      await expect(page.locator('.error')).toBeVisible()
    })
  })

  describe('when logged in', () => {
    beforeEach(async ({page, request}) => {
      await testHelper.resetDB(request)
      await testHelper.createTestUser(request)
      await testHelper.loginWith(page, testHelper.testUser.username, testHelper.testUser.password)
    })

    test('a new blog can be created', async ({page}) => {
      const blog = {
        title: 'Consumerism en mass',
        author: 'Joseph Griffin',
        url: 'https://blogpost.com/josephgr/324-consumerism'
      }
      await page.getByText('Add new blog').click()
      await page.getByLabel('title:').fill(blog.title)
      await page.getByLabel('author:').fill(blog.author)
      await page.getByLabel('url:').fill(blog.url)
      await page.getByText('Create').click()

      await expect(page.getByText(`${blog.title}${blog.author}`)).toBeVisible()
    })
  })
})
