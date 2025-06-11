import React from "react";

const TestCodeSmells: React.FC = () => {
  const handleClick = () => {
    // Non‑compliant loop – intentionally written this way for testing S888
    for (let i = 1; i != 10; i += 2) {
      console.log(i);
      //  When i reaches 9, the next value becomes 11, so `i != 10` remains true → infinite loop
      if (i > 1000) break; // safeguard to avoid locking the tab while testing
    }
  };

  return (
    <div className="p-4">
      <button
        className="rounded-xl border px-4 py-2 shadow-md"
        onClick={handleClick}
      >
        Test for‑loop
      </button>
    </div>
  );
};

export default TestCodeSmells;
