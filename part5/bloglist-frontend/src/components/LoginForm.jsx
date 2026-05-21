import { useState } from 'react'

const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    setUsername('')
    setPassword('')
    handleLogin(username, password)
  }

  return (
    <div>
      <form type="submit" onSubmit={handleSubmit}>
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
