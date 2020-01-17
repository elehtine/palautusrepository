import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => (
  <h1>{props.course}</h1>
)

const Content = (props) => {
  const [first, second, third] = props.parts
  return (
    <div>
      <Part part={first.name} exercises={first.exercises} />
      <Part part={second.name} exercises={second.exercises} />
      <Part part={third.name} exercises={third.exercises} />
    </div>
  )
}

const Part = (props) => (
  <p>
    {props.part} {props.exercises}
  </p>
)

const Total = (props) => {
  let sum = 0;
  props.parts.forEach(part => sum += part.exercises)
  return (
    <p>Number of exercises {sum}</p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
