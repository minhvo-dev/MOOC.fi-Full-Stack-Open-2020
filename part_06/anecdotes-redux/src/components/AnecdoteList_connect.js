import React from "react";
import { connect } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const Anecdote = ({ anecdote, handleVote }) => {
  return (
    <div>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={handleVote}>vote</button>
      </div>
    </div>
  );
};

const AnecdoteList = (props) => {
  const anecdotes = props.anecdotes;

  const handleVote = (anecdote) => {
    props.voteAnecdote(anecdote.id);
    props.setNotification(`you voted '${anecdote.content}'`, 5);
  };

  return (
    <div>
      {anecdotes.map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleVote={() => { handleVote(anecdote); }}
        />)
      }
    </div>
  );
};

const mapStateToProps = (state) => ({
  anecdotes: state.anecdotes
    .filter(anecdote =>
      anecdote.content.toLowerCase().includes(
        state.filter.toLowerCase()
      )
    )
    .sort((a, b) => -(a.votes - b.votes))
});


const mapDispatchToProps = {
  voteAnecdote,
  setNotification
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList);