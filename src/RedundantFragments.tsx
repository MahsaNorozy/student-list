function Foo() {
  return <span>Test</span>;
}

export function RedundantFragments() {
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

// 3 Code Smells: A fragment with only one child is redundant, Passing a fragment to an HTML element is useless.
// Link zum Lesen: https://rules.sonarsource.com/typescript/type/Code%20Smell/RSPEC-6749/
