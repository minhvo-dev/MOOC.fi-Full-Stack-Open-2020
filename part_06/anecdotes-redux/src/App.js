import React, { useEffect } from "react";
import AnecdoteForm from "./components/AnecdoteForm";
// import AnecdoteList from "./components/AnecdoteList";
// import Notification from "./components/Notification";
// import Filter from "./components/Filter";
import Notification from "./components/Notification_connect";
import AnecdoteList from "./components/AnecdoteList_connect";
import Filter from "./components/Filter_connect";
import { useDispatch } from "react-redux";
import { initializeAnecdotes } from "./reducers/anecdoteReducer";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initializeAnecdotes());
  }, [dispatch]);

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdoteList />
      <h2>Create new</h2>
      <AnecdoteForm />
    </div>
  );
};

export default App;