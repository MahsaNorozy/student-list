import React, { useState } from "react";

export function MyComponent() {
  const [count, update] = useState(0); // Noncompliant
  return (
    <>
      <div onClick={() => update(count + 1)}>{count}</div>

      <input type="text" />
      <label>Favorite food</label>
    </>
  );
}

// 1 Bug, 3 Code Smells
// Link zum Lesen: https://rules.sonarsource.com/typescript/type/Code%20Smell/RSPEC-6754/
// https://rules.sonarsource.com/typescript/type/Code%20Smell/RSPEC-6853/
