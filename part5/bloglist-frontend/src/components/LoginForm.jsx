import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Notification from './Notification'

const LoginForm = ({ notification, handleLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()
    setUsername('')
    setPassword('')
    await handleLogin(username, password)
    navigate('/')
  }

  return (
    <div className='login-form'>
      <h2>Sign in to blog app</h2>
      {notification && <Notification message={notification.message} status={notification.status}/>}
      <form type="submit" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div>
          <label>
            username:
            <input
              type="text"
              value={username}
              onChange={(event) =>
                setUsername(event.target.value)
              }
            />
          </label>
        </div>
        <div>
          <label>
            password:
            <input
              type="password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
            />
          </label>
        </div>
        <div>
          <button type="submit">Sign In</button>
        </div>
      </form>
    </div>
  )
}

export default LoginForm
