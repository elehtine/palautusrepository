import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const StatisticsLine = ({count, prefix, suffix}) => (
  <tbody>
    <tr>
      <td>
        {prefix}
      </td>
      <td>
        {count}
      </td>
      <td>
        {suffix}
      </td>
    </tr>
  </tbody>
)

const Statistics = (props) => {
  const count = props.good + props.neutral + props.bad
  const sum = props.good - props.bad
  
  if (count === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }

  return (
    <table>
        <StatisticsLine count={props.good} prefix='good' />
        <StatisticsLine count={props.neutral} prefix='neutral' />
        <StatisticsLine count={props.bad} prefix='bad' />
        <StatisticsLine count={count} prefix='all' />
        <StatisticsLine count={sum / count} prefix='average' />
        <StatisticsLine count={100 * props.good / count} prefix='positive' suffix='%' />
    </table>
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
      <h1>statistics</h1>
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
