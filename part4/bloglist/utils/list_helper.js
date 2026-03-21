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

export default { dummy, totalLikes, favoriteBlog }
