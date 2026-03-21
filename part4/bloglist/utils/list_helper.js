import {countBy, findKey} from 'lodash-es'

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

export default { dummy, totalLikes, favoriteBlog, mostBlogs }
