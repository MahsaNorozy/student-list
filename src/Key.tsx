import { useState } from "react";

function Key() {
  const initialPosts = [
    { id: 1, title: "React Hooks" },
    { id: 2, title: "JavaScript Closures" },
    { id: 3, title: "Functional Programming" },
  ];

  const [posts, setPosts] = useState(initialPosts);

  const sortAlphabetically = () => {
    const sorted = [...posts].sort((a, b) => a.title.localeCompare(b.title));
    setPosts(sorted);
  };

  return (
    <div>
      <button onClick={sortAlphabetically}>Sort Alphabetically</button>
      <ul>
        {posts.map((post, index) => (
          <li>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default Key;

// https://www.npmjs.com/package/eslint-plugin-react jsx-key
// https://rules.sonarsource.com/typescript/type/Code%20Smell/RSPEC-6477/
