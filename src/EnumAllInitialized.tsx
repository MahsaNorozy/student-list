function EnumAllInitialized() {
  enum Digit {
    Zero,
    One,
    Nine = 9,
  }

  return <div>{Digit.Zero}</div>;
}

export default EnumAllInitialized;

// https://rules.sonarsource.com/typescript/clean-code-attribute/intentionality/RSPEC-6572/
