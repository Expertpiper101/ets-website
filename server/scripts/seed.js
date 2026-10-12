import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'
import { pool, query } from '../db.js'

dotenv.config()

const passwordHash = await bcrypt.hash('Password123!', 12)

await query('delete from artwork_approvals')
await query('delete from production_jobs')
await query('delete from quotes')
await query('delete from leads')
await query('delete from contacts')

await query(`
  insert into users (name, company, email, password_hash, role)
  values
    ('ETS Admin', 'Electronic Touch Systems', 'admin@ets.local', $1, 'admin'),
    ('Sales User', 'Electronic Touch Systems', 'sales@ets.local', $1, 'sales')
  on conflict (email) do nothing
`, [passwordHash])

await query(`
  insert into contacts (name, company, email, phone, contact_type)
  values
    ('A. Mokoena', 'MedTech SA', 'amokoena@medtech.example', '011 555 0101', 'key_account'),
    ('S. Naidoo', 'KZN Instruments', 'snaidoo@kzni.example', '031 555 0134', 'buyer'),
    ('J. van Wyk', 'Nova Controls', 'jvw@novacontrols.example', '021 555 0177', 'engineer')
  on conflict do nothing
`)

await query(`
  insert into leads (company, contact_name, email, phone, product, stage, value)
  values
    ('Nova Controls', 'J. van Wyk', 'jvw@novacontrols.example', '021 555 0177', 'Membrane keypad', 'new_lead', 18400),
    ('Metro Labelling', 'P. Jacobs', 'pjacobs@metro.example', '010 555 0199', 'Domed badges', 'new_lead', 6900),
    ('KZN Instruments', 'S. Naidoo', 'snaidoo@kzni.example', '031 555 0134', 'Graphic overlays', 'quoted', 42500),
    ('Aero Panel Works', 'L. Smith', 'lsmith@aero.example', '012 555 0148', 'Laser engraving', 'quoted', 11200),
    ('MedTech SA', 'A. Mokoena', 'amokoena@medtech.example', '011 555 0101', 'Touch switches', 'approval', 68000),
    ('PanelPro', 'N. Adams', 'nadams@panelpro.example', '041 555 0188', 'Labels', 'approval', 9800)
  on conflict do nothing
`)

await query(`
  insert into quotes (quote_number, company, status, total)
  values
    ('Q-1042', 'KZN Instruments', 'sent', 42500),
    ('Q-1043', 'MedTech SA', 'accepted', 68000),
    ('Q-1044', 'Nova Controls', 'draft', 18400)
  on conflict (quote_number) do nothing
`)

await query(`
  insert into artwork_approvals (company, product, status, notes)
  values
    ('KZN Instruments', 'Graphic overlays', 'waiting_customer', 'Awaiting signed artwork proof'),
    ('MedTech SA', 'Touch switches', 'changes_requested', 'Customer requested icon alignment change'),
    ('PanelPro', 'Labels', 'approved', 'Approved for production')
`)

await query(`
  insert into production_jobs (job_number, company, product, status, due_date)
  values
    ('ETS-1042', 'KZN Instruments', 'Graphic overlays', 'artwork_proof', current_date + interval '2 day'),
    ('ETS-1043', 'MedTech SA', 'Touch switches', 'material_prep', current_date + interval '5 day'),
    ('ETS-1044', 'Nova Controls', 'Membrane keypad', 'quote_draft', current_date + interval '6 day'),
    ('ETS-1045', 'PanelPro', 'Labels', 'ready_dispatch', current_date + interval '8 day')
  on conflict (job_number) do nothing
`)

await pool.end()
console.log('Seed complete')
console.log('Demo login: admin@ets.local / Password123!')
