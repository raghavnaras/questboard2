import { fetchGames, fetchGMs } from "@/lib/queries";
import GameMastersClient from "./GameMastersClient";

export default async function GameMastersPage() {
  const [gms, games] = await Promise.all([fetchGMs(), fetchGames()]);
  return <GameMastersClient gms={gms} games={games} />;
}
