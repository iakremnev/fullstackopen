import { useState } from 'react'
import Buttons from './components/Buttons'
import Statistics from './components/Statistics'

const App = () => {

  const [votes, setVotes] = useState({
    good: 0,
    neutral: 0,
    bad: 0
  })
  const handleVote = {
    good: () => setVotes({...votes, good: votes.good + 1}),
    neutral: () => setVotes({...votes, neutral: votes.neutral + 1}),
    bad: () => setVotes({...votes, bad: votes.bad + 1}),
  }

  return (
    <>
      <h1>Unicafe</h1>
      <Buttons onVote={handleVote}/>
      <Statistics votes={votes}/>
    </>
  )
}

export default App
