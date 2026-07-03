import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import anecdoteService from '../services/anecdotes'


const useAnecdotes = () => {

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

  const createAnecdoteMutation = useMutation({
    mutationFn: anecdoteService.create,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
    }
  })

  return {
    data: anecdotesQuery.data,
    isPending: anecdotesQuery.isPending,
    isError: anecdotesQuery.isError,
    vote: (anecdote) => voteAnecdoteMutaion.mutate(anecdote),
    create: (anecdote) => createAnecdoteMutation.mutate(anecdote)
  }
}

export default useAnecdotes
