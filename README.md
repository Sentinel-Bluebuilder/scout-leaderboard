# Sentinel Scout — Leaderboard

A static, single-page site with Sentinel branding for the **Sentinel Scout** program
leaderboard, published as part of **Scout Sunset** (Scout → Runner graduation).

> Scout found the way. Runner walks it. Thank you, Scouts.

Intended to be hosted at **`leaderboard.sentinel.co`**. Currently shows a branded
"Leaderboard — coming soon" page plus the sunset explainer and a Runner CTA. No build
step, no JavaScript, no backend.

```
index.html     # the page (static markup)
style.css      # Sentinel-branded styling (sunset orange + sentinel cyan)
CNAME          # leaderboard.sentinel.co (GitHub Pages custom domain)
.nojekyll      # serve files as-is on GitHub Pages
```

## Deploy (GitHub Pages)

1. Repo → **Settings → Pages**.
2. Source: **Deploy from a branch** → branch `main` → `/ (root)`.
3. Custom domain: `leaderboard.sentinel.co` (already in `CNAME`).
4. At the DNS provider, add a `CNAME` record:
   `leaderboard` → `sentinel-bluebuilder.github.io.`
5. Enable **Enforce HTTPS** once the cert provisions.

Works on any static host (Vercel, Netlify, Cloudflare Pages, S3) — just serve the
folder root.

### Local preview

Open `index.html` directly in a browser, or serve the folder:

```bash
python -m http.server 8080   # then open http://localhost:8080
```

## Branding

- Sunset orange `#ff7a3d` / gold `#ffb347` (the *sunset*) over Sentinel cyan `#3ad7ff`.
- Fonts: Space Grotesk (display) + IBM Plex Mono.
- Tone: celebratory, grateful, forward-looking — not funereal.

---

*Tools that give every person — and every AI — uncensorable access to the open internet.*
