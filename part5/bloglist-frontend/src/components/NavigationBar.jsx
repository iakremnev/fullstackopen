import { Link } from 'react-router-dom'

const NavigationBar = ({ user, handleLogout }) => {

  const logoutButton = () => {
    return <button onClick={handleLogout}>Sign Out</button>
  }

  const padding = { padding: 5 }

  console.log(user)
  return (
    <div>
      <Link style={padding} to="/">blogs</Link>
      {user && <Link style={padding} to='/create'>new blog</Link>}
      {!user && <Link style={padding} to="/login">login</Link>}
      {user && logoutButton()}
    </div>
  )
}

export default NavigationBar
