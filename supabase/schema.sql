create table game_masters (
  id text primary key,
  name text not null,
  avatar text not null,
  bio text not null,
  pronouns text not null,
  years_experience integer not null,
  rating numeric(3,1) not null,
  review_count integer not null,
  price_per_session integer not null,
  games_hosted integer not null,
  timezone text not null,
  languages text[] not null default '{}',
  identity_tags text[] not null default '{}',
  systems text[] not null default '{}',
  themes text[] not null default '{}',
  platforms text[] not null default '{}',
  highlights text[] not null default '{}',
  response_time text not null,
  response_rate text not null,
  years_on_platform integer not null,
  social jsonb not null default '{}'
);

create table games (
  id text primary key,
  title text not null,
  system text not null,
  category text not null,
  gm_id text not null references game_masters(id),
  date_time timestamptz not null,
  total_seats integer not null,
  seats_available integer not null,
  price_per_session integer not null,
  short_description text not null,
  full_description text not null,
  tags text[] not null default '{}',
  duration text not null
);
