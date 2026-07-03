import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import anecdoteService from './services/anecdotes'

const App = () => {
  const handleVote = (anecdote) => {
    voteAnecdoteMutaion.mutate(anecdote)
  }

  const queryClient = useQueryClient()
  const anecdotesQuery = useQuery({
    queryKey: ['anecdotes'],
    queryFn: anecdoteService.getAll,
    refetchOnWindowFocus: false
  })
  const voteAnecdoteMutaion = useMutation({
    mutationFn: async (anecdote) => {
      const votedAnecdote = {...anecdote, votes: anecdote.votes + 1}
      return await anecdoteService.update(anecdote.id, votedAnecdote)
    },
    onSuccess: (votedAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      const newAnecdotes = anecdotes.map(
        (item) => item.id === votedAnecdote.id ? votedAnecdote : item
      )
      queryClient.setQueryData(['anecdotes'], newAnecdotes)
    }
  })

  if (anecdotesQuery.isPending) {
    return <div>fetching data...</div>
  }

  if (anecdotesQuery.isError) {
    return <div>Couldn't fetch anecdotes due to server error</div>
  }

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotesQuery.data.map((anecdote) => (
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
