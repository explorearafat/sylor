# Sylor download site

A tiny, zero-build static site (just `index.html` + `favicon.svg`). It's the
public landing/download page for the Sylor desktop app. The **Download for
Windows** button points at a *permanent* GitHub Releases URL:

```
https://github.com/explorearafat/sylor/releases/latest/download/Sylor-Setup.exe
```

That link always resolves to the newest release's installer — as long as the
asset is named `Sylor-Setup.exe` (enforced by `artifactName` in
`../electron-builder.yml`). No site edit is needed when you ship a new version.

---

## 1. Build the installer

From the repo root:

```bash
npm run dist:win
```

Produces `release/Sylor-Setup.exe` (~118 MB).

## 2. Publish it to GitHub Releases

The download link is dead until a release exists. Pick one:

**With GitHub CLI** (once: `winget install --id GitHub.cli -e`, then `gh auth login`):

```bash
gh release create v0.1.0 "release/Sylor-Setup.exe" --title "Sylor 0.1.0" --notes "First public build."
```

For later versions, bump the tag and re-upload the (same-named) asset:

```bash
gh release create v0.1.1 "release/Sylor-Setup.exe" --title "Sylor 0.1.1" --notes "..."
```

**Or by hand:** open
<https://github.com/explorearafat/sylor/releases/new> → choose a tag (e.g.
`v0.1.0`) → drag `release/Sylor-Setup.exe` into the assets box → **Publish
release**.

Verify the permanent link redirects to the asset:

```bash
curl -I https://github.com/explorearafat/sylor/releases/latest/download/Sylor-Setup.exe
```

You should see `HTTP/2 302` with a `location:` pointing at the uploaded file.

## 3. Deploy the site to Vercel

**Dashboard:** <https://vercel.com/new> → import `explorearafat/sylor` → set
**Root Directory** to `website`, **Framework Preset** to **Other** → **Deploy**.

**Or CLI:**

```bash
npx vercel deploy website --prod
```

Because it's plain static HTML, no build command or environment variables are
needed.

---

## Notes

- **SmartScreen:** the installer is self-signed, so first-run shows "Windows
  protected your PC" → **More info → Run anyway**. The page explains this. A
  trusted OV/EV code-signing certificate (paid) removes the warning.
- **Local preview:** `npx serve website` then open the printed URL, or just open
  `index.html` in a browser.
- **Brand:** colors mirror the app (`src/renderer/src/styles/globals.css`) and
  the octopus mark comes from `src/renderer/src/components/SylorLogo.tsx`; the
  page adapts to light/dark via `prefers-color-scheme`.
