import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries";
import Select from "react-select";

const BirthYearForm = ({ show, authors }) => {
  const [born, setBorn] = useState("");
  const [selectedAuthor, setSelectedAuthor] = useState(null);

  const options = authors.map(author => {
    return {
      value: author.name,
      label: author.name
    }
  });

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [
      {
        query: ALL_AUTHORS
      }
    ]
  });

  const onSubmit = async (event) => {
    event.preventDefault();

    await editAuthor({
      variables: {
        name: selectedAuthor.value,
        born
      }
    });

    setBorn("");
  };

  if (!show) {
    return null;
  }

  return (
    <div>
      <h3>Set birth year</h3>

      <form onSubmit={onSubmit}>
        <div>
          name <Select
            defaultValue={selectedAuthor}
            onChange={setSelectedAuthor}
            options={options}
          />
        </div>
        <div>
          born <input
            type="number"
            value={born}
            onChange={({ target }) => { setBorn(Number(target.value)); }}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default BirthYearForm;