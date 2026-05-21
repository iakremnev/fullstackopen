import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createBlog = async (blog, authToken) => {
  console.log('Send blog', blog)
  const response = axios.post(baseUrl, blog, {
    headers: {
      'Authorization': `Bearer ${authToken}`
    }
  })
  return response.data
}

export default { getAll, createBlog }
