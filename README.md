# Electronic Touch Systems Website and CRM

Local React/Vite website with a PostgreSQL-backed CRM API prototype.

## Frontend

```powershell
npm install
npm run dev
```

Open `http://localhost:5173`.

## Local CRM API

Create a local `.env` file from `.env.example` and adjust the PostgreSQL password/database if needed.

```powershell
Copy-Item .env.example .env
```

Create the PostgreSQL database once:

```powershell
createdb ets_crm
```

If `createdb` is not on PATH on Windows, use the PostgreSQL install path:

```powershell
& "C:\Program Files\PostgreSQL\18\bin\createdb.exe" -U postgres ets_crm
```

Run migrations and seed demo CRM data:

```powershell
npm run db:migrate
npm run db:seed
```

Start the backend API in a second terminal:

```powershell
npm run dev:api
```

Demo login:

```text
admin@ets.local
Password123!
```

The frontend proxies `/api` requests to `http://localhost:4000`.

## CRM Routes

- `POST /api/auth/login`
- `POST /api/auth/register`
- `GET /api/crm/dashboard`
- `GET /api/crm/leads`
- `POST /api/crm/leads`
- `GET /api/crm/quotes`
- `GET /api/crm/jobs`
- `GET /api/crm/contacts`
- `GET /api/crm/approvals`
