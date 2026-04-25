import { Suspense } from "react";
import { fetchGames, fetchGMs } from "@/lib/queries";
import { GAMES, GMS } from "@/lib/data";
import GamesPageInner from "./GamesPageInner";

export const dynamic = "force-dynamic";

export default async function GamesPage() {
  let games, gms;
  try {
    [games, gms] = await Promise.all([fetchGames(), fetchGMs()]);
  } catch {
    games = GAMES;
    gms = GMS;
  }
  return (
    <Suspense>
      <GamesPageInner initialGames={games} gms={gms} />
    </Suspense>
  );
}
