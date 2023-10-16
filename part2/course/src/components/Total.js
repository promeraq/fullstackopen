import React from "react";

const Total = ({ parts }) => {
  // En cada iteración, suma el número de ejercicios del elemento actual (part.exercises) al acumulador.
  // El segundo argumento de reduce (0 en este caso) es el valor inicial del acumulador.
  const total = parts.reduce((accumulator, part) => {
    return accumulator + part.exercises;
  }, 0);
  return (
    <>
      <p>Number of exercises {total}</p>
    </>
  );
};

export default Total;
