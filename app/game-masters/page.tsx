import { fetchGames, fetchGMs } from "@/lib/queries";
import { GAMES, GMS } from "@/lib/data";
import GameMastersClient from "./GameMastersClient";

export const dynamic = "force-dynamic";

export default async function GameMastersPage() {
  let gms, games;
  try {
    [gms, games] = await Promise.all([fetchGMs(), fetchGames()]);
  } catch {
    gms = GMS;
    games = GAMES;
  }
  return <GameMastersClient gms={gms} games={games} />;
}
