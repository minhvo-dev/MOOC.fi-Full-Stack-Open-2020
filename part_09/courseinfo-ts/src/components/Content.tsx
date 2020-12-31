import React from "react";
import { CoursePart } from "../types";
import Part from "./Part";

const Content: React.FC<{ courseParts: CoursePart[] }> = ({ courseParts }) => {
  return (
    <div>{courseParts.map(coursePart => <Part key={coursePart.name} coursePart={coursePart} />)}</div>
  );
};

export default Content;