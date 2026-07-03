import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery } from '@tanstack/react-query'
import anecdoteService from './services/anecdotes'

const App = () => {
  const handleVote = (anecdote) => {
    console.log('vote')
  }

  const anecdotes = useQuery({
    queryKey: ['anecdotes'],
    queryFn: anecdoteService.getAll
  })

  if (anecdotes.isPending) {
    return <div>fetching data...</div>
  }

  if (anecdotes.isError) {
    return <div>Couldn't fetch anecdotes due to server error</div>
  }

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.data.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App
