import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import reducer from "./reducer";

const store = createStore(reducer);

const App = () => {
  const good = () => {
    store.dispatch({
      type: "GOOD"
    });
  }

  const neutral = () => {
    store.dispatch({
      type: "OK"
    });
  };

  const bad = () => {
    store.dispatch({
      type: "BAD"
    });
  };

  const reset = () => {
    store.dispatch({
      type: "ZERO"
    });
  };

  const getAll = () => {
    return store.getState().good + store.getState().ok + store.getState().bad;
  };

  const getAverage = () => {
    const all = getAll();
    if (all !== 0) {
      let average = (store.getState().good - store.getState().bad) / all;
      return Math.round(average * 10) / 10;
    }
    return 0;
  }

  const getPositive = () => {
    const all = getAll();
    if (all !== 0) {
      let pos = store.getState().good / all * 100;
      return Math.round(pos * 10) / 10;
    }
    return 0;
  };

  return (
    <div>
      <button onClick={good}>good</button>
      <button onClick={neutral}>neutral</button>
      <button onClick={bad}>bad</button>
      <button onClick={reset}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>neutral {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
      <div>all {getAll()}</div>
      <div>average {getAverage()}</div>
      <div>positive {getPositive()}%</div>
    </div>
  );
};

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById("root"));
};

renderApp();
store.subscribe(renderApp);