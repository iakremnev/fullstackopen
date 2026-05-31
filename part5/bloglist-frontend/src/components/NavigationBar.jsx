import { Link } from 'react-router-dom'

const NavigationBar = ({ user, handleLogout }) => {

  const logoutButton = () => {
    return <button className='button is-light' onClick={handleLogout}>Sign Out</button>
  }

  const padding = { padding: 5 }

  return (
    <nav className='navbar' role='navigation'>
      <div className='navbar-brand'>
        <div className='navbar-item'>
          <div className='has-text-weight-bold'>Blog App</div>
        </div>
      </div>
      <div className='navbar-menu'>
        <div className='navbar-start'>
          <Link style={padding} className='navbar-item has-text-weight-medium' to="/">Blogs</Link>
          {user && <Link style={padding} className='navbar-item has-text-weight-medium' to='/create'>New blog</Link>}
        </div>
        <div className='navbar-end'>
          {!user && (
            <div className='navbar-item'>
              <Link style={padding} className='button is-primary' to="/login">Login</Link>
            </div>
          )}
          {user && (
            <div className='navbar-item'>
              {logoutButton()}
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default NavigationBar
