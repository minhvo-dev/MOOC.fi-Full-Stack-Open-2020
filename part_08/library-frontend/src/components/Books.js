import React, { useState } from "react";
import Select from "react-select";

const Books = ({ show, books }) => {
  const [booksToShow, setBooksToShow] = useState(books);

  let allGenres = new Set();
  books.forEach(book => {
    book.genres.forEach(genre => {
      allGenres.add(genre)
    });
  });
  allGenres = Array.from(allGenres).sort();

  const defaultOption = {
    value: null,
    label: "all genres"
  };
  const options = [defaultOption].concat(allGenres.map(genre => {
    return {
      value: genre,
      label: genre
    };
  }));

  const [selectedGenre, setSelectedGenre] = useState(defaultOption);

  const onChange = (selection) => {
    setSelectedGenre(selection);
    if (!selection.value) {
      setBooksToShow(books);
    }
    else {
      const booksToShow = books.filter(book => book.genres.includes(selection.value));
      setBooksToShow(booksToShow);
    }
  };

  if (!show) {
    return null;
  }

  return (
    <div>
      <h2>books</h2>
      <div>
        by genre:
        <Select
          defaultValue={selectedGenre}
          options={options}
          onChange={onChange}
        />
      </div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {booksToShow.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>

    </div>
  );
};

export default Books;