# Fieldbook

Every field of science and math explained plainly. One page, no build. Live at fieldbook.heyitsmejosh.com.

- `index.html` renders `data.js` (one entry per field: domain, name, one-liner, explanation, four key ideas, the gap). Add a field by adding an entry
- Read progress in localStorage only
- Deploy: `env -u CLOUDFLARE_API_TOKEN npx wrangler deploy`
- Design tokens from heyitsmejosh.com/tokens.css. No emojis, no serif, no purple
