import React from "react";

const Total = ({ course }) => (
  <div>
    <strong>
      total of {course.parts.reduce(
      (acc, cur) => acc + cur.exercises,
      0)} exercises
    </strong>
  </div>
);

export default Total;