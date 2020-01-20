import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Count = ({count, prefix, suffix}) => (
  <div>
    {prefix} {count} {suffix}
  </div>
)

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const count = good + neutral + bad
  const sum = good - bad

  return (
    <div>
      <h1>give feedback</h1>
      <Button
        handleClick={() => setGood(good + 1)}
        text='good'
      />
      <Button
        handleClick={() => setNeutral(neutral + 1)}
        text='neutral'
      />
      <Button
        handleClick={() => setBad(bad + 1)}
        text='bad'
      />
      <h1>statistics</h1>
      <Count count={good} prefix='good' />
      <Count count={neutral} prefix='neutral' />
      <Count count={bad} prefix='bad' />
      <Count count={count} prefix='all' />
      <Count count={sum / count} prefix='average' />
      <Count count={good / count} prefix='positive' suffix='%' />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
