import { it, beforeEach, describe, vi, expect, afterEach } from 'vitest'
import { renderHook, act, cleanup } from '@testing-library/react'

vi.mock('../services/anecdotes', () => ({
  default: {
    getAll: vi.fn(),
    update: vi.fn()
  }
}))

import anecdoteService from '../services/anecdotes'
import useAnecdoteStore, { useAnecdotes, useAnecdoteActions } from './anecdotes'


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

  it('returns anecdotes in sorted order', () => {
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

  it('properly filters anecdotes', () => {
    const anecdotes = [
      {
        content: 'aaabbb',
        id: 23,
        votes: 10
      },
      {
        content: 'baab',
        id: 25,
        votes: 0
      },
      {
        content: 'bbbba',
        id: 26,
        votes: 5
      }
    ]
    const filterValue = 'aa'
    useAnecdoteStore.setState({ anecdotes })

    const { result: actions } = renderHook(() => useAnecdoteActions())
    act(() => actions.current.setFilter(filterValue))

    const { result: filteredAnecdotes } = renderHook(() => useAnecdotes())
    expect(filteredAnecdotes.current).toEqual(anecdotes.slice(0, 2))
  })

  it('voting increases number of votes', async () => {
    const mockAnecdote = { content: 'haha', id: 23, votes: 4 }
    const votedMockAnecdote = { ...mockAnecdote, votes: 5 }
    useAnecdoteStore.setState({ anecdotes: [mockAnecdote] })
    anecdoteService.update.mockResolvedValue(votedMockAnecdote)

    const { result: actions } = renderHook(() => useAnecdoteActions())
    await act(async () => await actions.current.vote(mockAnecdote.id))
    const { anecdotes } = useAnecdoteStore.getState()
    expect(anecdotes).toEqual([votedMockAnecdote])
  })

  afterEach(() => cleanup())
})
