function TestEnum() {
  enum E {
    A = 0,
    B = 0,
  }
  return <div>{E.A}</div>;
}

export default TestEnum;

// https://rules.sonarsource.com/typescript/RSPEC-6578/
// https://typescript-eslint.io/rules/no-duplicate-enum-values
