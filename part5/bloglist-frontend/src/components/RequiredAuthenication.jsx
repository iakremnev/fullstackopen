import { Navigate } from 'react-router-dom'

const RequiresAuthentication = ({ user, children }) => {

  if (!user) return <Navigate to='/login' replace />
  return <>{children}</>
}

export default RequiresAuthentication
