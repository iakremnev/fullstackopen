import { it, beforeEach, describe, vi, expect, afterEach } from 'vitest'
import { renderHook, act, cleanup } from '@testing-library/react'

vi.mock('../services/anecdotes', () => ({
  default: {
    getAll: vi.fn()
  }
}))

import anecdoteService from '../services/anecdotes'
import useAnecdoteStore, { useAnecdotes, useAnecdoteActions } from './anecdotes'
import anecdotes from '../services/anecdotes'


describe('anecdote store', () => {

  beforeEach(async () => {
    useAnecdoteStore.setState({ anecdotes: [] })
  })

  it('initialized with data from server', async () => {
    const mockAnecdotes = [{ content: 'haha funny', id: 23, votes: 0 }]
    anecdoteService.getAll.mockResolvedValue(mockAnecdotes)

    const { result } = renderHook(() => useAnecdoteActions())
    await act(async () => await result.current.initialize())

    const { result: anecdotes } = renderHook(() => useAnecdotes())
    expect(anecdotes.current).toEqual(mockAnecdotes)
  })

  it('returns anecdotes in sorted order', async () => {
    const anecdotes = [
      {
        content: 'anecdote with 10 votes',
        id: 23,
        votes: 10
      },
      {
        content: 'anecdote with 0 votes',
        id: 25,
        votes: 0
      },
      {
        content: 'anecdote with 5 votes',
        id: 26,
        votes: 5
      }
    ]
    useAnecdoteStore.setState({ anecdotes })

    const { result } = renderHook(() => useAnecdotes())
    const sortedAnecdotes = anecdotes.toSorted((left, right) => right.votes - left.votes)
    expect(result.current).toEqual(sortedAnecdotes)
  })

  afterEach(() => cleanup())
})
