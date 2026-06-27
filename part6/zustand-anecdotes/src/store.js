
import { create } from 'zustand'
import anecdoteService from './services/anecdotes'


const useAnecdoteStore = create((set) => ({
  anecdotes: [],
  filter: '',
  actions: {
    vote: (id) => set(state => ({
      anecdotes: state.anecdotes
        .map(item => item.id === id ? { ...item, votes: item.votes + 1 } : item)
        .toSorted((left, right) => right.votes - left.votes)
    })),
    add: async (anecdoteText) => {
      const anecdote = await anecdoteService.create(anecdoteText)
      set((state) => ({ anecdotes: state.anecdotes.concat(anecdote) }))
    },
    setFilter: (filterText) => set(() => ({ filter: filterText })),
    initialize: async () => {
      const anecdotes = await anecdoteService.getAll()
      set(() => ({ anecdotes }))
    }
  },
}))

export const useAnecdotes = () => {
  const anecdotes = useAnecdoteStore((state) => state.anecdotes)
  const filter = useAnecdoteStore((state) => state.filter)
  return anecdotes.filter(item => item.content.includes(filter))
}
export const useAnecdoteActions = () => useAnecdoteStore((state) => state.actions)
