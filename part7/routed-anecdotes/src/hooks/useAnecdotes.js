import { useState, useEffect } from "react"
import anecdoteService from '../services/anecdotes'




const useAnecdotes = () => {
  const [anecdotes, setAnecdotes] = useState([])

  const addAnecdote = async (anecdote) => {
    const response = await anecdoteService.createNew({ ...anecdote })
    setAnecdotes(anecdotes.concat(response))
  }

  const deleteAnecdote = async (id) => {
    await anecdoteService.deleteById(id)
    setAnecdotes(anecdotes.filter(item => item.id !== id))
  }

  useEffect(() => {
    anecdoteService.getAll().then((result) => setAnecdotes(result))
  }, [])

  return { anecdotes, addAnecdote, deleteAnecdote }
}

export default useAnecdotes
