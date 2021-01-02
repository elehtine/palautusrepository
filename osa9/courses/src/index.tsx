import React from "react";
import ReactDOM from "react-dom";

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartBaseDescription extends CoursePartBase {
  description: string;
};

interface CoursePartOne extends CoursePartBaseDescription {
  name: "Fundamentals";
}

interface CoursePartTwo extends CoursePartBase {
  name: "Using props to pass data";
  groupProjectCount: number;
}

interface CoursePartThree extends CoursePartBaseDescription {
  name: "Deeper type usage";
  exerciseSubmissionLink: string;
}

interface CoursePartFour extends CoursePartBaseDescription {
  name: "Own course";
  difficulty: string;
}

type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | CoursePartFour;

const App: React.FC = () => {
  const courseName = "Half Stack application development";

  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev"
    },
    {
      name: "Own course",
      exerciseCount: 100,
      description: "long course",
      difficulty: "hard",
    }
  ];

  return (
    <div>
      <Header name={courseName} />
      <Content courseParts={courseParts} />
      <Total parts={courseParts} />
    </div>
  );
};

const Header: React.FC<{ name: string }> = ({ name }) => {
  return (
    <h1>{name}</h1>
  );
};

const Content: React.FC<{ courseParts: CoursePart[] }> = ({ courseParts }) => {
  return (
    <div>
      {courseParts.map(p => <Part part={p} key={p.name}/> )}
    </div>
  );
};

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part: React.FC<{ part: CoursePart }> = ({ part }) => {
  switch (part.name) {
    case "Fundamentals":
      return <p>{part.name} {part.exerciseCount}</p>;
    case "Using props to pass data":
      return <p>{part.name} {part.exerciseCount} {part.groupProjectCount}</p>;
    case "Deeper type usage":
      return <p>{part.name} {part.exerciseCount} {part.description} {part.exerciseSubmissionLink}</p>;
    case "Own course":
      return <p>{part.name} {part.exerciseCount} {part.description} <strong>difficulty:</strong> {part.difficulty}</p>;
    default:
      return assertNever(part);
  }
};

const Total: React.FC<{ parts: CoursePart[] }> = ({ parts }) => {
  return (
    <p>
      Number of exercises{" "}
      {parts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
  );
};


ReactDOM.render(<App />, document.getElementById("root"));
