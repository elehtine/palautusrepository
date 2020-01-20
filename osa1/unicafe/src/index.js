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

const Statistics = (props) => {
  const count = props.good + props.neutral + props.bad
  const sum = props.good - props.bad
  
  return (
    <div>
        <h1>statistics</h1>
        <Count count={props.good} prefix='good' />
        <Count count={props.neutral} prefix='neutral' />
        <Count count={props.bad} prefix='bad' />
        <Count count={props.count} prefix='all' />
        <Count count={sum / count} prefix='average' />
        <Count count={100 * props.good / count} prefix='positive' suffix='%' />
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

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
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
      />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
