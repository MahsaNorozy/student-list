import { useEffect, useState } from "react";

async function fetchUser(): Promise<User> {
  // Simuliere einen Netzwerk-Request mit Delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id: 1, name: "John Doe" });
    }, 1000); // 1 Sekunde Verzögerung
  });
}

export default function UserProfile() {
  const [user, setUser] = useState<null | User>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  useEffect(() => {
    fetchUser()
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!user) return <div>No user found</div>;

  return <div>{user.name}</div>;
}

type User = {
  id: number;
  name: string;
};
