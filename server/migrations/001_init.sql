create extension if not exists pgcrypto;

create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  company text not null,
  email text not null unique,
  password_hash text not null,
  role text not null check (role in ('customer', 'sales', 'production', 'admin')),
  created_at timestamptz not null default now()
);

create table if not exists contacts (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  company text not null,
  email text,
  phone text,
  contact_type text not null default 'customer',
  created_at timestamptz not null default now()
);

create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  company text not null,
  contact_name text not null,
  email text,
  phone text,
  product text not null,
  stage text not null check (stage in ('new_lead', 'quoted', 'approval', 'won', 'lost')),
  value numeric(12, 2) not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists quotes (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid references leads(id) on delete set null,
  quote_number text not null unique,
  company text not null,
  status text not null check (status in ('draft', 'sent', 'accepted', 'declined')),
  total numeric(12, 2) not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists artwork_approvals (
  id uuid primary key default gen_random_uuid(),
  quote_id uuid references quotes(id) on delete set null,
  company text not null,
  product text not null,
  status text not null check (status in ('waiting_customer', 'changes_requested', 'approved')),
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists production_jobs (
  id uuid primary key default gen_random_uuid(),
  quote_id uuid references quotes(id) on delete set null,
  job_number text not null unique,
  company text not null,
  product text not null,
  status text not null check (status in ('quote_draft', 'artwork_proof', 'material_prep', 'production', 'ready_dispatch', 'dispatched')),
  due_date date,
  created_at timestamptz not null default now()
);

create index if not exists leads_stage_idx on leads(stage);
create index if not exists quotes_status_idx on quotes(status);
create index if not exists jobs_status_idx on production_jobs(status);
