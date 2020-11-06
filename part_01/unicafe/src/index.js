import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Header = ({ text }) => (<h2>{text}</h2>);

const Button = ({ onClick, text }) => (<button onClick={onClick}>{text}</button>);

const Statistic = ({ name, stat = "", unit = "" }) => (
  <tr>
    <td>{name}</td>
    <td>{stat} {unit}</td>
  </tr>
);

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;

  let average = (good - bad) / all;
  average = Math.round(average * 10) / 10;

  let positive = good / all * 100;
  positive = Math.round(positive * 10) / 10;

  return (
    <table>
      <tbody>
        <Statistic name="good" stat={good} />
        <Statistic name="neutral" stat={neutral} />
        <Statistic name="bad" stat={bad} />
        <Statistic name="all" stat={all} />
        <Statistic name="average" stat={average} />
        <Statistic name="positive" stat={positive} unit="%" />
      </tbody>
    </table>
  );
}

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleClicks = (handler, currentCount) => () => handler(currentCount + 1);

  if (good + neutral + bad === 0) {
    return (
      <>
        <Header text="give feedback" />
        <Button onClick={handleClicks(setGood, good)} text="good" />
        <Button onClick={handleClicks(setNeutral, neutral)} text="neutral" />
        <Button onClick={handleClicks(setBad, bad)} text="bad" />
        <Header text="statistics" />
        <div>No feedback given</div>
      </>
    );
  }

  return (
    <>
      <Header text="give feedback" />
      <Button onClick={handleClicks(setGood, good)} text="good" />
      <Button onClick={handleClicks(setNeutral, neutral)} text="neutral" />
      <Button onClick={handleClicks(setBad, bad)} text="bad" />
      <Header text="statistics" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById("root")
);