function UnnecessaryCharacterEscapes() {
  const greeting = "Hello\, user!";

  const foo = "hol\a";
  const bar = `${foo}\!`;

  return <div>{greeting}</div>;
}

export default UnnecessaryCharacterEscapes;

// https://rules.sonarsource.com/typescript/clean-code-attribute/intentionality/RSPEC-6535/
// https://eslint.org/docs/latest/rules/no-useless-escape
