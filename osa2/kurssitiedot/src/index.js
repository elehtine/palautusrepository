import React from 'react'
import ReactDOM from 'react-dom'

const Course = ({ course }) => (
  <div>
    <Header name={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </div>
)

const Header = ({ name }) => (
  <h1>{name}</h1>
)

const Total = ({ parts }) => {
  const total = parts.reduce( (s, p) => (s + p.exercises), 0)
  return (
    <div>
      <b>total of {total} exercises</b>
    </div>
  )
}

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(part => 
          <Part 
            key={part.id} 
            part={part}
          />
        )
      }
    </div>
  )
}

const Part = ({ part }) => (
  <p>
    {console.log(part.name)}
    {part.name} {part.exercises}
  </p>
)

const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
