-- udemy_vibe schema: guestbook, likes, quotes, and RPC helpers

-- Enable pgcrypto for gen_random_uuid (already enabled in Supabase, but safe)
create extension if not exists pgcrypto;

-- Guestbook table
create table if not exists public.guestbook (
  id uuid primary key default gen_random_uuid(),
  name varchar(50) not null,
  message varchar(500) not null,
  created_at timestamptz not null default now()
);

-- Likes table
create table if not exists public.likes (
  target text primary key,
  count integer not null default 0,
  updated_at timestamptz not null default now()
);

-- Quotes table (optional; for recommendations)
create table if not exists public.quotes (
  id uuid primary key default gen_random_uuid(),
  text text not null,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

-- RPC: increment like atomically
create or replace function public.increment_like(like_target text)
returns integer
language sql
as $$
  insert into public.likes(target, count)
  values (like_target, 1)
  on conflict (target)
  do update set count = public.likes.count + 1, updated_at = now()
  returning count;
$$;

-- RPC: decrement like atomically (no negative)
create or replace function public.decrement_like(like_target text)
returns integer
language plpgsql
as $$
begin
  if exists (select 1 from public.likes where target = like_target) then
    update public.likes
    set count = greatest(count - 1, 0), updated_at = now()
    where target = like_target;
  else
    insert into public.likes(target, count) values (like_target, 0);
  end if;
  return (select count from public.likes where target = like_target);
end;
$$;

-- Optional: RLS policies (skip if you use service role key in server)
-- alter table public.guestbook enable row level security;
-- create policy "guestbook_select_public" on public.guestbook for select using (true);
-- create policy "guestbook_insert_public" on public.guestbook for insert with check (true);
-- alter table public.likes enable row level security;
-- create policy "likes_select_public" on public.likes for select using (true);
-- create policy "likes_update_public" on public.likes for update using (true) with check (true);
-- alter table public.quotes enable row level security;
-- create policy "quotes_select_public" on public.quotes for select using (active);