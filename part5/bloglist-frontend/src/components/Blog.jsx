import { useState } from 'react'

const Blog = ({ blog, allowDelete, handleLike, handleDelete }) => {
  const [expanded, setExpanded] = useState(false)
  const toggleExpanded = () => setExpanded(!expanded)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const showOnExpand = { display: expanded ? 'block' : 'none' }
  const showOnExpandIfAllowed = { display: expanded && allowDelete ? 'block' : 'none' }

  return (
    <div className='blog' style={blogStyle}>
      <span>{blog.title}</span>
      <span>{blog.author}</span>
      <button onClick={toggleExpanded}>{expanded ? 'Hide' : 'Show'}</button>
      <div style={showOnExpand}>{blog.url}</div>
      <div style={showOnExpand}>likes {blog.likes} <button onClick={handleLike}>like</button></div>
      <div style={showOnExpand}>{blog.user?.name}</div>
      <div style={showOnExpandIfAllowed}><button onClick={handleDelete}>Remove</button></div>
    </div>
  )
}

export default Blog
