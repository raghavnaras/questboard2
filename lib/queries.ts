import { getSupabase } from "./supabase";
import { Game, GM } from "./data";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function rowToGM(row: any): GM {
  return {
    id: row.id,
    name: row.name,
    avatar: row.avatar,
    bio: row.bio,
    pronouns: row.pronouns,
    yearsExperience: row.years_experience,
    rating: row.rating,
    reviewCount: row.review_count,
    pricePerSession: row.price_per_session,
    gamesHosted: row.games_hosted,
    timezone: row.timezone,
    languages: row.languages,
    identityTags: row.identity_tags,
    systems: row.systems,
    themes: row.themes,
    platforms: row.platforms,
    highlights: row.highlights,
    responseTime: row.response_time,
    responseRate: row.response_rate,
    yearsOnPlatform: row.years_on_platform,
    social: row.social,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function rowToGame(row: any): Game {
  return {
    id: row.id,
    title: row.title,
    system: row.system,
    category: row.category,
    gm: rowToGM(row.gm),
    dateTime: row.date_time,
    totalSeats: row.total_seats,
    seatsAvailable: row.seats_available,
    pricePerSession: row.price_per_session,
    shortDescription: row.short_description,
    fullDescription: row.full_description,
    tags: row.tags,
    duration: row.duration,
  };
}

export async function fetchGames(): Promise<Game[]> {
  const { data, error } = await getSupabase()
    .from("games")
    .select("*, gm:game_masters(*)")
    .order("date_time", { ascending: true });

  if (error) throw new Error(`fetchGames: ${error.message}`);
  return data.map(rowToGame);
}

export async function fetchGMs(): Promise<GM[]> {
  const { data, error } = await getSupabase()
    .from("game_masters")
    .select("*")
    .order("name", { ascending: true });

  if (error) throw new Error(`fetchGMs: ${error.message}`);
  return data.map(rowToGM);
}
