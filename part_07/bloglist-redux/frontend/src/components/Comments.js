import React from "react";
import { useField } from "../hooks";

import { Form, Button } from "react-bootstrap";

const Comments = ({ comments, handleAddComment }) => {
  const comment = useField("text");

  const onSubmit = async () => {
    await handleAddComment(comment.value);
    comment.onReset();
  }

  return (
    <div>
      <h3>comments</h3>
      <Form onSubmit={onSubmit}>
        <Form.Group>
          <Form.Control {...comment} />
          <Button type="submit">add comment</Button>
        </Form.Group>
      </Form>
      <ul>
        {comments.map(c => <li key={c.id}>{c.content}</li>)}
      </ul>
    </div>
  );
};

export default Comments;