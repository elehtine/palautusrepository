import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Anecdote = ({index}) => (
  <div>
    <p>{anecdotes[index]}</p>
  </div>
)

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(
    Array.apply(null, new Array(anecdotes.length)).map(Number.prototype.valueOf,0)
  )

  const handleNext = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
    console.log(votes)
  }

  const handleVote = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)  
  }

  const bestAnecdote = () => {
    let best = 0
    for (let i = 0; i < anecdotes.length; i++) {
      if (votes[i] > votes[best]) {
        best = i
      }
    }
    return best
  }

  return (
    <div>
      <div>
        <h1>Anecdote of the day</h1>
        <Anecdote index={selected} />
        <p>has {votes[selected]} votes</p>
        <button onClick={handleVote} >
          vote 
        </button>
        <button onClick={handleNext} >
          next anecdote
        </button>
      </div>
      <div>
        <h1>Anecdote with most votes</h1>
        <Anecdote index={bestAnecdote()} />
        <p>has {votes[selected]} votes</p>
      </div>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
)
