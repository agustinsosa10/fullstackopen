import React from "react";

const Total = ({ parts }) => {

  const total = parts.reduce( (sum, part) => sum + part.exercises, 0)
  return (
    <div>
      <h3>Number of exercises {total}</h3>
    </div>
  );
};

export default Total;
