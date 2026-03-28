import Blog from '../models/blog.js'

const initialBlogs = [
  {
    title: 'Surfing in Australia',
    author: 'Leonid Wilson',
    likes: 5,
    url: 'https://leandeskblog.com/notes/53'
  },
  {
    title: 'Carousel of votes',
    author: 'Evgenii Prigozhin',
    likes: 10,
    url: 'https://234-site-domain.link/ww3'
  },
  {
    title: 'Zhukov Standards',
    author: 'Max Payne',
    likes: 2,
    url: 'https://ongoing-business.com/post/214'
  }
]

const singleBlog = {
  title: 'A new dawn for the Galaxy',
  author: 'Eclipse R',
  likes: 12,
  url: 'https://eclipse-games.co.uk/second-dawn'
}

const blogWithoutLikes = {
  title: 'Cool winter',
  author: 'Robert Martin',
  url: 'https://robertmblogs.org/cool-winter'
}

const blogWithoutUrl = {
  title: 'Cool winter',
  author: 'Robert Martin',
  likes: 5
}

const blogWithoutTitle = {
  author: 'Robert Martin',
  url: 'https://robertmblogs.org/cool-winter',
  likes: 5
}

const allBlogsInDB = async () => {
  return await Blog.find({})
}

export default {
  initialBlogs,
  singleBlog,
  blogWithoutLikes,
  blogWithoutUrl,
  blogWithoutTitle,
  allBlogsInDB
}
