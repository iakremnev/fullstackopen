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
    <div className='block box m-3'>
      <h1 className='title is-2'>Create new blog</h1>
      {notification && <Notification message={notification.message} status={notification.status}/>}
      <form type="submit" onSubmit={handleSubmit}>
        <div className='field'><label className='label'>
                Title
          <input type="text" className='input' value={title} onChange={(event) => setTitle(event.target.value)}/>
        </label></div>
        <div className='field'><label className='label'>
                Author
          <input type="text" className='input' value={author} onChange={(event) => setAuthor(event.target.value)}/>
        </label></div>
        <div className='field'><label className='label'>
          URL
          <input type="text" className='input' value={url} onChange={(event) => setUrl(event.target.value)}/>
        </label></div>
        <button type="submit" className='button is-link'>Create</button>
      </form>
    </div>
  )
}

export default CreateBlogForm
