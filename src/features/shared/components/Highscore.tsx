import { useState, useEffect } from "react";
// should maybe live inside a useHighscore instead.

type Skills = {
  overall: number;
  attack: number;
  defence: number;
  strength: number;
  hitpoints: number;
  ranged: number;
  prayer: number;
  magic: number;
  cooking: number;
  woodcutting: number;
  fletching: number;
  fishing: number;
  firemaking: number;
  crafting: number;
  smithing: number;
  mining: number;
  herblore: number;
  agility: number;
  thieving: number;
  slayer: number;
  farming: number;
  runecrafting: number;
  hunter: number;
  construction: number;
};
type User = {
  name: string;
  score: number;
  rank: number;
  skills?: Skills;
};

const ApiUrl: string = "/api/hiscore?table=0&category=0&size=50";
function Highscore() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchTop50 = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch(ApiUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          signal: controller.signal,
        });
        if (!response.ok) {
          throw new Error(`Request failed: ${response.status}`);
        }
        const users = (await response.json()) as User[];
        console.log(users);
        setUsers(users);
      } catch (e) {
        if ((e as Error).name === "AbortError") {
          return;
        }
        setError((e as Error).message);
      }
    };

    fetchTop50();
    return () => controller.abort();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error: {error}</p>;
  }
  return (
    <ul>
      {users.map((u) => (
        <li key={u.rank}>
          {u.rank}. {u.name} — {u.score}
        </li>
      ))}
    </ul>
  );
}

export { Highscore };
