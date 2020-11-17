import React from "react";

const People = ({ people, removePerson }) => (
  <div>
    {people.map(person =>
      <div key={person.id}>
        {person.name} {person.number} <button onClick={() => { removePerson(person) }}>remove</button>
      </div>)
    }
  </div >
)

export default People;