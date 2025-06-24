import React from "react";

const NonInteractivElements: React.FC = () => {
  return (
    <>
      <li onClick={() => void 0} />
      <div onClick={() => void 0} role="listitem" />

      <input onClick={() => void 0} type="text" />
      <button className="foo" onClick={() => void 0} />
    </>
  );
};

export default NonInteractivElements;

// https://rules.sonarsource.com/typescript/impact/maintainability/RSPEC-6847/
