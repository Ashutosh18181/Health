-- Enable necessary extensions
create extension if not exists "uuid-ossp";

-- PROFILES (Extends Supabase Auth)
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  email text,
  role text default 'user' check (role in ('user', 'admin')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.profiles enable row level security;
create policy "Public profiles are viewable by everyone." on public.profiles for select using (true);
create policy "Users can insert their own profile." on public.profiles for insert with check (auth.uid() = id);
create policy "Users can update own profile." on public.profiles for update using (auth.uid() = id);

-- SYMPTOMS
create table public.symptoms (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  slug text unique not null,
  body_system text, -- e.g., 'Respiratory', 'Digestive'
  description text,
  severity_level text check (severity_level in ('low', 'medium', 'high', 'critical')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.symptoms enable row level security;
create policy "Symptoms are viewable by everyone." on public.symptoms for select using (true);
create policy "Admins can insert/update symptoms." on public.symptoms for all using (
  exists ( select 1 from public.profiles where id = auth.uid() and role = 'admin' )
);

-- DISEASES
create table public.diseases (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  icd_code text,
  description text,
  risk_level text check (risk_level in ('low', 'moderate', 'high', 'critical')),
  general_advice text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.diseases enable row level security;
create policy "Diseases are viewable by everyone." on public.diseases for select using (true);
create policy "Admins can insert/update diseases." on public.diseases for all using (
  exists ( select 1 from public.profiles where id = auth.uid() and role = 'admin' )
);

-- DISEASE_SYMPTOMS (Many-to-Many)
create table public.disease_symptoms (
  id uuid default uuid_generate_v4() primary key,
  disease_id uuid references public.diseases(id) on delete cascade not null,
  symptom_id uuid references public.symptoms(id) on delete cascade not null,
  weight integer default 1, -- Importance of symptom for this disease (1-10)
  unique(disease_id, symptom_id)
);

alter table public.disease_symptoms enable row level security;
create policy "Disease symptoms are viewable by everyone." on public.disease_symptoms for select using (true);
create policy "Admins can manage disease symptoms." on public.disease_symptoms for all using (
  exists ( select 1 from public.profiles where id = auth.uid() and role = 'admin' )
);

-- USER VITALS
create table public.user_vitals (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  blood_pressure_systolic integer,
  blood_pressure_diastolic integer,
  heart_rate integer,
  temperature_celsius decimal(4,1),
  weight_kg decimal(5,2),
  height_cm decimal(5,1),
  blood_sugar_level integer,
  recorded_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.user_vitals enable row level security;
create policy "Users can view own vitals." on public.user_vitals for select using (auth.uid() = user_id);
create policy "Users can insert own vitals." on public.user_vitals for insert with check (auth.uid() = user_id);

-- DIAGNOSIS HISTORY
create table public.diagnosis_history (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  symptoms_input jsonb, -- Array of symptom IDs or names used
  vitals_snapshot jsonb, -- Vitals at time of diagnosis
  predicted_diseases jsonb, -- Ranked list of diseases with scores
  notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.diagnosis_history enable row level security;
create policy "Users can view own diagnosis history." on public.diagnosis_history for select using (auth.uid() = user_id);
create policy "Users can insert own diagnosis." on public.diagnosis_history for insert with check (auth.uid() = user_id);

-- MEDICAL HISTORY
create table public.medical_history (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  condition text not null,
  diagnosis_date date,
  treatment_notes text,
  status text check (status in ('active', 'cured', 'chronic')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.medical_history enable row level security;
create policy "Users can view own medical history." on public.medical_history for select using (auth.uid() = user_id);
create policy "Users can manage own medical history." on public.medical_history for all using (auth.uid() = user_id);

-- TRIGGER for User Creation
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, role)
  values (new.id, new.email, 'user');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
