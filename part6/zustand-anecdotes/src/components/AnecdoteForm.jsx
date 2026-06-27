import { useAnecdoteActions } from "../store"

const AnecdoteForm = () => {

  const { add } = useAnecdoteActions()

  const handleAddAnecdote = (event) => {
    event.preventDefault()
    add(event.target.anecdote.value)
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
