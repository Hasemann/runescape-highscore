import { useState, useEffect } from "react";
// should maybe live inside a useHighscore instead.
import { useFetch } from "../hooks/useFetch";
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
  const { data: users, isLoading, error } = useFetch<User[]>(ApiUrl);

  const controller = new AbortController();

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error: {error}</p>;
  }
  return (
    <ul>
      {users?.map((u) => (
        <li key={u.rank}>
          {u.rank}. {u.name} — {u.score}
        </li>
      ))}
    </ul>
  );
}

export { Highscore };
