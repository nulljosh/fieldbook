# Fieldbook Technical Whitepaper

**v0** | September 2026

Fieldbook is a single static page that maps every field of science and mathematics. Each field gets a few hundred words: what it studies, four ideas that carry most of the weight, and the misconception most people hold. The goal is coverage at the level of a map, so a reader knows where everything is before deciding where to go deep.

## The core mechanic

All content lives in one JavaScript array, one object per field. The page groups entries by domain, builds a sidebar index, and renders each entry as an article. A search box filters articles and the index by substring. A "Mark read" button per field stores the field's slug in localStorage and drives a progress count. Nothing is sent anywhere.

## Content rules

Plain English, short sentences, no jargon without an inline gloss. Exactly four key ideas per field. The gap line names a specific wrong belief and corrects it in one or two sentences. A test enforces shape, uniqueness, minimum length, and house voice (no em dashes, no emojis, no marketing verbs).

## Testing

`node --test data.test.mjs` checks the content. `node --test ui.test.mjs` drives the live page in Chrome through Playwright: render count, search filtering, mark-read persistence across reload, index navigation, and captures screenshots.

## Deployment

Cloudflare Workers static assets via `wrangler deploy`. Docs, tests, and screenshots are excluded by `.assetsignore`.

## Roadmap

One self-check question per field. A prerequisite ordering so the page reads as a course. Further fields as gaps are found.

MIT, Joshua Trommel, 2026.
