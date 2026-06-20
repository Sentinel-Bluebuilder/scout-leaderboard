# Sentinel Scout — Final Leaderboard

The permanent public record of the **Sentinel Scout** program, published as part of
**Scout Sunset** (Scout → Runner graduation).

> Scout found the way. Runner walks it. Thank you, Scouts.

## What this is

A static, single-page site (no build step) intended to be hosted at
**`leaderboard.sentinel.co`**. It renders the final Scout leaderboard from
`leaderboard.json` and explains the program sunset + the path into Runner.

```
index.html        # markup
style.css         # Sentinel-branded styling (sunset orange + sentinel cyan)
leaderboard.js    # loads leaderboard.json, renders table + stats, search
leaderboard.json  # DATA — currently a placeholder, replaced with final dataset
CNAME             # leaderboard.sentinel.co (GitHub Pages custom domain)
.nojekyll         # serve files as-is on GitHub Pages
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

```bash
cd leaderboard-site
python -m http.server 8080   # then open http://localhost:8080
```
(`fetch('./leaderboard.json')` needs to be served over http, not opened as `file://`.)

## The data: `leaderboard.json`

This is the **only file that needs to change** to publish results. Schema:

```jsonc
{
  "meta": {
    "scouts": 1042,            // total unique scouts
    "contributions": 1900000,  // total contributions
    "rewards": "1.2M DVPN",    // string — final reward pool
    "days": 480,               // days the program ran
    "generatedAt": "2026-06-20",
    "frozen": true             // true once the snapshot is final
  },
  "rows": [
    {
      "rank": 1,
      "scout": "scout-name",       // display name, or null
      "address": "sent1abc…xyz",   // wallet / id, shortened in UI
      "contributions": 12345,
      "score": 98765,
      "reward": "1,234 DVPN"       // string
    }
  ]
}
```

The final dataset is computed from the archived Scout TSDB telemetry as part of the
Scout Sunset project (reward methodology published alongside it). Until then the site
shows an honest "dataset being finalized" state.

## Branding

- Sunset orange `#ff7a3d` / gold `#ffb347` (the *sunset*) over Sentinel cyan `#3ad7ff`.
- Fonts: Space Grotesk (display) + IBM Plex Mono (numbers/addresses).
- Tone: celebratory, grateful, forward-looking — not funereal.

---

*Tools that give every person — and every AI — uncensorable access to the open internet.*
