import anecdoteService from "../services/anecdotes";

// const anecdotesAtStart = [
//   "If it hurts, do it more often",
//   "Adding manpower to a late software project makes it later!",
//   "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
//   "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
//   "Premature optimization is the root of all evil.",
//   "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it."
// ];

// const getId = () => (100_000 * Math.random()).toFixed(0);

// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0
//   };
// };

// const initialState = anecdotesAtStart.map(asObject);

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const anecdote = await anecdoteService.createNew(content);
    dispatch({
      type: "NEW_ANECDOTE",
      data: anecdote
    });
  };
};

export const voteAnecdote = (id) => {
  return async (dispatch, getState) => {
    const anecdote = getState().anecdotes.find(anecdote => anecdote.id === id);
    const updatedAnecdote = {
      ...anecdote,
      votes: anecdote.votes + 1
    };
    const response = await anecdoteService.update(updatedAnecdote);
    dispatch({
      type: "VOTE_ANECDOTE",
      data: response
    });
  };
};

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch({
      type: "INIT_ANECDOTES",
      data: anecdotes
    });
  };
};

const reducer = (state = [], action) => {
  switch (action.type) {
    case "VOTE_ANECDOTE":
      const updatedAnecdote = action.data;
      return state.map(anecdote =>
        anecdote.id !== updatedAnecdote.id
          ? anecdote
          : updatedAnecdote);
    case "NEW_ANECDOTE":
      return [...state, action.data];
    case "INIT_ANECDOTES":
      return action.data;
    default:
      return state;
  }
};

export default reducer;