import React from "react";

const ArrayReduce: React.FC = () => {
  function sum(xs: number[]) {
    return xs.reduce((accccc, currenttttt) => accccc + currenttttt); // Noncompliant
  }
  console.log(sum([1, 2, 3, 4, 5])); // Prints 15
  console.log(sum([])); // TypeError: Reduce of empty array with no initial value

  return <></>;
};

export default ArrayReduce;
