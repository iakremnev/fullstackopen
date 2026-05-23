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
})
