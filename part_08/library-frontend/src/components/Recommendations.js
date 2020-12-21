import React, { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_BOOKS_BY_GENRE } from "../queries";

const Recommendations = ({ show, user }) => {
  const [favoriteBooks, setFavoriteBooks] = useState([]);
  const [getFavoriteBooks, result] = useLazyQuery(GET_BOOKS_BY_GENRE);

  useEffect(() => {
    if (user) {
      getFavoriteBooks({
        variables: {
          genre: user.favoriteGenre
        }
      });
      if (result.data) {
        setFavoriteBooks(result.data.allBooks);
      }
    }
  }, [user, result.data]); // eslint-disable-line

  if (!show) {
    return null;
  }

  return (
    <div>
      <h2>Recommendations</h2>
      <div><strong>{user.favoriteGenre}</strong> books</div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {favoriteBooks.map(book =>
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>)}
        </tbody>
      </table>
    </div>
  );
};

export default Recommendations;