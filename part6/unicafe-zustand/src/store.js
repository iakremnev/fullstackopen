import { create } from 'zustand'

const useVoteStore = create(set => ({
  votes: {
    good: 0,
    neutral: 0,
    bad: 0
  },
  actions: {
    voteGood: () => set(state => ({votes: { ...state.votes, good: state.votes.good + 1 }})),
    voteNeutral: () => set(state => ({votes: { ...state.votes, neutral: state.votes.neutral + 1 }})),
    voteBad: () => set(state => ({votes: { ...state.votes, bad: state.votes.bad + 1 }})),
  }
}))

export const useVotes = () => useVoteStore(state => state.votes)
export const useVotesActions = () => useVoteStore(state => state.actions)
