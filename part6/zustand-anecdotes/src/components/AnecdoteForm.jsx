import { useAnecdoteActions } from "../stores/anecdotes"
import { useNotificationActions } from "../stores/notifications"

const AnecdoteForm = () => {

  const { add } = useAnecdoteActions()
  const { setInfo } = useNotificationActions()

  const handleAddAnecdote = async (event) => {
    event.preventDefault()
    const anecdote = event.target.anecdote.value
    await add(anecdote)
    setInfo(`Added new anecdote: ${anecdote}`)
    event.target.reset()
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleAddAnecdote}>
        <div>
          <input name='anecdote'/>
        </div>
        <button>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
