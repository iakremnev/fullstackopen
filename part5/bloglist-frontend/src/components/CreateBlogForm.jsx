import { useState } from 'react'
import Notification from './Notification'

const CreateBlogForm = ({ notification, handleCreateNewBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    await handleCreateNewBlog({ title, author, url })
    // setTitle('')
    // setAuthor('')
    // setUrl('')
  }
  return (
    <div>
      <h2>Create new blog</h2>
      {notification && <Notification message={notification.message} status={notification.status}/>}
      <form type="submit" onSubmit={handleSubmit}>
        <label>
                title:
          <input type="text" value={title} onChange={(event) => setTitle(event.target.value)}/>
        </label>
        <label>
                author:
          <input type="text" value={author} onChange={(event) => setAuthor(event.target.value)}/>
        </label>
        <label>
                url:
          <input type="text" value={url} onChange={(event) => setUrl(event.target.value)}/>
        </label>
        <button type="submit">Create</button>
      </form>
    </div>
  )
}

export default CreateBlogForm
