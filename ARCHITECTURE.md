# QuestBoard Webpage Architecture

## Overview

QuestBoard is a Next.js App Router web application that provides:
- a marketing landing page,
- a game-browsing page with client-side filters and join actions,
- a game-masters directory page.

The current implementation is a frontend-only app with static seed data and in-memory client state (no backend API and no database persistence).

## Runtime and Framework

- Next.js `16.2.4` with App Router
- React `19.2.4`
- TypeScript
- Tailwind CSS v4
- ESLint + `eslint-config-next`

## Project Structure

- `app/`
  - `layout.tsx`: Root HTML/body wrapper, global metadata, global font setup.
  - `page.tsx`: Landing/marketing homepage (`/`).
  - `games/page.tsx`: Interactive games browser (`/games`) with filters and modal.
  - `game-masters/page.tsx`: GM listing page (`/game-masters`).
- `components/`
  - `GameCard.tsx`: Card view for each game.
  - `GameModal.tsx`: Detailed game modal and join action.
  - `FilterBar.tsx`: System and seat filter controls.
  - `MyGames.tsx`: Joined games summary list.
- `lib/`
  - `data.ts`: Domain models and seed datasets.
  - `store.ts`: Client-side state hook for games and joined state.

## Route Architecture

### `/` (Homepage)
- Server component route.
- Uses static content constants (benefits/system labels) and navigation links.
- Does not read from `lib/store.ts`.

### `/games`
- Client component route (`"use client"`).
- Uses `useGameStore()` from `lib/store.ts`.
- Local UI state:
  - `selectedGame: Game | null`
  - `systemFilter: GameSystem | null`
  - `seatsFilter: number`
- Derived state:
  - `filteredGames` via `useMemo`
  - `currentSelectedGame` re-hydrated from current `games` state
- Child composition:
  - `MyGames`
  - `FilterBar`
  - multiple `GameCard`
  - conditional `GameModal`

### `/game-masters`
- Server component route.
- Reads static `GMS` and `GAMES` directly from `lib/data.ts`.
- Computes per-GM game stats at render time (e.g., open games count).

## Component and Interaction Flow

- `GameCard` renders compact game metadata and triggers selection on click.
- `GameModal` shows full details, GM profile, and join button. It closes on Escape key or backdrop click.
- `FilterBar` updates system/seat filter values via callback props.
- `MyGames` renders only when joined games exist.
- Join flow on `/games`:
  1. User opens a game.
  2. User clicks join in modal.
  3. `joinGame(gameId)` decrements `seatsAvailable` in local state and records joined ID.
  4. UI re-renders card, modal, and My Games section from updated in-memory state.

## State and Data Flow

- Primary data source: `GAMES` and `GMS` constants in `lib/data.ts`.
- State ownership:
  - `/games` uses `useGameStore()` to create local state from `GAMES`.
  - `/game-masters` and `/` do not consume this mutable state; they read static imports directly.
- Persistence:
  - No database.
  - No API routes.
  - No localStorage/sessionStorage persistence.
  - State resets on page refresh.

## Data Models (All Domain Models)

All domain model definitions are in `lib/data.ts`.

### `GameSystem` (Type Alias)
- Type: string union
- Allowed values:
  - `"D&D 5e"`
  - `"Pathfinder 2e"`
  - `"Call of Cthulhu"`
  - `"Blades in the Dark"`
  - `"Vampire: the Masquerade"`
  - `"Starfinder"`
  - `"Mothership"`

### `GM` (Interface)
- `id: string`
- `name: string`
- `avatar: string`
- `bio: string`
- `pronouns: string`
- `yearsExperience: number`
- `rating: number`
- `reviewCount: number`
- `pricePerSession: number`
- `gamesHosted: number`

### `Game` (Interface)
- `id: string`
- `title: string`
- `system: GameSystem`
- `gm: GM`
- `dateTime: string` (ISO date-time string)
- `totalSeats: number`
- `seatsAvailable: number`
- `pricePerSession: number`
- `shortDescription: string`
- `fullDescription: string`
- `tags: string[]`
- `duration: string`

### Seed Collections
- `GMS: GM[]` — static dataset of game masters.
- `GAMES: Game[]` — static dataset of games with nested `gm` objects.

## View Models and UI-Level Data Shapes

These are not centralized interfaces, but they behave as models at the page/component level:

- `PLAYER` constant in `app/games/page.tsx`
  - Shape: `{ name: string; avatar: string }`
  - Purpose: mock signed-in player display in header.

- `joinedGameIds` in `lib/store.ts`
  - Type: `Set<string>`
  - Purpose: stores joined game IDs for quick membership checks.

- `myGames` in `lib/store.ts`
  - Type: `Game[]`
  - Purpose: derived subset of games where `joinedGameIds` contains `game.id`.

- `BENEFITS` and `SYSTEMS` in `app/page.tsx`
  - Home-page content model for static marketing sections.

## Current Constraints and Notable Gaps

- `/game-masters` links to `/games?gm=<id>`, but `/games` does not consume query params, so GM pre-filtering is not implemented.
- Seat joins are not synchronized across routes/pages because only `/games` uses mutable state.
- No auth/user identity model beyond mocked `PLAYER`.
- No booking/order/payment model yet.
- No backend contract model (DTOs/API schemas) because no API layer exists.
