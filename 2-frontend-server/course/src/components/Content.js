import React from "react";
import Part from "./Part";

const Content = ({ parts }) => {
  return (
    <>
      <ul>
        {parts.map((part) => (
          <Part part={part.name} exercises={part.exercises} />
        ))}
      </ul>
    </>
  );
};

export default Content;
