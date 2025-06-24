function Chain() {
  const student = {
    profile: {
      grades: {
        math: "A",
      },
    },
  };

  if (
    student &&
    student.profile &&
    student.profile.grades &&
    student.profile.grades.math
  ) {
    console.log("a");
  }
  if (student?.profile?.grades.math) {
    console.log("a");
  }

  return <></>;
}

export default Chain;

// https://rules.sonarsource.com/typescript/clean-code-attribute/intentionality/RSPEC-6582/
// https://typescript-eslint.io/rules/prefer-optional-chain
