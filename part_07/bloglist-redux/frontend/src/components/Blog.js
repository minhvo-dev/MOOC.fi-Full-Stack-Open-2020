import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { likeBlog, removeBlog, addComment } from "../reducers/blogReducer";

import { Button } from "react-bootstrap";
import Comments from "./Comments";

const Blog = () => {
  const id = useParams().id;
  const blogs = useSelector(state => state.blogs);
  const blog = blogs.find(b => b.id === id);
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  const handleLikeOnClick = () => {
    dispatch(likeBlog(blog));
  };

  const handleRemoveOnClick = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(removeBlog(blog))
    }
  };

  if (!blog) {
    return null;
  }

  const createNewComment = async (comment) => {
    dispatch(addComment(blog, comment));
  };

  return (
    <div>
      <h2>{blog.title} {blog.author}</h2>
      <div>
        <a href={blog.url}>{blog.url}</a>
      </div>
      <div>
        {blog.likes} likes <Button onClick={handleLikeOnClick} variant="success">like</Button>
      </div>
      <div>
        added by {blog.user.name}
      </div>
      {user.username === blog.user.username &&
        <div>
          <Button onClick={handleRemoveOnClick} variant="danger">
            remove
          </Button>
        </div>}

      <Comments
        comments={blog.comments}
        handleAddComment={createNewComment}
      />
    </div>
  );

};

export default Blog;