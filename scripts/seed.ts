import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";
import { GMS, GAMES } from "../lib/data";

config({ path: ".env.local" });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

async function seed() {
  const gmRows = GMS.map((gm) => ({
    id: gm.id,
    name: gm.name,
    avatar: gm.avatar,
    bio: gm.bio,
    pronouns: gm.pronouns,
    years_experience: gm.yearsExperience,
    rating: gm.rating,
    review_count: gm.reviewCount,
    price_per_session: gm.pricePerSession,
    games_hosted: gm.gamesHosted,
    timezone: gm.timezone,
    languages: gm.languages,
    identity_tags: gm.identityTags,
    systems: gm.systems,
    themes: gm.themes,
    platforms: gm.platforms,
    highlights: gm.highlights,
    response_time: gm.responseTime,
    response_rate: gm.responseRate,
    years_on_platform: gm.yearsOnPlatform,
    social: gm.social,
  }));

  const { error: gmError } = await supabase.from("game_masters").upsert(gmRows);
  if (gmError) throw new Error(`GMs: ${gmError.message}`);
  console.log(`Seeded ${gmRows.length} game masters`);

  const gameRows = GAMES.map((game) => ({
    id: game.id,
    title: game.title,
    system: game.system,
    category: game.category,
    gm_id: game.gm.id,
    date_time: game.dateTime,
    total_seats: game.totalSeats,
    seats_available: game.seatsAvailable,
    price_per_session: game.pricePerSession,
    short_description: game.shortDescription,
    full_description: game.fullDescription,
    tags: game.tags,
    duration: game.duration,
  }));

  const { error: gameError } = await supabase.from("games").upsert(gameRows);
  if (gameError) throw new Error(`Games: ${gameError.message}`);
  console.log(`Seeded ${gameRows.length} games`);
}

seed().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
