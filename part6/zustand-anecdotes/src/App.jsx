
import { useEffect } from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import AnecodeList from './components/AnecodeList'
import Filter from './components/Filter'
import Notification from './components/Notification'
import { useAnecdoteActions } from './stores/anecdotes'

const App = () => {

  const { initialize } = useAnecdoteActions()
  useEffect(() => {
    initialize()
  }, [initialize])

  return (
    <div>
      <Filter />
      <Notification />
      <AnecodeList />
      <AnecdoteForm />
    </div>
  )
}

export default App
