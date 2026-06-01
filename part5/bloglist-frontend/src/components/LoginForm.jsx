import { useState } from 'react'
import Notification from './Notification'

const LoginForm = ({ notification, handleLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    setUsername('')
    setPassword('')
    await handleLogin(username, password)
  }

  return (
    <div className='container'>
      <div className='login-form block box m-3'>
        <h1 className='title'>Log in to blog app</h1>
        {notification && <Notification message={notification.message} status={notification.status}/>}
        <form type="submit" onSubmit={handleSubmit}>
          <div className="field">
            <label className="label">
            Username
              <input
                type="text"
                className="input"
                value={username}
                onChange={(event) =>
                  setUsername(event.target.value)
                }
              />
            </label>
          </div>
          <div className="field">
            <label className='label'>
            Password
              <input
                type="password"
                className='input'
                value={password}
                onChange={(event) =>
                  setPassword(event.target.value)
                }
              />
            </label>
          </div>
          <div className='field'>
            <button className="button is-link" type="submit">Sign In</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginForm
