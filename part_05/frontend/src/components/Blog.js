import React, { useState } from "react";
import config from "../configs/config";
import PropTypes from "prop-types";

const Blog = ({
  blog,
  likeBlog,
  removeBlog
}) => {
  const [visible, setVisibility] = useState(false);

  const blogStyle = {
    padding: 2,
    margin: 5,
    border: "solid",
    borderWidth: 1
  };

  const toggleVisibility = () => {
    setVisibility(!visible);
  };

  const handleLikeOnClick = async () => {
    await likeBlog(blog);
  };

  const handleRemoveOnClick = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      await removeBlog(blog);
    }
  };

  const getUsername = () => {
    const user = JSON.parse(window.localStorage.getItem(config.LOGGED_USER_CREDENTIALS_NAME));
    return user.username;
  };

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>{visible ? "hide" : "show"}</button>
      </div>
      {visible
        && <div className="divTest">
          <div>{blog.url}</div>
          <div>
            likes {blog.likes}
            <button
              className="likeButton"
              onClick={handleLikeOnClick}>
              like
            </button>
          </div>
          <div>{blog.user.name}</div>
          {blog.user.username === getUsername()
            && <div><button
              className="removeButton"
              onClick={handleRemoveOnClick}>
              remove
            </button></div>
          }
        </div>}
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  likeBlog: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired
};

Blog.displayName = "Blog";

export default Blog;