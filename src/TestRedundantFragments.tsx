import React from "react";

export function TestRedundantFragments() {
  return (
    <>
      <>
        <Foo />
      </>
      <p>
        <>foo</>
      </p>
    </>
  );
}

function Foo() {
  return <span>Test</span>;
}

// 3 Code Smells: A fragment with only one child is redundant, Passing a fragment to an HTML element is useless.
// Link zum Lesen: https://rules.sonarsource.com/typescript/type/Code%20Smell/RSPEC-6749/
