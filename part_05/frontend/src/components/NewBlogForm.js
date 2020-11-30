import React, { useState } from "react";
import PropTypes from "prop-types";

const NewBlogForm = ({ handleNewBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const addNewBlog = (event) => {
    event.preventDefault();

    const newBlog = {
      title,
      author,
      url
    };

    handleNewBlog(newBlog);

    // clean the form
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  const handleTitleOnChange = (event) => {
    setTitle(event.target.value);
  };

  const handleAuthorOnChange = (event) => {
    setAuthor(event.target.value);
  };

  const handleUrlOnChange = (event) => {
    setUrl(event.target.value);
  };

  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={addNewBlog}>
        <div>
          Title:
          <input
            id="title"
            type="text"
            value={title}
            name="Title"
            onChange={handleTitleOnChange}
          />
        </div>
        <div>
          Author:
          <input
            id="author"
            type="text"
            value={author}
            name="Author"
            onChange={handleAuthorOnChange}
          />
        </div>
        <div>
          Url:
          <input
            id="url"
            type="text"
            value={url}
            name="Url"
            onChange={handleUrlOnChange}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

NewBlogForm.propTypes = {
  handleNewBlog: PropTypes.func.isRequired
};

NewBlogForm.displayName = "NewBlogForm";

export default NewBlogForm;