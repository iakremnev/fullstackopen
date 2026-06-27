import { useNotification } from "../stores/notifications"

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 10
  }

  const notification = useNotification()

  if (notification.message) {
   return <div style={style}>{notification.message}</div>
  }
}

export default Notification
