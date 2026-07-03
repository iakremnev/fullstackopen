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
  await fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(anecdoteObj)
  })
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
  return response.json()
}

export default { getAll, create, update }
