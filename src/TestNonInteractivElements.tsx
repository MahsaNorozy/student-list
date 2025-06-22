import React from "react";

const TestNonInteractivElements: React.FC = () => {
  return (
    <>
      <li onClick={() => void 0} />
      <div onClick={() => void 0} role="listitem" />
    </>
  );
};

export default TestNonInteractivElements;

// https://rules.sonarsource.com/typescript/impact/maintainability/RSPEC-6847/
