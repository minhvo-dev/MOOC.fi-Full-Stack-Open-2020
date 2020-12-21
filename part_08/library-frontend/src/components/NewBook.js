import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_BOOK } from "../queries";

const NewBook = ({ show, updateCacheWithNewBook }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [published, setPublished] = useState("");
  const [genre, setGenre] = useState("");
  const [genres, setGenres] = useState([]);

  const [addBook] = useMutation(ADD_BOOK, {
    onError: (error) => {
      console.log(error);
    },
    update: (store, response) => {
      updateCacheWithNewBook(response.data.addBook)
    }
  });

  if (!show) {
    return null;
  }

  const submit = async (event) => {
    event.preventDefault();

    await addBook({
      variables: {
        title,
        author,
        published,
        genres
      }
    });

    setTitle("");
    setPublished("");
    setAuthor("");
    setGenre("");
    setGenres([]);
  }

  const addGenre = () => {
    setGenres(genres.concat(genre));
    setGenre("");
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title <input
            value={title}
            onChange={({ target }) => { setTitle(target.value); }}
          />
        </div>
        <div>
          author <input
            value={author}
            onChange={({ target }) => { setAuthor(target.value); }}
          />
        </div>
        <div>
          published <input
            type="number"
            value={published}
            onChange={({ target }) => { setPublished(Number(target.value)); }}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => { setGenre(target.value); }}
          />
          <button type="button" onClick={addGenre}>add genre</button>
        </div>
        <div>
          genres: {genres.join(" ")}
        </div>
        <button type="submit">create book</button>
      </form>
    </div>
  );
};

export default NewBook;