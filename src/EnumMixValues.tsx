function EnumMixValues() {
  enum Color {
    Red, // 0 by default
    Green = 1,
    Blue = "blue",
  }

  return <div>{Color.Blue}</div>;
}

export default EnumMixValues;

// https://rules.sonarsource.com/typescript/clean-code-attribute/intentionality/RSPEC-6583/
