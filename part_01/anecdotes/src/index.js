import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Header = ({ text }) => (<h2>{text}</h2>);

const Button = ({ text, onClick }) => (
  <button onClick={onClick}>{text}</button>
);

const App = ({ anecdotes }) => {
  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0));

  const getRandomAnecdote = () => setSelected(getRandomNumberLessThan(anecdotes.length));

  const voteAnecdote = () => {
    let cpy = [...points];
    ++cpy[selected];
    setPoints(cpy);
  }

  let maxPointAnecdoteIndex = 0;
  points.forEach((value, index, arr) => {
    if (value > arr[maxPointAnecdoteIndex]) {
      maxPointAnecdoteIndex = index;
    }
  });

  return (
    <>
      <Header text="Anecdote of the day" />
      <div>{anecdotes[selected]}</div>
      <div>has {points[selected]} votes</div>
      <Button text="vote" onClick={voteAnecdote} />
      <Button text="next anecdote" onClick={getRandomAnecdote} />
      <Header text="Anecdote with most votes" />
      <div>{anecdotes[maxPointAnecdoteIndex]}</div>
    </>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it."
];

const getRandomNumberLessThan = (n) => Math.floor(Math.random() * n);

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById("root")
);