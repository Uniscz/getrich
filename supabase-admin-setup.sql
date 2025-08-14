-- Script para configurar usuário admin no Supabase
-- Execute este script no SQL Editor do Supabase

-- Criar tabela de perfis de usuário se não existir
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text,
  role text default 'student',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Habilitar RLS para profiles
alter table public.profiles enable row level security;

-- Política para ler próprio perfil
drop policy if exists "read own profile" on public.profiles;
create policy "read own profile" on public.profiles
  for select using (auth.uid() = id);

-- Política para inserir próprio perfil
drop policy if exists "insert own profile" on public.profiles;
create policy "insert own profile" on public.profiles
  for insert with check (auth.uid() = id);

-- Política para atualizar próprio perfil
drop policy if exists "update own profile" on public.profiles;
create policy "update own profile" on public.profiles
  for update using (auth.uid() = id);

-- Função para criar perfil automaticamente quando usuário é criado
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, role)
  values (new.id, new.email, 'student');
  return new;
end;
$$ language plpgsql security definer;

-- Trigger para criar perfil automaticamente
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Inserir usuário admin manualmente (substitua pelos dados reais)
-- Nota: Este usuário deve ser criado via interface do Supabase Auth primeiro
-- Depois execute este comando para definir como admin:

-- UPDATE public.profiles 
-- SET role = 'admin' 
-- WHERE email = 'kildsnj@gmail.com';

-- Ou se o perfil não existir ainda:
-- INSERT INTO public.profiles (id, email, role) 
-- VALUES (
--   (SELECT id FROM auth.users WHERE email = 'kildsnj@gmail.com'),
--   'kildsnj@gmail.com',
--   'admin'
-- ) ON CONFLICT (id) DO UPDATE SET role = 'admin';

