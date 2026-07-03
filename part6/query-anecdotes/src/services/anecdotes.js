const baseUrl = 'http://localhost:3001/anecdotes'

const getId = () => Math.ceil(Math.random() * 100000)

const getAll = async () => {
  const response = await fetch(baseUrl)
  return response.json()
}

const create = async (anecdote) => {
  const anecdoteObj = {
    content: anecdote,
    votes: 0,
    id: getId()
  }
  const response = await fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(anecdoteObj)
  })
  if (!response.ok) {
    const error = (await response.json()).error
    throw new Error(`Failed to create an anecdote: ${error}`)
  }
  return anecdoteObj
}

const update = async (id, anecdote) => {
  const response = await fetch(`${baseUrl}/${id}`, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(anecdote)
  })
  return await response.json()
}

export default { getAll, create, update }
