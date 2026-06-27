const baseUrl = 'http://localhost:3001/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = anecdote => ({
  content: anecdote,
  id: getId(),
  votes: 0
})

const getAll = async () => {
  const response = await fetch(baseUrl + "/")
  if (!response.ok) {
    throw new Error('Failed to fetch anecdotes')
  }
  return await response.json()
}

const create = async (anecdoteText) => {
  const anecdote = asObject(anecdoteText)
  const response = await fetch(baseUrl + "/", {
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(anecdote)
  })

  if (!response.ok) {
    throw new Error('Failed to create an anecdote')
  }
  return anecdote
}

export default { getAll, create }
