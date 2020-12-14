import React, { useState, useEffect } from "react";
import axios from "axios";

const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange
  };
};

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    axios
    .get(baseUrl)
    .then(response => {
      setResources(response.data)
    });
  }, [baseUrl]);

  const create = (resource) => {
    axios
      .post(baseUrl, resource)
      .then(response => {
        setResources(resources.concat(response.data));
      })
      .catch(error => {
        console.log(error);
      });
  };

  const service = {
    create
  }

  return [
    resources,
    service
  ];
};

const App = () => {
  const content = useField("text");
  const name = useField("text");
  const number = useField("text");

  const [notes, noteService] = useResource("http://localhost:3005/notes");
  const [people, personService] = useResource("http://localhost:3005/people");

  const handleNoteSubmit = (event) => {
    event.preventDefault();
    noteService.create({
      content: content.value
    });
  };

  const handlePersonSubmit = (event) => {
    event.preventDefault();
    personService.create({
      name: name.value,
      number: number.value
    });
  };

  return (
    <div>
      <h2>Notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...content} />
        <button type="submit">create</button>
      </form>
      {notes.map(n => <p key={n.id}>{n.content}</p>)}

      <h2>People</h2>
      <form onSubmit={handlePersonSubmit}>
        <div>
          name <input {...name} />
        </div>
        <div>
          number <input {...number} />
        </div>
        <button type="submit">create</button>
      </form>
      {people.map(p => <p key={p.id}>{p.name} {p.number}</p>)}
    </div>
  );
};

export default App;