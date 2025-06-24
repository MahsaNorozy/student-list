import { useState } from "react";

export function MyComponent() {
  const [count, update] = useState(0);
  return <button onClick={() => update(count + 1)}>{count}</button>;
}

// Link zum Lesen: https://rules.sonarsource.com/typescript/type/Code%20Smell/RSPEC-6754/
