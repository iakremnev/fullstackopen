import { it, beforeEach, describe, vi, expect, afterEach } from 'vitest'
import { renderHook, act, cleanup } from '@testing-library/react'

vi.mock('../services/anecdotes', () => ({
  default: {
    getAll: vi.fn()
  }
}))

import anecdoteService from '../services/anecdotes'
import useAnecdoteStore, { useAnecdotes, useAnecdoteActions } from './anecdotes'


describe('anecdote store', () => {

  beforeEach(async () => {
    useAnecdoteStore.setState({ anecdotes: [] })
  })

  it('initialized with data from server', async () => {
    const mockAnecdotes = [{ content: 'haha funny', id: 23, likes: 0 }]
    anecdoteService.getAll.mockResolvedValue(mockAnecdotes)

    const { result } = renderHook(() => useAnecdoteActions())
    await act(async () => await result.current.initialize())

    const { result: anecdotes } = renderHook(() => useAnecdotes())
    expect(anecdotes.current).toEqual(mockAnecdotes)
  })

  afterEach(() => cleanup())
})
