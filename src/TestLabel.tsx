import React from "react";

const TestLabel: React.FC = () => {
  const str = "abc"; str[0] === "a";

  const hello = "Hello";
  enum Foo {
    STRING = hello, // Variable
    OBJECT = { hello }.hello.length, // Object
    TEMPLATE = `${hello}, World`, // Template literal
    SET = new Set([hello, "world"]).size, // Constructor
    NUMBER = hello.length + 1, // Expression
  }

  enum Foo2 {
    STRING = "Hello",
    NUMBER = 0,
  }

  

  return (
    <>
      <input type="text" />
      <label>Favorite food</label>
    </>
  );
};

function Blog(props) {
  return (
    <ul>
      {props.posts.map((post) =>
        <li key={Math.random()}> <!-- Noncompliant: Since the 'key' will be different on each render, React will update the DOM unnecessarily -->
          {post.title}
        </li>
      )}
    </ul>
  );
}

export default TestLabel;

// https://rules.sonarsource.com/typescript/type/Code%20Smell/RSPEC-6853/ has one code smell
