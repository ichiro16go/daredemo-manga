-- INFRA-2: 初期スキーマ (users, characters, character_revisions, character_variants, works, panels)
-- PC版・スマホ版共通のDB。公開/投稿まわりのスキーマはEDIT-F08-1(#19)で別途拡張する。

create extension if not exists "pgcrypto" with schema "extensions";

-- ============================================================
-- users: auth.usersの拡張プロフィール(1:1)
-- ============================================================
create table if not exists public.users (
  id uuid primary key references auth.users (id) on delete cascade,
  email text,
  nickname text,
  avatar_url text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

comment on table public.users is 'auth.usersに対応するプロフィール情報。id=auth.users.id。';

-- auth.users作成時にpublic.usersへ自動でプロフィール行を作成する
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.users (id, email)
  values (new.id, new.email);
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ============================================================
-- characters: F-02で生成されたキャラクターの現在の状態(ライブラリの単位)
-- ============================================================
create table if not exists public.characters (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users (id) on delete cascade,
  name text,
  image_url text not null,
  reference_image_url text,
  generation_prompt text,
  style_preset text,
  base_color_palette jsonb,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

comment on table public.characters is 'F-02キャラクター生成の現在の状態。対話的修正の履歴はcharacter_revisionsに保持する。';
comment on column public.characters.reference_image_url is 'F-02-3: 参考画像入力を使った生成の場合の入力画像。';
comment on column public.characters.base_color_palette is 'F-04-2: 自動着彩で使う基本配色の記憶。';

create index if not exists characters_user_id_idx on public.characters (user_id);

-- ============================================================
-- character_revisions: F-02-2 対話的修正の生成履歴
-- ============================================================
create table if not exists public.character_revisions (
  id uuid primary key default gen_random_uuid(),
  character_id uuid not null references public.characters (id) on delete cascade,
  image_url text not null,
  prompt text not null,
  created_at timestamptz not null default timezone('utc', now())
);

comment on table public.character_revisions is 'F-02-2: キャラクター対話的修正の各生成結果の履歴(古い順)。';

create index if not exists character_revisions_character_id_idx on public.character_revisions (character_id);

-- ============================================================
-- character_variants: F-03 ポーズ・表情差分
-- ============================================================
create table if not exists public.character_variants (
  id uuid primary key default gen_random_uuid(),
  character_id uuid not null references public.characters (id) on delete cascade,
  label text not null,
  image_url text not null,
  generation_prompt text,
  created_at timestamptz not null default timezone('utc', now())
);

comment on table public.character_variants is 'F-03: キャラクターのポーズ・表情差分。labelは例: "怒り・正面"。';

create index if not exists character_variants_character_id_idx on public.character_variants (character_id);

-- ============================================================
-- works: 漫画作品(企画〜投稿の単位)
-- ============================================================
create table if not exists public.works (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users (id) on delete cascade,
  title text not null,
  thumbnail_url text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

comment on table public.works is '漫画作品。公開設定・投稿関連の列はEDIT-F08-1で追加する。';

create index if not exists works_user_id_idx on public.works (user_id);

-- ============================================================
-- panels: 作品内のページ単位のキャンバス(F-01/F-05/F-06相当の作画結果を含む)
-- ============================================================
create table if not exists public.panels (
  id uuid primary key default gen_random_uuid(),
  work_id uuid not null references public.works (id) on delete cascade,
  page_number integer not null,
  canvas_data jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  unique (work_id, page_number)
);

comment on table public.panels is 'INFRA-6のFabric.jsキャンバスの状態(コマ配置・背景・着彩結果等)をcanvas_dataに保持する1ページ分の単位。';

create index if not exists panels_work_id_idx on public.panels (work_id);

-- ============================================================
-- updated_at自動更新
-- ============================================================
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

create trigger set_users_updated_at before update on public.users
  for each row execute function public.set_updated_at();
create trigger set_characters_updated_at before update on public.characters
  for each row execute function public.set_updated_at();
create trigger set_works_updated_at before update on public.works
  for each row execute function public.set_updated_at();
create trigger set_panels_updated_at before update on public.panels
  for each row execute function public.set_updated_at();

-- ============================================================
-- RLS: 自分のデータのみ読み書き可能(公開範囲はEDIT-F08-1で拡張)
-- ============================================================
alter table public.users enable row level security;
alter table public.characters enable row level security;
alter table public.character_revisions enable row level security;
alter table public.character_variants enable row level security;
alter table public.works enable row level security;
alter table public.panels enable row level security;

create policy "users can view own profile" on public.users
  for select using (auth.uid() = id);
create policy "users can update own profile" on public.users
  for update using (auth.uid() = id);

create policy "users can manage own characters" on public.characters
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "users can manage own character revisions" on public.character_revisions
  for all using (
    auth.uid() = (select user_id from public.characters where id = character_id)
  ) with check (
    auth.uid() = (select user_id from public.characters where id = character_id)
  );

create policy "users can manage own character variants" on public.character_variants
  for all using (
    auth.uid() = (select user_id from public.characters where id = character_id)
  ) with check (
    auth.uid() = (select user_id from public.characters where id = character_id)
  );

create policy "users can manage own works" on public.works
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "users can manage own panels" on public.panels
  for all using (
    auth.uid() = (select user_id from public.works where id = work_id)
  ) with check (
    auth.uid() = (select user_id from public.works where id = work_id)
  );
