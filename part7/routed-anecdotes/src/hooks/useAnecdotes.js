import { useState, useEffect } from "react"
import anecdoteService from '../services/anecdotes'


const useAnecdotes = () => {
  const [anecdotes, setAnecdotes] = useState([])

  useEffect(() => {
    anecdoteService.getAll().then((result) => setAnecdotes(result))
  }, [])

  return { anecdotes }
}

export default useAnecdotes
