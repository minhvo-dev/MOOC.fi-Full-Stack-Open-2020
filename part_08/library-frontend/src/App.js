import React, { useEffect, useState } from "react";

import { useApolloClient, useQuery, useSubscription } from "@apollo/client";
import { ALL_AUTHORS, ALL_BOOKS, BOOK_ADDED, GET_BOOKS_BY_GENRE } from "./queries";

import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import BirthYearForm from "./components/BirthYearForm";
import Recommendations from "./components/Recommendations";

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  const authorsQuery = useQuery(ALL_AUTHORS);
  const booksQuery = useQuery(ALL_BOOKS);

  const client = useApolloClient();

  const isObjectIn = (set, object) => set.map(e => e.id).includes(object.id);

  const updateCacheWithAuthor = (author) => {
    const authorsInCache = client.readQuery({
      query: ALL_AUTHORS
    });
    let newData = [];
    if (isObjectIn(authorsInCache.allAuthors, author)) {
      newData = authorsInCache.allAuthors.map(a => a.id === author.id ? author : a);
    }
    else {
      newData = authorsInCache.allAuthors.concat(author);
    }
    client.writeQuery({
      query: ALL_AUTHORS,
      data: {
        allAuthors: newData
      }
    });
  };

  const updateCacheWithNewBook = (book) => {
    // update all books query
    const booksInCache = client.readQuery({
      query: ALL_BOOKS
    });
    if (booksInCache.allBooks && !isObjectIn(booksInCache.allBooks, book)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: {
          allBooks: booksInCache.allBooks.concat(book)
        }
      });
    }
    // update author
    updateCacheWithAuthor(book.author);
    // update recommendations
    if (user && book.genres.includes(user.favoriteGenre)) {
      const recommendationsInCache = client.readQuery({
        query: GET_BOOKS_BY_GENRE,
        variables: {
          genre: user.favoriteGenre
        }
      });
      if (recommendationsInCache.allBooks && !isObjectIn(recommendationsInCache.allBooks, book)) {
        client.writeQuery({
          query: GET_BOOKS_BY_GENRE,
          variables: {
            genre: user.favoriteGenre
          },
          data: {
            allBooks: recommendationsInCache.allBooks.concat(book)
          }
        });
      }
    }
  };

  useEffect(() => {
    const token = sessionStorage.getItem("user-token");
    if (token) {
      setToken(token);
    }
  }, []);

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      alert(`new book added: ${subscriptionData.data.bookAdded.title}`);
      updateCacheWithNewBook(subscriptionData.data.bookAdded)
    }
  });

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  if (authorsQuery.loading || booksQuery.loading) {
    return <div>loading...</div>;
  }

  const navToPage = (page) => {
    return () => {
      setPage(page);
    }
  };

  return (
    <div>
      <div>
        <button onClick={navToPage("authors")}>authors</button>
        <button onClick={navToPage("books")}>books</button>
        {token
          ? <span>
            <button onClick={navToPage("add")}>add book</button>
            <button onClick={navToPage("editAuthor")}>edit author</button>
            <button onClick={navToPage("recommendations")}>recommend</button>
            <button onClick={logout}>logout</button>
          </span>
          : <button onClick={navToPage("login")}>login</button>
        }
      </div>

      <Authors show={page === "authors"} authors={authorsQuery.data.allAuthors} />
      <Books show={page === "books"} books={booksQuery.data.allBooks} />
      <NewBook show={page === "add"} updateCacheWithNewBook={updateCacheWithNewBook} />
      <BirthYearForm show={page === "editAuthor"} authors={authorsQuery.data.allAuthors} />
      <LoginForm show={page === "login"} setToken={setToken} setPage={setPage} setUser={setUser} />
      <Recommendations show={page === "recommendations"} user={user} />
    </div>
  );
};

export default App;