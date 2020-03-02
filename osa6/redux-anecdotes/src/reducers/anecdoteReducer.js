import anecdoteService from '../services/anecdotes'

export const addVoteTo = (id, anecdote) => {
  return async dispatch => {
    const votedAnecdote = await anecdoteService.vote(id, {
      ...anecdote,
      votes: anecdote.votes + 1
    })

    console.log(votedAnecdote)

    dispatch({
      type: 'VOTE',
      data: votedAnecdote
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    })
  }
}

const compareAnecdotes = (a, b) => {
  return b.votes - a.votes
}

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE':
      const anecdote = action.data
      console.log(anecdote)
      const id = anecdote.id
      return state.map(a => a.id !== id ? a : anecdote)
        .sort(compareAnecdotes)
    case 'INIT_ANECDOTES':
      return action.data
    case 'NEW_ANECDOTE':
      return [...state, action.data]
        .sort(compareAnecdotes)
    default:
      console.log('state now: ', state)
      console.log('action', action)
      return state
  }
}

export default anecdoteReducer
