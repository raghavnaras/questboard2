import { Suspense } from "react";
import { fetchGames, fetchGMs } from "@/lib/queries";
import GamesPageInner from "./GamesPageInner";

export default async function GamesPage() {
  const [games, gms] = await Promise.all([fetchGames(), fetchGMs()]);
  return (
    <Suspense>
      <GamesPageInner initialGames={games} gms={gms} />
    </Suspense>
  );
}
