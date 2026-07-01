/* ELGOLD STUDIO — إعداد Supabase لبورتال العملاء.
   المفتاح publishable (عام) — آمن في الفرونت؛ الحماية الحقيقية من Row Level Security. */
(function () {
  var SB_URL = 'https://fgdmqhyclnaotgptkbkt.supabase.co';
  var SB_KEY = 'sb_publishable_UVWTEqfsuy9kohfAX-KhVg_f1EBuFD4';
  window.OWNER_EMAIL = 'ragabk452@gmail.com';
  window.SB = (window.supabase && window.supabase.createClient)
    ? window.supabase.createClient(SB_URL, SB_KEY, {
        auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true }
      })
    : null;
})();
