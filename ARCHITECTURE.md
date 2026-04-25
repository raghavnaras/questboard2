# QuestBoard Webpage Architecture

## Overview

QuestBoard is a Next.js App Router web application that provides:
- a marketing landing page,
- a game-browsing page with client-side filters (game type/category, system, seats), GM pre-filtering via query params, and a join/registration action,
- a game-masters directory with a detailed GM profile modal,
- a mock client-side authentication system (sign up / sign in) gating the app,
- supporting static pages (become a pro DM, contact, privacy, terms).

The current implementation is a frontend-only app. There is no backend API and no server-side database; all "persistence" (accounts, sign-in session, seat counts, joined games) is stored in `localStorage` in the browser.

## Runtime and Framework

- Next.js `16.2.4` with App Router
- React `19.2.4`
- TypeScript `^5`
- Tailwind CSS v4 (`@tailwindcss/postcss`)
- ESLint `^9` + `eslint-config-next`
- Fonts: `Geist` and `Geist_Mono` via `next/font/google`

## Project Structure

- `app/`
  - `layout.tsx`: Root HTML/body wrapper, global metadata, font setup, mounts the client-side `AuthProvider`.
  - `globals.css`: Tailwind v4 entrypoint and global styles.
  - `page.tsx`: Landing/marketing homepage (`/`). Auth-gated client component.
  - `games/page.tsx`: Interactive games browser (`/games`). Auth-gated client component with filters and modal.
  - `game-masters/page.tsx`: GM directory (`/game-masters`). Auth-gated client component with GM profile modal.
  - `login/page.tsx`: Sign-in page.
  - `signup/page.tsx`: Sign-up page.
  - `become-a-pro-dungeon-master/page.tsx`: Marketing page for prospective professional GMs.
  - `contact/page.tsx`, `privacy/page.tsx`, `terms/page.tsx`: Static informational pages.
- `components/`
  - `AuthProvider.tsx`: Client context provider exposing current user, readiness flag, `refresh`, and `signOut`.
  - `Header.tsx`: Top navigation with user avatar dropdown and sign-out.
  - `Footer.tsx`: Site footer.
  - `GameCard.tsx`: Card view for each game.
  - `GameModal.tsx`: Detailed game modal with join action.
  - `GMModal.tsx`: Full GM profile modal opened from the GM directory.
  - `FilterBar.tsx`: System and seat filter controls.
  - `MyGames.tsx`: "Joined games" summary list.
- `lib/`
  - `data.ts`: Domain models (`GM`, `Game`, `GameSystem`, `GameCategory`), category display metadata (`CATEGORY_STYLES`, `GAME_CATEGORIES`), and seed datasets (`GMS`, `GAMES`).
  - `store.ts`: Client-side `useGameStore()` hook — owns games list, joined IDs, join action, and localStorage persistence.
  - `auth.ts`: Client-side mock auth — account storage, current user session, `signIn`, `signUp`, `getInitials`.
  - `useRequireAuth.ts`: Client hook that redirects to `/login` when no session is present.

## Route Architecture

### `/` (Homepage)
- Client component (`"use client"`), auth-gated via `useRequireAuth()`.
- Renders `Header`, hero, system chips, benefits grid, FAQ, bottom CTA, pro-DM CTA, and `Footer`.
- Uses only static content constants (`BENEFITS`, `SYSTEMS`) — does not read from `lib/store.ts` or `lib/data.ts`.

### `/games`
- Client component, auth-gated.
- Wrapped in a `<Suspense>` boundary because it consumes `useSearchParams()`.
- Uses `useGameStore()` for games, `joinedGameIds`, `joinGame`, `myGames`, `hydrated`.
- Query params:
  - `?gm=<gmId>` — if present, filters the games list to that GM and displays a "Clear filter" chip. Resolves the GM from `GMS` for the heading.
- Local UI state:
  - `selectedGame: Game | null`
  - `systemFilter: string | null`
  - `categoryFilter: GameCategory | null`
  - `seatsFilter: number`
- Derived state:
  - `filteredGames` via `useMemo` combining `gmFilter`, `systemFilter`, `categoryFilter`, and `seatsFilter`.
  - `currentSelectedGame` re-hydrated from the live `games` array so the modal reflects real-time seat counts.
- Renders nothing until both `ready && user` (auth) and `hydrated` (store) are true to avoid hydration mismatch.
- Child composition: `Header`, `MyGames`, `FilterBar`, a grid of `GameCard`s, and a conditional `GameModal`.

### `/game-masters`
- Client component, auth-gated.
- Reads static `GMS` and `GAMES` directly from `lib/data.ts`.
- Computes per-GM "open games" count at render time (`GAMES.filter(... seatsAvailable > 0)`).
- Opens `GMModal` with full profile details when a GM card is clicked.

### `/login` and `/signup`
- Client component pages that call `signIn()` / `signUp()` from `lib/auth.ts`.
- On success, store the user in `localStorage` and navigate into the app.

### `/become-a-pro-dungeon-master`, `/contact`, `/privacy`, `/terms`
- Static client/server pages using `Header` and `Footer` for consistent chrome.

## Auth Flow

1. `AuthProvider` mounts in `app/layout.tsx` and, on mount, reads `questboard:currentUser` from `localStorage` into React state, then flips `ready = true`.
2. Any auth-gated route calls `useRequireAuth()`:
   - If `ready && !user`, it `router.replace("/login")`.
   - The page short-circuits its render (`return null`) until `ready && user`.
3. `/login` and `/signup` submit to `signIn(email, password)` or `signUp(name, email, password)`:
   - Accounts live in `questboard:accounts` (with a hard-coded `SEED` account for demo: `alex@test.com` / `password`).
   - On success, `setCurrentUser` writes `questboard:currentUser`.
4. `Header` exposes a sign-out button that calls `signOut()` on the auth context, clearing the current user and redirecting to `/login`.

Note: this is a mock/demo auth implementation only. Passwords are stored in plaintext in `localStorage`. There is no backend verification.

## State and Data Flow

- Primary data source: `GAMES` and `GMS` constants in `lib/data.ts`.
- Game state (`useGameStore()`):
  - `games: Game[]` — seeded from `GAMES` and overlaid with any persisted `seatsAvailable` from `questboard:seatCounts`.
  - `joinedGameIds: Set<string>` — hydrated from `questboard:registrations`.
  - `myGames: Game[]` — derived as `games.filter(g => joinedGameIds.has(g.id))`.
  - `hydrated: boolean` — flips true after the first client-side `useEffect` reads `localStorage`, so consumers can avoid rendering before hydration.
  - `joinGame(id)` — decrements `seatsAvailable` (floor 0), adds the id to the joined set, and persists both to `localStorage`.
- Ownership boundaries:
  - `/games` is the only route that consumes `useGameStore()`.
  - `/game-masters` and `/` read static imports from `lib/data.ts` directly — their "open seats" counts are based on the original `GAMES` seed, not on live mutations.
- Persistence (all client-side, `localStorage` keys):
  - `questboard:currentUser` — active session user `{ name, email }`.
  - `questboard:accounts` — array of known accounts including password.
  - `questboard:registrations` — array of joined game ids.
  - `questboard:seatCounts` — map of `gameId -> seatsAvailable`.
- Persistence is per-browser; there is no server, no DB, no cross-device sync, and no API routes.

## Component and Interaction Flow

- `Header` is rendered on every authed/static page. It shows nav links plus a user avatar dropdown with sign-out when a user is present, otherwise a "Sign in" link.
- `GameCard` renders compact game metadata and triggers selection on click.
- `GameModal` shows full details, GM highlights, and a join button. It closes on Escape key or backdrop click.
- `GMModal` shows a full GM profile: bio, identity tags, systems, themes, platforms, highlights, response metrics, and a link to filter games by that GM (`/games?gm=<id>`).
- `FilterBar` updates system/seat filter values via callback props.
- `MyGames` renders only when joined games exist.
- Join flow on `/games`:
  1. User opens a game from the grid or from `MyGames`.
  2. User clicks join in `GameModal`.
  3. `joinGame(gameId)` decrements `seatsAvailable` in store state, adds the id to `joinedGameIds`, and writes both to `localStorage`.
  4. The modal's `currentSelectedGame` is re-derived from the updated `games` list so it immediately reflects the new seat count.
  5. The card grid and `MyGames` re-render from the updated in-memory state.

## Data Models (All Domain Models)

All domain model definitions are in `lib/data.ts`.

### `GameSystem` (Type Alias)
- Type: `string` (open-ended alias).
- The seed data uses free-form values such as `"D&D 5e"`, `"Pathfinder 2e"`, `"Pathfinder 1e"`, `"Call of Cthulhu"`, `"Blades in the Dark"`, `"Vampire: The Masquerade"`, `"Mothership"`, `"Cyberpunk Red"`, `"Lancer"`, `"Old-School Essentials"`, `"Deadlands"`, `"Hunter: The Reckoning"`, and others.

### `GameCategory` (Type Alias)
- Closed string union describing the *kind of play experience* a game offers. Orthogonal to `GameSystem`.
- Values: `"Action"`, `"Adventure"`, `"Horror"`, `"Mystery"`, `"Drama"`, `"Comedy"`, `"Sci-Fi"`.
- `GAME_CATEGORIES: GameCategory[]` exposes the canonical ordered list for UI enumeration.
- `CATEGORY_STYLES: Record<GameCategory, { emoji: string; className: string }>` provides shared display metadata (emoji + Tailwind badge classes) consumed by `FilterBar`, `GameCard`, and `GameModal` to keep styling consistent.

### `GM` (Interface)
- `id: string`
- `name: string`
- `avatar: string` (initials, rendered in a colored circle)
- `bio: string` (multi-paragraph, `\n\n`-separated)
- `pronouns: string`
- `yearsExperience: number`
- `rating: number`
- `reviewCount: number`
- `pricePerSession: number`
- `gamesHosted: number`
- `timezone: string`
- `languages: string[]`
- `identityTags: string[]`
- `systems: string[]`
- `themes: string[]`
- `platforms: string[]` (e.g., Roll20, Foundry VTT, Discord)
- `highlights: string[]`
- `responseTime: string`
- `responseRate: string`
- `yearsOnPlatform: number`
- `social: { twitch?: string; youtube?: string; twitter?: string; instagram?: string }`

### `Game` (Interface)
- `id: string`
- `title: string`
- `system: GameSystem`
- `category: GameCategory` (primary play-style classification — shown as a badge and used by the category filter)
- `gm: GM` (nested object — the game carries its GM inline)
- `dateTime: string` (ISO date-time string)
- `totalSeats: number`
- `seatsAvailable: number`
- `pricePerSession: number`
- `shortDescription: string`
- `fullDescription: string`
- `tags: string[]` (free-form labels, secondary to `category`)
- `duration: string`

### `User` (Interface, in `lib/auth.ts`)
- `name: string`
- `email: string`
- Stored accounts additionally carry a `password: string` in `localStorage`.

### Seed Collections
- `GMS: GM[]` — 20 seeded game masters.
- `GAMES: Game[]` — 20 seeded games, each referencing a GM by object from `GMS`.

## View Models and UI-Level Data Shapes

These are not centralized interfaces, but they behave as models at the page/component level:

- `BENEFITS` and `SYSTEMS` in `app/page.tsx` — home-page content model for static marketing sections.
- `AuthContextValue` in `components/AuthProvider.tsx` — `{ user, ready, refresh, signOut }`.
- `joinedGameIds` in `lib/store.ts` — `Set<string>` for O(1) membership checks.
- `myGames` in `lib/store.ts` — derived `Game[]` subset where `joinedGameIds` contains `game.id`.
- FAQ entries in `app/page.tsx` — inline `{ q, a }` literals rendered as `<details>` accordions.

## LocalStorage Keys (Contract)

| Key                         | Shape                                      | Writer                          | Reader(s)                              |
|-----------------------------|--------------------------------------------|---------------------------------|----------------------------------------|
| `questboard:currentUser`    | `User \| null` (JSON)                      | `setCurrentUser`, `clearCurrentUser` | `AuthProvider`, `getCurrentUser`  |
| `questboard:accounts`       | `Array<User & { password: string }>`       | `signUp`                        | `getAccounts` (used by `signIn`)       |
| `questboard:registrations`  | `string[]` (game ids)                      | `useGameStore.joinGame`         | `useGameStore` (on mount)              |
| `questboard:seatCounts`     | `Record<string, number>`                   | `useGameStore.joinGame`         | `useGameStore` (on mount)              |

## Current Constraints and Notable Gaps

- No backend: no API routes, no database, no server actions. All mutation lives in `localStorage`.
- Auth is demonstrative only — plaintext passwords in `localStorage` and a hardcoded seed account. Not safe for production.
- Cross-route state: `/game-masters` and `/` read the static `GAMES` constant, not `useGameStore`, so their "open games" counts do not reflect joins made in `/games`.
- Single device: all persistence is per-browser; clearing site data wipes accounts, joins, and seat counts.
- `Game.gm` is an embedded object, not a foreign key — if a GM's details change, they must be updated in both `GMS` and within every `GAMES[i].gm`.
- `GameSystem` is an open `string` alias, so typos in systems are not caught by TypeScript and system filter values depend on exact string matches with the seed data. `GameCategory` is a closed union and is type-checked.
- `Game.category` is a single value (not multi-select) — a game is classified as exactly one primary type. Secondary themes still live in the free-form `tags` array.
- No booking/payment/schedule conflict logic yet; "joining" simply decrements a seat counter locally.
- No server-rendered SEO for auth-gated pages — they render `null` until client auth hydrates.
