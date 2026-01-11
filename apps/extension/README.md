# Demo Chrome Extension

This is a minimal Chrome extension (Manifest V3) that fetches and displays data from the web app.

## What it shows

- `GET {baseUrl}/api/users` (from `apps/web`)

## Load it in Chrome

1. Open `chrome://extensions`
2. Enable **Developer mode**
3. Click **Load unpacked**
4. Select this folder: `apps/extension`

## Use it

- Start the web app:

```bash
pnpm dev
```

- Open the extension popup. It defaults to `http://localhost:3000`.
- Click **Refresh**.

> Note: the demo API endpoint adds permissive CORS headers for development.
