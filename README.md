# Industrial Surplus Hub – Static Catalog Site

This repository contains a fully‑static HTML/CSS/JS catalog for surplus industrial equipment including gear grinding wheels, mounting hubs and precision gauges. The site is fast, mobile‑friendly and exposes only buyer‑relevant information.

## Structure

```
├── index.html                  # Home page
├── catalog.html                # Grid/list of all inventory
├── contact.html                # Contact form using Formspree
├── *.html                      # Individual item detail pages
├── catalog.csv                 # Master catalog data (for future import/export)
├── assets/
│   ├── css/style.css           # Single CSS file for layout and styling
│   └── web_images/             # Compressed & blurred images (safe for public viewing)
└── README.md                   # This file
```

## Development

All pages are static and can be previewed locally by opening `index.html` in your browser.  If you wish to modify catalog entries or add new wheels in the future:

1.  Update `catalog.csv` with a new row using the existing header structure.  Keep descriptions short and avoid any proprietary information.
2.  Place two optimized images for the wheel into `assets/web_images/` and reference them in the `photo1` and `photo2` columns (omit `photo2` if you only have one photo).
3.  Rebuild the HTML files by running the Python generator script used during initial creation (not included here).  For simple updates you can manually duplicate an existing detail page and adjust the fields.

## Deployment on Cloudflare Pages

1.  **Create a GitHub repository** (private or public) and push the contents of this folder into the root of the repository.
2.  **Sign in to Cloudflare** and navigate to **Pages** → **Create a project**.  Select *Connect to Git* and choose the repository you just created.
3.  **Set the build configuration**:
    
    * **Framework preset:** `None` (since this is a purely static site)
    * **Build command:** leave blank (no build step is required)
    * **Root directory:** `.` (the repository root)
    * **Build output directory:** `.`

4.  Click **Save and Deploy**.  Cloudflare will upload and serve your static files automatically.  The initial deployment will create a temporary `<project>.pages.dev` URL.
5.  **Add the custom domain `IndustrialSurplusHub.ca`**:

    1. In the newly created Pages project, go to **Custom domains** and click **Set up a domain**.
    2. Enter `IndustrialSurplusHub.ca` and follow the prompts to verify domain ownership (if not already verified).
    3. Cloudflare will provide the necessary DNS records (usually a `CNAME` pointing to your Pages URL).  Add these records in your Cloudflare DNS settings for `IndustrialSurplusHub.ca`.
    4. Once DNS changes propagate, Cloudflare Pages will issue an SSL certificate and your catalog will be live at `https://IndustrialSurplusHub.ca`.

6.  **Optional – Formspree setup:**  The contact form uses Formspree.  Replace `https://formspree.io/f/your-form-id` in `contact.html` with your actual Formspree endpoint.  When a user submits the form, you will receive an email notification.

## Intellectual Property Notice

Sensitive gear geometry, profile diagrams, serial numbers and proprietary measurements are deliberately omitted.  Geometry reports referenced in the catalog are stored offline and will only be shared with verified buyers under appropriate non‑disclosure agreements.
