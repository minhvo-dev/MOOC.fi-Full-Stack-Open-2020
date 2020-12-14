import React, { useState } from "react";
import {
  Route,
  Switch,
  Link,
  useRouteMatch,
  useHistory
} from "react-router-dom";

import { useField } from "./hooks/index";


const Menu = () => {
  const padding = {
    paddingRight: 5
  };

  return (
    <div>
      <Link to="/" style={padding}>anecdotes</Link>
      <Link to="/create" style={padding}>create new</Link>
      <Link to="/about" style={padding}>about</Link>
    </div>
  );
};

const Anecdote = ({ anecdote }) => {
  return (
    <div>
      <h3>{anecdote.content}</h3>
      <div>has {anecdote.votes} votes</div>
      <div>for more info see <a href={anecdote.info}>{anecdote.info}</a></div>
    </div>
  );
};

const AnecdoteList = ({ anecdotes }) => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <ul>
        {anecdotes.map(anecdote =>
          <li key={anecdote.id}>
            <Link to={`/anecdotes/${anecdote.id}`}>
              {anecdote.content}
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
};

const About = () => {
  return (
    <div>
      <h2>About anecdote app</h2>
      <p>According to Wikipedia:</p>

      <em>
        An anecdote is a brief, revealing account of an individual person or an incident.
        Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
        such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
        An anecdote is "a story with a point."
      </em>

      <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
    </div>
  );
};

const Footer = () => {
  return (
    <div>
      Dinh Tue Minh Vo - 2020
    </div>
  );
};

const CreateNew = (props) => {
  // const [content, setContent] = useState("");
  // const [author, setAuthor] = useState("");
  // const [info, setInfo] = useState("");
  const content = useField("text");
  const author = useField("text");
  const info = useField("url");

  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    });
    history.push("/");
  };

  const handleReset = (event) => {
    content.onReset();
    author.onReset();
    info.onReset();
  };

  return (
    <div>
      <h2>Create a new anecdote</h2>
      <form onSubmit={handleSubmit} onReset={handleReset}>
        <div>
          content
          <input {...content} />
        </div>

        <div>
          author
          <input {...author} />
        </div>

        <div>
          Url for more info
          <input {...info} />
        </div>

        <button type="submit">create</button>
        <button type="reset">reset</button>
      </form>
    </div>
  );
};

const Notification = ({ notification }) => {
  if (notification === undefined) {
    return null;
  }

  return (
    <div>{notification}</div>
  );
};

let timeoutId = undefined;

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ]);

  const [notification, setNotification] = useState("");

  const displayNotification = (message, timeout) => {
    if (timeoutId !== undefined) {
      clearTimeout(timeoutId)
    }
    timeoutId = setNotification(message);
    setTimeout(() => {
      setNotification(undefined);
      timeoutId = undefined;
    }, timeout * 1_000);
  };

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10_000).toFixed(0);
    setAnecdotes(anecdotes.concat(anecdote));
    displayNotification(`a new anecdote: ${anecdote.content} created!`, 10);
  };

  const anecdoteById = (id) => anecdotes.find(a => a.id === id);

  const vote = (id) => {
    const anecdote = anecdoteById(id);

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    };

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a));
  };

  const match = useRouteMatch("/anecdotes/:id");
  const anecdote = match
    ? anecdotes.find(a => a.id === match.params.id)
    : null;

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      <Notification notification={notification} />

      <Switch>
        <Route path="/anecdotes/:id">
          <Anecdote anecdote={anecdote} />
        </Route>

        <Route path="/about">
          <About />
        </Route>

        <Route path="/create">
          <CreateNew addNew={addNew} />
        </Route>

        <Route path="/">
          <AnecdoteList anecdotes={anecdotes} />
        </Route>
      </Switch>

      <Footer />
    </div>
  );
};

export default App;