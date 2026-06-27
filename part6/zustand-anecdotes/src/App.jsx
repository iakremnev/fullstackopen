
import { useEffect } from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import AnecodeList from './components/AnecodeList'
import Filter from './components/Filter'
import { useAnecdoteActions } from './store'

const App = () => {

  const { initialize } = useAnecdoteActions()
  useEffect(() => {
    initialize()
  }, [initialize])

  return (
    <div>
      <Filter />
      <AnecodeList />
      <AnecdoteForm />
    </div>
  )
}

export default App
