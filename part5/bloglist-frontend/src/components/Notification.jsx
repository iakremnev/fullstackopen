const Notification = ({ status, message }) => {

  /*
  const notificationStyle = {
    color: status === 'error' ? 'red' : 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  } */

  const className = status === 'success'
    ? 'notification is-success'
    : 'notification is-danger'

  return <div className={className}>{message}</div>
}

export default Notification
