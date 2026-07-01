-- ============================================================
--  ELGOLD STUDIO — Client Portal schema
--  شغّل ده مرة واحدة: Supabase Dashboard → SQL Editor → New query → الصق → Run
-- ============================================================

-- 1) جدول الطلبات (كل صف = طلب مشروع)
create table if not exists public.portal_requests (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid references auth.users(id) on delete set null,
  name        text not null,
  email       text not null,
  phone       text,
  service     text,
  budget      text,                                 -- الميزانية اللي اقترحها العميل
  details     text,
  status      text not null default 'new',          -- new | reviewing | in_progress | delivered | cancelled
  currency    text not null default 'USD',
  price       numeric(12,2) not null default 0,     -- السعر المتفق عليه (صاحب الاستوديو يحدده)
  paid        numeric(12,2) not null default 0,     -- المدفوع (صاحب الاستوديو يحدّثه)
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index if not exists portal_requests_user_idx    on public.portal_requests(user_id);
create index if not exists portal_requests_created_idx on public.portal_requests(created_at desc);

-- 2) مين صاحب الاستوديو (الأدمن) — الحساب اللي إيميله كده
create or replace function public.is_owner() returns boolean
language sql stable as $$
  select coalesce(auth.jwt() ->> 'email', '') = 'ragabk452@gmail.com'
$$;

-- 3) تريجر: يحدّث updated_at + يمنع العميل يزوّر السعر/المدفوع/الحالة عند الإضافة
create or replace function public.portal_requests_guard() returns trigger
language plpgsql as $$
begin
  new.updated_at := now();
  if tg_op = 'INSERT' and not public.is_owner() then
    new.user_id := auth.uid();     -- الطلب يتربط بصاحبه إجبارياً
    new.status  := 'new';
    new.price   := 0;
    new.paid    := 0;
  end if;
  return new;
end $$;

drop trigger if exists portal_requests_guard_trg on public.portal_requests;
create trigger portal_requests_guard_trg
  before insert or update on public.portal_requests
  for each row execute function public.portal_requests_guard();

-- 4) أمان الصفوف (RLS): كل عميل يشوف طلباته فقط، وصاحب الاستوديو يشوف الكل ويدير المستحقات
alter table public.portal_requests enable row level security;

drop policy if exists "client insert own" on public.portal_requests;
create policy "client insert own" on public.portal_requests
  for insert to authenticated
  with check ( auth.uid() = user_id or public.is_owner() );

drop policy if exists "client read own" on public.portal_requests;
create policy "client read own" on public.portal_requests
  for select to authenticated
  using ( auth.uid() = user_id or public.is_owner() );

drop policy if exists "owner update" on public.portal_requests;
create policy "owner update" on public.portal_requests
  for update to authenticated
  using ( public.is_owner() )
  with check ( public.is_owner() );

drop policy if exists "owner delete" on public.portal_requests;
create policy "owner delete" on public.portal_requests
  for delete to authenticated
  using ( public.is_owner() );

-- تم ✓  (بعد ما تشغّله: سجّل حساب بإيميل ragabk452@gmail.com = حساب الأدمن)
