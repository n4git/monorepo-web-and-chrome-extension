# monorepo-web-and-chrome-extension

This repo is a monorepo version of the original **Vercel Postgres + Prisma** example, plus a minimal Chrome extension that displays the same DB data.

## Structure

- `apps/web` — Next.js (App Router) + Prisma + Postgres (original project moved here)
- `apps/extension` — Chrome extension (MV3) that fetches `GET /api/users` from the web app and renders it in the popup

## Run the web app

```bash
pnpm install
pnpm dev
```

The web app runs on `http://localhost:3000`.

### Env

Copy the original example env file:

```bash
cp apps/web/.env.example apps/web/.env
```

Then set the same Postgres connection values you used before.

## Use the extension

1. Open `chrome://extensions`
2. Enable **Developer mode**
3. **Load unpacked** → select `apps/extension`
4. Click the extension icon to open the popup

It defaults to `http://localhost:3000` and calls `GET /api/users`.

## Vercel deployment note

If you deploy on Vercel, set the project **Root Directory** to `apps/web`.
