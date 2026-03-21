import { countBy, findKey, get, transform } from 'lodash-es'

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return undefined
  }
  const maxLikes = blogs.reduce((accum, item) => Math.max(accum, item.likes), -Infinity)
  return blogs.find(item => item.likes === maxLikes)
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return undefined
  }
  const blogsByAuthor = countBy(blogs, item => item.author)
  const mostBlogs = Math.max(...Object.values(blogsByAuthor))
  const authorWithMostBlogs = findKey(blogsByAuthor, value => value === mostBlogs)
  return { author: authorWithMostBlogs, blogs: mostBlogs }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return undefined
  }
  const likesByAuthor = transform(blogs, (result, item) => {
    result[item.author] = get(result, item.author, 0) + item.likes
  })
  const mostLikes = Math.max(...Object.values(likesByAuthor))
  const authorWithMostLikes = findKey(likesByAuthor, value => value === mostLikes)
  return { author: authorWithMostLikes, likes: mostLikes }
}

export default { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }
