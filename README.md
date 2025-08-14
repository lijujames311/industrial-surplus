# Industrial Surplus Hub — Static Site

A fast static site focused on Kapp Niles electroplated CBN gear grinding wheels.
- Public-safe specs only (OD, width, bore, module, PA, helix), no proprietary profiles.
- Every listing is "Contact for Pricing".
- Built with vanilla HTML/JS + Tailwind CDN. Perfect for Cloudflare Pages or GitHub Pages.

## Structure
- `index.html` — Landing page
- `wheels.html` — Catalog (loads `/assets/data/wheels.json`)
- `contact.html` — Contact form (Formspree)
- `/assets/images` — Hero, placeholder, favicon (replace with real photos)
- `/assets/data/wheels.json` — Listing data (edit this with real specs/photos)
- `/assets/js/catalog.js` — Catalog rendering + filters

## Edit wheel data
1. Open `/assets/data/wheels.json`
2. For each wheel, fill:
   - `od_mm`, `width_mm`, `bore_mm`, `module`, `pressure_angle_deg`, `helix_angle_deg`
   - `wheel_code` and `inventory_code` (your internal code is fine)
   - `photo_urls` — e.g. `["/assets/images/wheel1.jpg", "/assets/images/wheel1b.jpg"]`
3. Copy matching photos into `/assets/images/`

## Formspree
- Replace `YOUR_FORM_ID` in `contact.html` with your Formspree form ID.
- Example: `https://formspree.io/f/abcdxyz1`

## Deploy to Cloudflare Pages
1. Push this folder to a GitHub repo, e.g. `industrial-surplus-hub`.
2. In Cloudflare Pages → Create Project → Connect to GitHub → Select the repo.
3. Framework preset: **None** (it's a plain static site).
4. Build command: **None**. Output directory: **/** (root).
5. Set custom domain: `industrialsurplushub.ca`.

## Deploy to GitHub Pages (optional)
1. Repo → Settings → Pages → Source: `Deploy from a branch`.
2. Branch: `main` (or `gh-pages`), folder: `/ (root)`.
3. Save. Your site will appear at `https://<user>.github.io/industrial-surplus-hub/`

## Notes
- This repo ships with 10 placeholder wheels. Replace with your real 10 as you finalize specs.
- You can add more items by appending to the `wheels` array.
- No sensitive geometry is published.
