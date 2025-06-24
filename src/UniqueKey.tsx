function UniqueKey() {
  const posts = [
    { id: 1, title: "Erster Post" },
    { id: 2, title: "Zweiter Post" },
    { id: 3, title: "Dritter Post" },
  ];

  return (
    <ul>
      {posts.map((post) => (
        <li key={Math.random()}>{post.title}</li>
      ))}
    </ul>
  );
}

export default UniqueKey;

// https://rules.sonarsource.com/typescript/type/Code%20Smell/RSPEC-6486/ has one code smell
// Noncompliant: Since the 'key' will be different on each render, React will update the DOM unnecessarily -->
