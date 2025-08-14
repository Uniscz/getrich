-- Script para configurar tabelas e RLS no Supabase
-- Execute este script no SQL Editor do Supabase

-- Criar tabela de matrículas
create table if not exists public.enrollments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  status text not null default 'inactive',
  created_at timestamptz not null default now(),
  updated_at timestamptz default now()
);

-- Criar índice único para user_id (para upsert)
create unique index if not exists enrollments_user_id_idx on public.enrollments (user_id);

-- Criar tabela de aulas
create table if not exists public.lessons (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  video_url text not null,
  module text default 'Módulo 1',
  order_num int default 1,
  created_at timestamptz default now()
);

-- Habilitar Row Level Security para enrollments
alter table public.enrollments enable row level security;

-- Política para ler próprias matrículas
drop policy if exists "read own enrollments" on public.enrollments;
create policy "read own enrollments" on public.enrollments
  for select using (auth.uid() = user_id);

-- Política para inserir próprias matrículas
drop policy if exists "insert own enrollments" on public.enrollments;
create policy "insert own enrollments" on public.enrollments
  for insert with check (auth.uid() = user_id);

-- Habilitar Row Level Security para lessons
alter table public.lessons enable row level security;

-- Política para ler aulas quando autenticado
drop policy if exists "read lessons when logged" on public.lessons;
create policy "read lessons when logged" on public.lessons
  for select using (auth.role() = 'authenticated');

-- Inserir algumas aulas de exemplo (opcional)
insert into public.lessons (title, description, video_url, module, order_num) values
  ('Introdução ao Curso', 'Bem-vindo ao curso de criação de vídeos com IA', 'https://example.com/video1', 'Módulo 1', 1),
  ('Primeiros Passos', 'Como começar a criar seus primeiros vídeos', 'https://example.com/video2', 'Módulo 1', 2),
  ('Técnicas Avançadas', 'Aprenda técnicas avançadas de edição', 'https://example.com/video3', 'Módulo 2', 3)
on conflict do nothing;

