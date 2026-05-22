import { render, screen } from '@testing-library/react'
import Blog from './Blog'

const blog = {
  author: 'Volodimir Karamzin',
  title: 'How I drink coffee',
  url: 'https://blogposts.com/vkarm/544-coffee',
  likes: 12
}

describe('<Blog />', () => {

  test('has author and title shown by default only', () => {
    render(<Blog blog={blog}/>)
    const titleElement = screen.getByText(blog.title)
    const authorElement = screen.getByText(blog.author)
    const urlElememnt = screen.queryByText(blog.url)
    const likesElement = screen.queryByText(`likes ${blog.likes}`)

    expect(titleElement).toBeVisible()
    expect(authorElement).toBeVisible()
    expect(urlElememnt).toBe(null)
    expect(likesElement).toBe(null)
  })
})
