import React from 'react';
import ReactDOM from 'react-dom';

const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  );
}

const Part = (props) => {
  return (
    <p>{props.part.name} {props.part.exercises}</p>
  );
}

const Content = (props) => {
  return (
    <>
      <Part part={props.parts[0]} />
      <Part part={props.parts[1]} />
      <Part part={props.parts[2]} />
    </>
  );
}

const Total = (props) => {
  return (
    <p>Number of exercises {props.parts.reduce((acc, cur) => acc + cur.exercises, 0)}</p>
  );
}

const App = () => {
  const course = "Half Stack application development";
  const parts = [
    {
      name: "Fundamentals of React",
      exercises: 10
    },
    {
      name: "Using props to pass data",
      exercises: 7
    },
    {
      name: "State of a component",
      exercises: 14
    }
  ]

  return (
    <>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));