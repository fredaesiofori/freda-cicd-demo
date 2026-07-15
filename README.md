# Ember & Oak Roasters — CI/CD Demo Site

A small Node.js static site generator for a coffee roastery landing page, built and deployed automatically with GitHub Actions and GitHub Pages.

**Live site:** https://fredaesiofori.github.io/freda-cicd-demo/

---

## What this project is

This started as a CI/CD pipeline assignment and grew into a real, working landing page. It demonstrates a full automated pipeline:

```
Commit → Build → Deploy → Live site updated
```

Every push to `main` triggers GitHub Actions to rebuild the site from source and publish it to GitHub Pages — no manual deployment step required.

## Project structure

```
freda-cicd-demo/
├── .github/
│   └── workflows/
│       └── deploy.yml       # CI/CD pipeline definition
├── content/
│   └── data.json            # Editable brand copy (headline, tagline, version)
├── templates/
│   └── template.html        # Full page markup + styling
├── dist/                    # Build output (generated, not committed)
├── build.js                 # Build script — merges data.json into template.html
├── package.json
└── README.md
```

## How the build works

1. `build.js` reads `content/data.json`
2. It replaces `{{placeholder}}` tokens in `templates/template.html` with values from the JSON
3. The result is written to `dist/index.html`
4. GitHub Actions uploads `dist/` and deploys it to GitHub Pages

Only a few fields are data-driven (`title`, `eyebrow`, `heading`, `message`, `version`) — this keeps the headline and tagline easy to update without touching HTML. The rest of the page content (pricing, testimonials, process steps, gallery) lives directly in `templates/template.html` since it changes less often.

## Running locally

Requires [Node.js](https://nodejs.org) 18 or later.

```bash
npm install
npm run build
```

This generates `dist/index.html`. Open it directly in a browser to preview, or serve it locally:

```bash
npx serve dist
```

## Editing content

**Quick copy changes** (headline, tagline, version number):
Edit `content/data.json`, then run `npm run build` to regenerate, or just push — the pipeline rebuilds automatically.

```json
{
  "title": "Ember & Oak Roasters — Small-Batch Coffee",
  "eyebrow": "Small-batch roastery",
  "heading": "Twelve kilos. Zero shortcuts.",
  "version": "2.0",
  "message": "..."
}
```

**Everything else** (pricing, testimonials, process steps, team/gallery, contact details, colors, fonts):
Edit directly in `templates/template.html`. Section content and CSS variables (`--gold`, `--rust`, `--bg`, etc. near the top of the `<style>` block) are grouped clearly by section.

## Deployment pipeline

Defined in `.github/workflows/deploy.yml`:

| Step | What it does |
|---|---|
| Checkout | Pulls the latest commit |
| Setup Node | Installs Node.js 20 |
| Install dependencies | `npm install` |
| Run build | `npm run build` → generates `dist/` |
| Upload artifact | Packages `dist/` for Pages |
| Deploy | Publishes to GitHub Pages |

Triggered automatically on every push to `main`. GitHub Pages is configured with **Source: GitHub Actions** (Settings → Pages).

## Photo credits

Gallery images are sourced from [Unsplash](https://unsplash.com), used under the [Unsplash License](https://unsplash.com/license) (free for commercial and non-commercial use). Replace these with real product photography before using this site for an actual business.

## Notes before using this for a real business

This is a demo built around a fictional coffee roastery. Before launching publicly:
- Replace all placeholder copy, pricing, and contact details with real information
- Replace testimonials with genuine customer quotes (or remove the section)
- Replace gallery images with your own product photography
- Replace the contact form's `alert()` handler with a real backend or a form service (e.g. Formspree, Netlify Forms) since it currently doesn't send anywhere
- Update the roast curve values/labels if not applicable to your product

## Tech stack

- **Build:** Node.js (no framework — plain `fs` string templating)
- **CI/CD:** GitHub Actions
- **Hosting:** GitHub Pages
- **Fonts:** Fraunces, Inter, IBM Plex Mono (Google Fonts)

---
**Author:** FREDA OFORI