import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CreateBlogForm from './CreateBlogForm'

const newBlog = {
  title: 'The Iron Wall',
  author: 'Zeev Jabotinsky',
  url: 'https://www.biu.ac.il/en/article/9375'
}

describe('<CreateBlogForm />', () => {
  test('calls handler with submitted inputs', async () => {
    const user = userEvent.setup()
    const mockHandler = vi.fn()

    render(<CreateBlogForm handleCreateNewBlog={mockHandler}/>)

    const titleInput = screen.getByLabelText('title:')
    const authorInput = screen.getByLabelText('author:')
    const urlInput = screen.getByLabelText('url:')
    const button = screen.getByText('Create')

    await user.type(titleInput, newBlog.title)
    await user.type(authorInput, newBlog.author)
    await user.type(urlInput, newBlog.url)
    await user.click(button)

    expect(mockHandler.mock.calls[0][0]).toStrictEqual(newBlog)
  })
})
