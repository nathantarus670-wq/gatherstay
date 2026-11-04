-- Initial database schema for GatherStay.
-- Run in Supabase SQL Editor after creating a project.
create extension if not exists pgcrypto;

create type public.app_role as enum ('customer','organizer','hotel_partner','checkin_staff','admin');
create type public.listing_status as enum ('draft','pending_review','published','rejected','archived');
create type public.order_status as enum ('pending','paid','failed','expired','partially_refunded','refunded');
create type public.ticket_status as enum ('valid','used','cancelled','refunded');
create type public.hotel_booking_status as enum ('pending','confirmed','cancelled','completed','failed');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null default '',
  email text,
  phone text,
  role public.app_role not null default 'customer',
  created_at timestamptz not null default now()
);

create table public.organizers (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.profiles(id),
  business_name text not null,
  verification_status text not null default 'pending',
  created_at timestamptz not null default now()
);

create table public.venues (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  address text not null,
  city text not null,
  province text not null,
  postal_code text,
  capacity integer check (capacity is null or capacity > 0),
  created_at timestamptz not null default now()
);

create table public.events (
  id uuid primary key default gen_random_uuid(),
  organizer_id uuid not null references public.organizers(id),
  venue_id uuid references public.venues(id),
  title text not null,
  slug text unique not null,
  description text not null default '',
  category text not null,
  start_at timestamptz not null,
  end_at timestamptz,
  image_url text,
  status public.listing_status not null default 'draft',
  created_at timestamptz not null default now()
);

create table public.ticket_types (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.events(id) on delete cascade,
  name text not null,
  price_cents integer not null check (price_cents >= 0),
  quantity_total integer not null check (quantity_total >= 0),
  quantity_sold integer not null default 0 check (quantity_sold >= 0),
  sales_start_at timestamptz,
  sales_end_at timestamptz,
  created_at timestamptz not null default now(),
  check (quantity_sold <= quantity_total)
);

create table public.orders (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references public.profiles(id),
  total_cents integer not null check (total_cents >= 0),
  currency char(3) not null default 'CAD' check (currency = 'CAD'),
  status public.order_status not null default 'pending',
  created_at timestamptz not null default now()
);

create table public.tickets (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  ticket_type_id uuid not null references public.ticket_types(id),
  qr_token_hash text unique not null,
  status public.ticket_status not null default 'valid',
  checked_in_at timestamptz,
  created_at timestamptz not null default now()
);

create table public.payments (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id),
  provider text not null,
  provider_reference text unique,
  amount_cents integer not null check (amount_cents >= 0),
  currency char(3) not null default 'CAD',
  status text not null default 'pending',
  created_at timestamptz not null default now()
);

create table public.hotels (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.profiles(id),
  name text not null,
  description text not null default '',
  address text not null,
  city text not null,
  province text not null,
  postal_code text,
  image_url text,
  status public.listing_status not null default 'draft',
  created_at timestamptz not null default now()
);

create table public.room_types (
  id uuid primary key default gen_random_uuid(),
  hotel_id uuid not null references public.hotels(id) on delete cascade,
  name text not null,
  max_guests integer not null check (max_guests > 0),
  quantity integer not null check (quantity >= 0)
);

create table public.room_rates (
  id uuid primary key default gen_random_uuid(),
  room_type_id uuid not null references public.room_types(id) on delete cascade,
  stay_date date not null,
  price_cents integer not null check (price_cents >= 0),
  available_quantity integer not null check (available_quantity >= 0),
  unique(room_type_id, stay_date)
);

create table public.hotel_bookings (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references public.profiles(id),
  hotel_id uuid not null references public.hotels(id),
  check_in date not null,
  check_out date not null,
  guest_count integer not null check (guest_count > 0),
  total_cents integer not null check (total_cents >= 0),
  currency char(3) not null default 'CAD',
  status public.hotel_booking_status not null default 'pending',
  created_at timestamptz not null default now(),
  check (check_out > check_in)
);

create table public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references public.profiles(id),
  action text not null,
  entity_type text not null,
  entity_id uuid,
  created_at timestamptz not null default now()
);

create index events_city_date_idx on public.events(start_at);
create index hotels_city_idx on public.hotels(city);
create index bookings_customer_idx on public.hotel_bookings(customer_id);
create index orders_customer_idx on public.orders(customer_id);

-- Enable RLS. Policies below are intentionally conservative.
alter table public.profiles enable row level security;
alter table public.organizers enable row level security;
alter table public.venues enable row level security;
alter table public.events enable row level security;
alter table public.ticket_types enable row level security;
alter table public.orders enable row level security;
alter table public.tickets enable row level security;
alter table public.payments enable row level security;
alter table public.hotels enable row level security;
alter table public.room_types enable row level security;
alter table public.room_rates enable row level security;
alter table public.hotel_bookings enable row level security;
alter table public.audit_logs enable row level security;

create policy "profiles read own" on public.profiles for select to authenticated using (id = auth.uid());
create policy "profiles update own" on public.profiles for update to authenticated using (id = auth.uid()) with check (id = auth.uid());

create policy "published events public read" on public.events for select using (status = 'published');
create policy "published ticket types public read" on public.ticket_types for select using (
  exists (select 1 from public.events e where e.id = event_id and e.status = 'published')
);
create policy "published hotels public read" on public.hotels for select using (status = 'published');
create policy "room types for published hotels" on public.room_types for select using (
  exists (select 1 from public.hotels h where h.id = hotel_id and h.status = 'published')
);
create policy "room rates for published room types" on public.room_rates for select using (
  exists (select 1 from public.room_types rt join public.hotels h on h.id = rt.hotel_id
    where rt.id = room_type_id and h.status = 'published')
);

create policy "customer reads own orders" on public.orders for select to authenticated using (customer_id = auth.uid());
create policy "customer reads own tickets" on public.tickets for select to authenticated using (
  exists (select 1 from public.orders o where o.id = order_id and o.customer_id = auth.uid())
);
create policy "customer reads own bookings" on public.hotel_bookings for select to authenticated using (customer_id = auth.uid());

-- IMPORTANT: production writes must go through trusted server-side functions.
-- Do not expose service-role keys in the browser. Add narrowly scoped policies or
-- security-definer RPC functions after implementing verified checkout workflows.
