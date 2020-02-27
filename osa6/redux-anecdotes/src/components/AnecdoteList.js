import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addVoteTo } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

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
  const { anecdotes, notification, filter } = useSelector(state => state)

  const handleVote = (anecdote) => {
    dispatch(addVoteTo(anecdote.id))
    dispatch(setNotification(`you voted '${anecdote.content}'`))
    setTimeout(() => {
      dispatch(setNotification(null))
    }, 5000)
  }

  return (
    <div>
      {anecdotes
        .filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
        .map(a =>
        <Anecdote 
          key={a.id}
          anecdote={a} 
          handleClick={() => handleVote(a)}
        />
      )}
    </div>
  )
}

export default AnecdoteList
