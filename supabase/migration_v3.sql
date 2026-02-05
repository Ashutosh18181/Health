-- Add new columns for "Medical Grade" content
alter table public.diseases 
add column if not exists causes text,
add column if not exists risk_factors text,
add column if not exists when_to_see_doctor text,
add column if not exists affected_groups text;
