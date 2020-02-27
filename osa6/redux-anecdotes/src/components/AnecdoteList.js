import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addVoteTo } from '../reducers/anecdoteReducer'

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <div>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => handleClick()}>vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state.anecdotes)

  return (
    <div>
      {anecdotes.map(a =>
        <Anecdote 
          key={a.id}
          anecdote={a} 
          handleClick={() => dispatch(addVoteTo(a.id))}
        />
      )}
    </div>
  )
}

export default AnecdoteList
