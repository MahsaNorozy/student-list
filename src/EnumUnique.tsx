function EnumUnique() {
  enum Gender {
    Diverse = 2,
    Female = 0,
    Male = 0,
    Unknown = 3,
  }

  return <div>{Gender.Female}</div>;
}

export default EnumUnique;

// https://rules.sonarsource.com/typescript/RSPEC-6578/
// https://typescript-eslint.io/rules/no-duplicate-enum-values
