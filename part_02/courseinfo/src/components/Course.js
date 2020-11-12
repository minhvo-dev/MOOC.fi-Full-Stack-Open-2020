import React from "react";
import Header from "./Header"
import Part from "./Part"
import Total from "./Total"

const Course = ({ course }) => {
  return (
    <div>
      <Header text={course.name} />
      {course.parts.map(part =>
        <Part key={part.id} name={part.name} exercises={part.exercises} />)}
      <Total course={course}/>
    </div>
  )
}

export default Course;