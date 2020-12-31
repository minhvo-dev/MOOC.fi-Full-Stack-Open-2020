import React from "react";
import { CourseEntry } from "../types";

const Total: React.FC<{courses: CourseEntry[]}> = ({courses}) => {
  return (
    <div>
      Number of exercises{" "}
      {courses.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </div>
  );
};

export default Total;