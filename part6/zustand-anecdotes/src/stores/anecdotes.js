
import { create } from 'zustand'
import anecdoteService from '../services/anecdotes'

const cmp = (left, right) => right.votes - left.votes

const useAnecdoteStore = create((set, get) => ({
  anecdotes: [],
  filter: '',
  actions: {
    vote: async (id) => {
      const anecdote = get().anecdotes.find(item => item.id === id)
      const updated = await anecdoteService.update(
        id, { ...anecdote, votes: anecdote.votes + 1 }
      )
      set(state => ({
        anecdotes:
          state.anecdotes.map(item => item.id === id ? updated : item)
      }))
    },
    add: async (anecdoteText) => {
      const anecdote = await anecdoteService.create(anecdoteText)
      set((state) => ({ anecdotes: state.anecdotes.concat(anecdote) }))
    },
    remove: async (id) => {
      await anecdoteService.remove(id)
      set((state) => ({ anecdotes: state.anecdotes.filter(item => item.id !== id) }))
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
  return anecdotes
    .filter(item => item.content.includes(filter))
    .toSorted(cmp)
}
export const useAnecdoteActions = () => useAnecdoteStore((state) => state.actions)

export default useAnecdoteStore
