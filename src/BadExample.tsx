import React, { useState } from "react"; // `useState` is unused

// Bad
const handleInputChange = (event: any) => {
  console.log(event.target.value);
};

// Bad
const quantityApples = 5;
const priceApple = 5;
const quantityBananas = 5;
const priceBanana = 5;

const totalApplesPrice: number = quantityApples * priceApple - 5;
const totalBananasPrice: number = quantityBananas * priceBanana - 5;

export default function BadExample() {
  const [isActive, setIsActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isActive2, setIsActive2] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const [isVisible2, setIsVisible2] = useState(false);

  const MyComponent = () => {
    const [data, setData] = useState<any>(null);
  };

  enum PaymentStatus {
    Pending,
    Processing,
    Completed,
  }

  const posts = [
    {
      id: 1,
      title: "How to write clean react code",
    },
    {
      id: 2,
      title: "Eat, sleep, code, repeat",
    },
  ];

  return (
    <main>
      <nav>
        <h1>App</h1>
      </nav>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
      <input
        type="text"
        placeholder="Type something…"
        onChange={handleInputChange} // ← this “calls” the handler
      />
    </main>
  );
}

function getName(x?: string | UserName) {
  if (x) {
    console.log("Getting name for " + x!); // Noncompliant

    if (typeof x === "string")
      return x as string; // Noncompliant
    else return (x as UserName).name; // Noncompliant
  }
  return "NoName";
}
