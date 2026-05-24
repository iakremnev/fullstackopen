const Blog = ({ blog, allowLike, allowDelete, handleLike, handleDelete }) => {

  if (!blog) {
    return null
  }

  /*
  const [expanded, setExpanded] = useState(false)
  const toggleExpanded = () => setExpanded(!expanded)
  */

  const expanded = true

  /*
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  */

  const showOnExpand = { display: expanded ? 'block' : 'none' }
  const showOnExpandIfDeleteAllowed = { display: expanded && allowDelete ? 'block' : 'none' }
  const showOnExpandIfLikeAllowed = { display: expanded && allowLike ? 'inline flow-root' : 'none' }

  return (
    <div className='blog'>
      <h2>
        <span>{blog.author}: </span>
        <span>{blog.title}</span>
      </h2>
      {/* <button onClick={toggleExpanded}>{expanded ? 'Hide' : 'Show'}</button>*/}
      <div style={showOnExpand} className="blog-url">{blog.url}</div>
      <div style={showOnExpand}>
        likes {blog.likes}
        <button style={showOnExpandIfLikeAllowed} onClick={handleLike}>like</button>
      </div>
      <div style={showOnExpand}>{blog.user?.name}</div>
      <div style={showOnExpandIfDeleteAllowed}><button onClick={handleDelete}>Remove</button></div>
    </div>
  )
}

export default Blog
