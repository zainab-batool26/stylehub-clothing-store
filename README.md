# StyleHub

StyleHub is a Next.js clothing-store portfolio project with an editorial charcoal, cream and muted-orange visual system.

## Stack

- Next.js 16
- TypeScript
- Tailwind CSS
- Supabase Postgres
- Supabase Auth
- Supabase Storage

## Features

- Product catalogue loaded from Supabase
- Search and category filtering
- Product detail pages with size and quantity selection
- Cart and checkout flow
- Admin dashboard at `/admin`
- Add, edit and delete products without changing source code
- Product image uploads through Supabase Storage
- Email/password admin authentication with database-backed admin access

## Local setup

Install dependencies:

```bash
npm install
```

Create `.env.local` from `.env.example` and add the Supabase project URL and publishable key.

Then run:

```bash
npm run dev
```

Open `http://localhost:3000`.

## Admin setup

The admin dashboard intentionally has no public sign-up form.

1. In Supabase Dashboard, create the admin user under Authentication.
2. Sign in once at `/admin`.
3. If the account is not yet approved, the page shows the account UUID and the one-time SQL needed to add it to `public.admin_users`.
4. Run that SQL in the Supabase SQL Editor.
5. Sign in again. You can then add, edit, delete and upload product images from the dashboard.

Never put a Supabase secret/service-role key in the browser or in GitHub. Only the publishable key belongs in `.env.local`.
