import Blog from "../models/blog.js";

const initialBlogs = [
  {
    title: "Surfing in Australia",
    author: "Leonid Wilson",
    likes: 5,
    url: "https://leandeskblog.com/notes/53"
  },
  {
    title: "Carousel of votes",
    author: "Evgenii Prigozhin",
    likes: 10,
    url: "https://234-site-domain.link/ww3"
  },
  {
    title: "Zhukov Standards",
    author: "Max Payne",
    likes: 2,
    url: "https://ongoing-business.com/post/214"
  }
]

const allBlogsInDB = async () => {
  return await Blog.find({})
}

export default {initialBlogs, allBlogsInDB}
