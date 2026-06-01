import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const blog = {
  author: 'Volodimir Karamzin',
  title: 'How I drink coffee',
  url: 'https://blogposts.com/vkarm/544-coffee',
  likes: 12
}

describe('<Blog />', () => {

  test.skip('has author and title shown by default only', () => {
    render(<Blog blog={blog}/>)
    const titleElement = screen.getByText(blog.title)
    const authorElement = screen.getByText(blog.author)
    const urlElememnt = screen.getByText(blog.url)
    const likesElement = screen.getByText(`likes ${blog.likes}`)

    expect(titleElement).toBeVisible()
    expect(authorElement).toBeVisible()
    expect(urlElememnt).not.toBeVisible()
    expect(likesElement).not.toBeVisible()
  })

  test.skip('shows url and number of likes when the button is clicked', async () => {
    const user = userEvent.setup()

    render(<Blog blog={blog}/>)
    const button = screen.getByText('Show')
    await user.click(button)

    const urlElememnt = screen.queryByText(blog.url)
    const likesElement = screen.queryByText(`likes ${blog.likes}`)

    expect(urlElememnt).toBeVisible()
    expect(likesElement).toBeVisible()
  })

  test('only blog info is shown for an unauthenticated user', async () => {
    render(<Blog blog={blog}/>)

    const header = screen.getByText(`${blog.author}:`, {})
    const url = screen.getByText(blog.url)
    const likes = screen.getByText(`likes ${blog.likes}`)
    const likeButton = screen.queryByText('like', { exact: true })
    const deleteButton = screen.queryByText('Remove')

    expect(header).toBeVisible()
    expect(url).toBeVisible()
    expect(likes).toBeVisible()
    expect(likeButton).not.toBeVisible()
    expect(deleteButton).not.toBeVisible()
  })

  test('like button is only shown if allowed', async () => {
    render(<Blog blog={blog} allowLike/>)
    const likeButton = screen.getByText('like', { exact: true })
    expect(likeButton).toBeVisible()
  })

  test('delete button is only shown if allowed', async () => {
    render(<Blog blog={blog} allowDelete/>)
    const deleteButton = screen.getByText('Remove')
    expect(deleteButton).toBeVisible()
  })

  test('like button can be clicked successively', async () => {
    const user = userEvent.setup()
    const mockHandler = vi.fn()

    render(<Blog blog={blog} allowLike handleLike={mockHandler}/>)

    // // 1. Expand the blog
    // const showButton = screen.getByText('Show')
    // await user.click(showButton)
    // // 2. Click like twice
    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})
