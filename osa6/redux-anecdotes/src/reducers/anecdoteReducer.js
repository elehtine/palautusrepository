export const addVoteTo = (id) => {
  return {
    type: 'VOTE',
    data: {
      id
    }
  }
}

export const initializeAnecdotes = (data) => {
  return {
    type: 'INIT_ANECDOTES',
    data
  }
}

export const createAnecdote = (anecdote) => {
  return {
    type: 'NEW_ANECDOTE',
    anecdote
  }
}

const compareAnecdotes = (a, b) => {
  return b.votes - a.votes
}

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE':
      const id = action.data.id
      const anecdoteToChange = state.find(a => a.id === id)
      const changedAnecdote = {
        ...anecdoteToChange, 
        votes: anecdoteToChange.votes + 1
      }
      return state.map(a => a.id !== id ? a : changedAnecdote)
        .sort(compareAnecdotes)
    case 'INIT_ANECDOTES':
      return action.data
    case 'NEW_ANECDOTE':
      return [...state, action.anecdote]
        .sort(compareAnecdotes)
    default:
      console.log('state now: ', state)
      console.log('action', action)
      return state
  }
}

export default anecdoteReducer
