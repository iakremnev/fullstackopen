import { useState, useEffect } from "react"
import anecdoteService from '../services/anecdotes'




const useAnecdotes = () => {
  const [anecdotes, setAnecdotes] = useState([])

  const addAnecdote = async (anecdote) => {
    const response = await anecdoteService.createNew({ ...anecdote, votes: 0 })
    setAnecdotes(anecdotes.concat(response))
  }

  useEffect(() => {
    anecdoteService.getAll().then((result) => setAnecdotes(result))
  }, [])

  return { anecdotes, addAnecdote }
}

export default useAnecdotes
