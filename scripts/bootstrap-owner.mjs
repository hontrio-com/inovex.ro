// ============================================================
// Bootstrap owner CRM — creeaza (sau actualizeaza) contul owner
// in Supabase Auth si ii seteaza rolul 'owner' in profiles.
//
// Rulare (din radacina proiectului, cu env-ul incarcat):
//   node --env-file=.env.local scripts/bootstrap-owner.mjs "<parola>" [email]
//
// Implicit email = contact@inovex.ro. Ruleaza o singura data la setup;
// re-rularea doar actualizeaza parola si reasigura rolul owner.
// ============================================================
import { createClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const password = process.argv[2];
const email = (process.argv[3] || 'contact@inovex.ro').toLowerCase();

if (!url || !serviceKey) {
  console.error('Lipsesc NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY din env.');
  console.error('Ruleaza: node --env-file=.env.local scripts/bootstrap-owner.mjs "<parola>"');
  process.exit(1);
}
if (!password || password.length < 8) {
  console.error('Parola lipseste sau e prea scurta (min 8 caractere).');
  console.error('Utilizare: node --env-file=.env.local scripts/bootstrap-owner.mjs "<parola>"');
  process.exit(1);
}

const admin = createClient(url, serviceKey, { auth: { persistSession: false } });

async function findUserByEmail(targetEmail) {
  let page = 1;
  for (;;) {
    const { data, error } = await admin.auth.admin.listUsers({ page, perPage: 200 });
    if (error) throw error;
    const found = data.users.find((u) => (u.email || '').toLowerCase() === targetEmail);
    if (found) return found;
    if (data.users.length < 200) return null;
    page += 1;
  }
}

const existing = await findUserByEmail(email);
let userId;

if (existing) {
  userId = existing.id;
  const { error } = await admin.auth.admin.updateUserById(userId, { password, email_confirm: true });
  if (error) { console.error('Eroare la actualizarea parolei:', error.message); process.exit(1); }
  console.log(`Owner existent — parola actualizata pentru ${email}`);
} else {
  const { data, error } = await admin.auth.admin.createUser({ email, password, email_confirm: true });
  if (error) { console.error('Eroare la creare:', error.message); process.exit(1); }
  userId = data.user.id;
  console.log(`Owner creat: ${email}`);
}

// Triggerul on_auth_user_created a creat deja profilul; fortam rol owner + activ.
const { error: upErr } = await admin
  .from('profiles')
  .update({ role: 'owner', is_active: true })
  .eq('id', userId);
if (upErr) { console.error('Eroare la setarea rolului owner:', upErr.message); process.exit(1); }

console.log('Gata. Profil owner activ. Autentificare in /admin/login cu email + parola.');
process.exit(0);
