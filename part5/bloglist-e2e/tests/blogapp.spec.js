import { test, expect, beforeEach, describe } from '@playwright/test'
import testHelper from './helper.js'

describe('Blog app', () => {
  beforeEach(async ({ request, page }) => {
    await testHelper.resetDB(request)
    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    const loginHeader = page.getByText('Login')
    await expect(loginHeader).toBeVisible()
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
      await testHelper.createBlog(page, blog.title, blog.author, blog.url)

      await expect(page.getByText(`${blog.title}${blog.author}`)).toBeVisible()
    })

    test('a blog can be liked', async ({page}) => {
      const blog = {
        title: 'Like my Blog!',
        author: 'Rudy Phillips',
        url: 'https://blogpost.com/rudyph/35-like-me'
      }
      await testHelper.createBlog(page, blog.title, blog.author, blog.url)

      const blogDiv = page.getByText(`${blog.title}${blog.author}`)
      await blogDiv.getByText('Show').click()
      await blogDiv.getByText('like', {exact: true}).click()

      expect(blogDiv.getByText('likes 1')).toBeDefined()
    })

    test('a blog can be deleted by its creator', async ({page}) => {
      const blog = {
        title: 'Delete me, oh creator',
        author: 'Myself',
        url: 'https://blogpost.com/randomslugs/3242'
      }
      await testHelper.createBlog(page, blog.title, blog.author, blog.url)

      const blogDiv = page.getByText(`${blog.title}${blog.author}`)
      await blogDiv.getByText('Show').click()

      page.on('dialog', (dialog) => dialog.accept())
      await blogDiv.getByText('Remove').click()

      await expect(page.getByText(`${blog.title}${blog.author}`)).not.toBeVisible()
    })

    test('cannot delete other\'s blogs', async ({request, page}) => {
      const otherBlog = testHelper.anonymousBlogs[0]
      await testHelper.createAnonymousBlog(request, otherBlog)

      await page.reload()
      const otherBlogDiv = page.getByText(`${otherBlog.title}${otherBlog.author}`)
      await otherBlogDiv.getByText('Show').click()
      await expect(otherBlogDiv.getByText('Remove')).not.toBeVisible()
    })

    test('blogs are sorted in likes order', async ({request, page}) => {
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
