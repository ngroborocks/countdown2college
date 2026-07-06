# Countdown to College — Website

A single-page static site for Countdown to College. Plain HTML + CSS + vanilla
JavaScript — **no npm, no build step, no frameworks**. If you can edit a text
file, you can run and update this site.

```
index.html      the page (structure + default copy)
styles.css      all styling (brand colors are at the top in :root)
content.js      ← ALL editable text lives here. Edit this one.
script.js       behavior (countdown, grade tabs, content injection)
favicon.svg     hourglass favicon
public/         drop the PDFs here (see public/README.txt)
```

## Run it locally

**Easiest:** double-click `index.html`. It opens and works in any modern browser.

**Slightly nicer** (matches how a real server serves it) — if you have Python:

```
python -m http.server 8000
```

then open <http://localhost:8000>.

## Editing content — the only file you need

Open **`content.js`** in any text editor (Notepad, TextEdit, VS Code) and change
the text between the quotes. Save, refresh the browser. That's it.

- Every headline, stat card, grade action item, webinar session, social link,
  and email address lives in that one file, with comments explaining each part.
- Leave any field as `""` and the site falls back to sensible built-in text —
  a half-edited file never breaks the page.
- Webinar sessions are a list — copy/paste a `{ ... }` block to add one, delete
  a block to remove one.
- To hook up the **webinar signup form**: in Google Forms choose
  *Send → `< >` (Embed HTML)*, copy the URL from `src="..."`, and paste it into
  `links.signupFormEmbed`. Until then the site shows a tidy email-signup
  placeholder instead of a broken frame.

## The three PDFs

Drop these into the `public/` folder (exact names — links already point there):

| File | Used by |
|---|---|
| `public/guide.pdf` | Hero CTA, guide section, every "Full details in the guide" button |
| `public/parent-packet.pdf` | Families section, parent card |
| `public/student-packet.pdf` | Families section, student card |

Optional: `public/founder.jpg` (then set `about.founderPhoto` in `content.js`)
and `public/og-image.png` (then uncomment the `og:image` tag in `index.html`).

## Deploy

### Netlify (drag and drop)

1. Go to <https://app.netlify.com/drop>.
2. Drag this whole folder onto the page.
3. Done — Netlify gives you a URL immediately. To update, drag the folder again
   (or connect the GitHub repo for automatic deploys).

### GitHub Pages

1. Push this folder to a GitHub repository (files at the repo root).
2. In the repo: **Settings → Pages → Source: Deploy from a branch**, pick
   `main` and `/ (root)`, save.
3. The site appears at `https://<username>.github.io/<repo>/` within a minute
   or two. All paths in the site are relative, so it works from a subpath
   without any changes.

## Notes

- Fonts load from Google Fonts (`Space Grotesk` + `Inter`); everything else is
  self-contained — no other external dependencies.
- Brand colors are CSS custom properties at the top of `styles.css` (`:root`)
  if you ever need to touch them.
- The countdown assumes applications "open" **October 1 of senior fall**, and
  from July onward treats a selected grade as the upcoming school year (a
  "rising" student). The logic is in `script.js` → `applicationDate()`.
