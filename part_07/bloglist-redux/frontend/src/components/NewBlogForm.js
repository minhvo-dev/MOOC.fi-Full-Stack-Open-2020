import React from "react";
import { useDispatch } from "react-redux";
import { createNewBlog } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";
import { useField } from "../hooks";

import { Form, Button } from "react-bootstrap";

const NewBlogForm = ({ formToggle }) => {
  const title = useField("text");
  const author = useField("text");
  const url = useField("text");

  const dispatch = useDispatch();

  const addNewBlog = (event) => {
    event.preventDefault();
    try {
      dispatch(createNewBlog({
        title: title.value,
        author: author.value,
        url: url.value
      }));

      dispatch(setNotification({
        message: `a new blog ${title.value} by ${author.value} added`,
        style: "success"
      }));

      // clean the form
      title.onReset();
      author.onReset();
      url.onReset();

      // collapse the form
      formToggle.current.toggleVisibility();
    }
    catch (error) {
      dispatch(setNotification({
        message: error.message,
        style: "error"
      }))
    }
  };

  return (
    <div>
      <h2>Create new</h2>
      <Form onSubmit={addNewBlog}>
        <Form.Group>
          <Form.Label>Title:</Form.Label>
          <Form.Control {...title}/>
          <Form.Label>Author:</Form.Label>
          <Form.Control {...author} />
          <Form.Label>Url</Form.Label>
          <Form.Control {...url} />
          <Button type="submit">create</Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default NewBlogForm;