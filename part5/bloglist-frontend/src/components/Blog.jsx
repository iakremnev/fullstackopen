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

  const showOnExpand = { display: expanded ? 'flex' : 'none', gap: 10 }
  const showOnExpandIfDeleteAllowed = { display: expanded && allowDelete ? 'inline flow-root' : 'none' }
  const showOnExpandIfLikeAllowed = { display: expanded && allowLike ? 'inline flow-root' : 'none' }

  return (
    <div className='blog card has-background-dark'>
      <div className="card-content">
      <h2 className="title is-2">
        {blog.title}
      </h2>
      <div>
        by {blog.author}
      </div>
      {/* <button onClick={toggleExpanded}>{expanded ? 'Hide' : 'Show'}</button>*/}
      <a style={showOnExpand} className="blog-url">{blog.url}</a>
      <div style={showOnExpand}>Added by {blog.user?.name}</div>
      <div style={showOnExpand} className="is-size-4">
        {blog.likes} likes
        <button style={showOnExpandIfLikeAllowed} className="button" onClick={handleLike}>like</button>
        <button style={showOnExpandIfDeleteAllowed} onClick={handleDelete} className="button is-danger">Remove</button>
      </div>
    </div>
    </div>
  )
}

export default Blog
