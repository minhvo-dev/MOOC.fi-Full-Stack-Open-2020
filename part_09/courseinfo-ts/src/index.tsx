import React from "react";
import ReactDOM from "react-dom";

import Header from "./components/Header";
import Content from "./components/Content";
import Total from "./components/Total";

import courseParts from "../data/courseParts";

const App: React.FC = () => {
  const courseName = "Half Stack application development";

  return (
    <div>
      <Header courseName={courseName} />
      <Content courseParts={courseParts} />
      <Total courses={courseParts} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));