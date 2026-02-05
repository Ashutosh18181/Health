-- Add new columns for enhanced disease details
alter table public.diseases 
add column if not exists prevention text,
add column if not exists treatment text,
add column if not exists specialist text;

-- Optional: Grant permissions if needed (usually covered by existing RLS/Grants)
-- grant select on public.diseases to anon, authenticated;
