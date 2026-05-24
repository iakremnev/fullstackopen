import { test, expect, beforeEach, describe } from '@playwright/test'
import testHelper from './helper.js'

describe('Blog app', () => {
  beforeEach(async ({ request, page }) => {
    await testHelper.resetDB(request)
    await page.goto('http://localhost:5173/login')
  })

  test('Login form is shown', async ({ page }) => {
    const loginHeader = page.getByText('Login', {exact: true})
    const usernameInput = page.getByLabel('username:')
    const passwordInput = page.getByLabel('password:')
    await expect(loginHeader).toBeVisible()
    await expect(usernameInput).toBeVisible()
    await expect(passwordInput).toBeVisible()
  })

  describe('login', () => {
    beforeEach(async ({request}) => {
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
      await testHelper.createTestUser(request)
      await testHelper.loginWith(page, testHelper.testUser.username, testHelper.testUser.password)
      await expect(page.getByText(`${testHelper.testUser.name} logged in`)).toBeVisible()
    })

    test('a new blog can be created', async ({page}) => {
      const blog = {
        title: 'Consumerism en mass',
        author: 'Joseph Griffin',
        url: 'https://blogpost.com/josephgr/324-consumerism'
      }
      await page.getByText('new blog').click()
      await testHelper.createBlog(page, blog.title, blog.author, blog.url)

      await expect(page.getByText(`${blog.title} by ${blog.author}`)).toBeVisible()
    })

    test('a blog can be liked', async ({page}) => {
      const blog = {
        title: 'Like my Blog!',
        author: 'Rudy Phillips',
        url: 'https://blogpost.com/rudyph/35-like-me'
      }
      await page.getByText('new blog').click()
      await testHelper.createBlog(page, blog.title, blog.author, blog.url)
      await page.getByText(`${blog.title} by ${blog.author}`).click()

      await page.getByText('like', {exact: true}).click()
      expect(page.getByText('likes 1')).toBeDefined()
    })

    test('a blog can be deleted by its creator', async ({page}) => {
      const blog = {
        title: 'Delete me, oh creator',
        author: 'Myself',
        url: 'https://blogpost.com/randomslugs/3242'
      }
      await page.getByText('new blog').click()
      await testHelper.createBlog(page, blog.title, blog.author, blog.url)
      await page.getByText(`${blog.title} by ${blog.author}`).click()

      page.on('dialog', (dialog) => dialog.accept())
      await page.getByText('Remove').click()
      await page.getByRole('link', {name: 'blogs', exact: true}).click()
      await expect(page.getByText(`${blog.title} by ${blog.author}`)).not.toBeVisible()
    })

    test('cannot delete other\'s blogs', async ({request, page}) => {
      const otherBlog = testHelper.anonymousBlogs[0]
      await testHelper.createAnonymousBlog(request, otherBlog)

      await page.reload()
      await page.getByText(`${otherBlog.title} by ${otherBlog.author}`).click()
      await expect(page.getByText('Remove')).not.toBeVisible()
    })

    test.skip('blogs are sorted in likes order', async ({request, page}) => {
      await Promise.all(testHelper.anonymousBlogs.map(async (blog) => {
        await testHelper.createAnonymousBlog(request, blog)
      }))

      await page.reload({waitUntil: 'domcontentloaded'})
      await page.locator('.blog').first().waitFor()
      const blogDivs = await page.locator(".blog").all()
      const likeValues = await Promise.all(blogDivs.map(async (div) => {
        await div.getByText('Show').click()
        const likesText = await div.getByText(/likes \d+/).textContent()
        return parseInt(likesText.replace('likes ', ''))
      }))

      expect(likeValues).toHaveLength(testHelper.anonymousBlogs.length)
      expect(likeValues).toStrictEqual(likeValues.toSorted((a, b) => b - a))
    })
  })
})
