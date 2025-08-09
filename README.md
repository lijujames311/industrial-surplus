# Industrial Surplus Hub – Static Catalog Site



## Structure

```
├── index.html                  # Home page

├── catalog.csv                 # Master catalog data (for future import/export)
├── assets/
│   ├── css/style.css           # Single CSS file for layout and styling
│   └── web_images/             # Compressed & blurred images (safe for public viewing)
└── README.md                   # This file
```

## Development

This project is a static site and does not require Node.js tooling or tests.
The provided `package.json` exists solely so CI environments that run
`npm test` succeed by printing a placeholder message and exiting cleanly.


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
