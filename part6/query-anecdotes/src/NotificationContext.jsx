import { createContext } from "react";
import { useState } from "react";

const NotificationContext = createContext()

export default NotificationContext

export const NotificationContextProvider = (props) => {
  const [notification, setMessage] = useState(null)

  const clearNotification = () => setMessage(null)
  const setNotification = (message, timeout=5000) => {
    setMessage(message)
    setTimeout(clearNotification, timeout)
  }

  return (
    <NotificationContext.Provider value={{ notification, setNotification }}>
      {props.children}
    </NotificationContext.Provider>
  )
}
