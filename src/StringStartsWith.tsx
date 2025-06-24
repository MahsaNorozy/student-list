function StringStartsWith() {
  const str = "abc";
  if (str[0] === "a") {
    console.log("maintainability issue");
  }

  return <div></div>;
}

export default StringStartsWith;

// https://rules.sonarsource.com/typescript/impact/maintainability/RSPEC-6557/
