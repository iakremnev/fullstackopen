import { describe, test } from 'node:test'
import assert from 'node:assert'
import listHelper from '../utils/list_helper.js'

test('dummy is always 1', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {
  const listWithZeroBlogs = []
  const listWithOneBlog = [
    {
      _id: '69bd8bc0131e3d2426566b01',
      title: 'Chicken Soup',
      author: 'Paul Romero',
      url: 'https://paul-romero-blog.com/chicken-soup',
      likes: 5,
      __v: 0
    }
  ]
  const listWithThreeBlogs = [
    {
      _id: '69bd8c77131e3d2426566b02',
      title: 'Monday Trip',
      author: 'Lucy Green',
      url: 'https://lucygreenjournal.co/moday-trip',
      likes: 4,
      __v: 0
    },
    {
      _id: '69bd8d26131e3d2426566b03',
      title: 'Fried Potatoes',
      author: 'Karl Demiduis',
      url: 'https://743-daily-journals.moo.com/',
      likes: 13,
      __v: 0
    },
    {
      _id: '69bd8d8c131e3d2426566b04',
      title: 'Monday trip again',
      author: 'James Curiuos',
      url: 'https://uternalsweets.co/killing-it',
      likes: 1,
      __v: 0
    }
  ]

  test('empty blog list has zero likes', () => {
    const result = listHelper.totalLikes(listWithZeroBlogs)
    assert.strictEqual(result, 0)
  })
  test('list with one blog has total likes exactly like the blog itself', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    const [singleBlog] = listWithOneBlog
    assert.strictEqual(result, singleBlog.likes)
  })
  test('list with 3 blogs has total likes as sum of their likes', () => {
    const result = listHelper.totalLikes(listWithThreeBlogs)
    const [firstBlog, secondBlog, thirdBlog] = listWithThreeBlogs
    const expectedTotalLikes = firstBlog.likes + secondBlog.likes + thirdBlog.likes
    assert.strictEqual(result, expectedTotalLikes)
  })
})

describe('favorites', () => {
  const listWithZeroBlogs = []
  const listWithOneBlog = [
    {
      _id: '69bd8bc0131e3d2426566b01',
      title: 'Chicken Soup',
      author: 'Paul Romero',
      url: 'https://paul-romero-blog.com/chicken-soup',
      likes: 5,
      __v: 0
    }
  ]
  const listWithThreeBlogs = [
    {
      _id: '69bd8c77131e3d2426566b02',
      title: 'Monday Trip',
      author: 'Lucy Green',
      url: 'https://lucygreenjournal.co/moday-trip',
      likes: 4,
      __v: 0
    },
    {
      _id: '69bd8d26131e3d2426566b03',
      title: 'Fried Potatoes',
      author: 'Karl Demiduis',
      url: 'https://743-daily-journals.moo.com/',
      likes: 13,
      __v: 0
    },
    {
      _id: '69bd8d8c131e3d2426566b04',
      title: 'Monday trip again',
      author: 'James Curiuos',
      url: 'https://uternalsweets.co/killing-it',
      likes: 1,
      __v: 0
    }
  ]

  test('empty blog list favorite is undefined', () => {
    const result = listHelper.favoriteBlog(listWithZeroBlogs)
    assert.strictEqual(result, undefined)
  })

  test('single blog is the favorite one', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog)
    const [singleBlog] = listWithOneBlog
    assert.deepStrictEqual(singleBlog, result)
  })

  test('non-empty blog list', () => {
    const expectedFavorite = listWithThreeBlogs[1]
    const result = listHelper.favoriteBlog(listWithThreeBlogs)
    assert.deepStrictEqual(result, expectedFavorite)
  })
})


describe('most blogs', () => {
  const listWithZeroBlogs = []
  const listWithManyBlogs = [
    {
      _id: '69bd8c77131e3d2426566b02',
      title: 'Monday Trip',
      author: 'Lucy Green',
      url: 'https://lucygreenjournal.co/moday-trip',
      likes: 4,
      __v: 0
    },
    {
      _id: '69bd8d26131e3d2426566b03',
      title: 'Fried Potatoes',
      author: 'Karl Demidui',
      url: 'https://743-daily-journals.moo.com/',
      likes: 13,
      __v: 0
    },
    {
      _id: '69bf06b94c5caab0284df714',
      title: 'Tuesday Trip',
      author: 'Lucy Green',
      url: 'https://lucygreenjournal.co/tuesday-trip',
      likes: 2,
      __v: 0
    },
    {
      _id: '69bd8d8c131e3d2426566b04',
      title: 'Monday trip again',
      author: 'James Curiuos',
      url: 'https://uternalsweets.co/killing-it',
      likes: 1,
      __v: 0
    }
  ]

  test('author of empty blog list is undefined', () => {
    const result = listHelper.mostBlogs(listWithZeroBlogs)
    assert.strictEqual(result, undefined)
  })

  test('many blogs', () => {
    const result = listHelper.mostBlogs(listWithManyBlogs)
    const expectedMostBlogs = { author: 'Lucy Green', blogs: 2 }
    assert.deepStrictEqual(result, expectedMostBlogs)
  })
})
