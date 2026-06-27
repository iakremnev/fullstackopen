import { useAnecdoteActions, useAnecdotes } from "../stores/anecdotes"
import { useNotificationActions } from '../stores/notifications'

const AnecodeList = () => {
  const anecdotes = useAnecdotes()
  const { vote, remove } = useAnecdoteActions()
  const { setInfo } = useNotificationActions()

  const handleVoteFor = (anecdote) => (async () => {
    await vote(anecdote.id)
    setInfo(`You voted for ${anecdote.content}`)
  })

  const handleDeleteFor = (anecdote) => (async () => {
    await remove(anecdote.id)
    setInfo(`You deleted anecdote ${anecdote.content}`)
  })

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={ handleVoteFor(anecdote) }>vote</button>
            {anecdote.votes === 0 &&
              <button onClick={ handleDeleteFor(anecdote) }>delete</button>
            }
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecodeList
