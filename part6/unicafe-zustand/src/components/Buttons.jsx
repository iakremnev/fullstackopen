const Buttons = ({ onVote }) => {
  return (
    <div>
      <h2>give feedback</h2>
      <button onClick={onVote.good}>good</button>
      <button onClick={onVote.neutral}>neutral</button>
      <button onClick={onVote.bad}>bad</button>
    </div>
  )
}

export default Buttons
