import React from 'react'
import { useSelector } from 'react-redux'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'

const App = () => {
  const notification = useSelector(state => state.notification)
  return (
    <div>
      <h2>Anecdotes</h2>
      <div>{notification}</div>
      <AnecdoteForm />
      <AnecdoteList />
    </div>
  )
}

export default App
