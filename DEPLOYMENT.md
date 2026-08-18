# Deploying to GitHub Pages

## Short version

1. Push this folder's **contents** to a new GitHub repo on the `main` branch.
   Name the repo **anything you like**.
2. In the repo: **Settings → Pages → Build and deployment → Source = GitHub Actions**.
3. Open the **Actions** tab and wait for "Deploy to GitHub Pages" to finish.
   It prints your live URL.

## Why the repo name doesn't matter here

Unlike the Vite projects, this one needs no base-path configuration at all.
Every path in the source is already written **relative**, not absolute:

```html
<link rel="stylesheet" href="css/style.css">   <!-- not "/css/style.css" -->
<script src="js/app.build.js"></script>
```

```js
export const STAGE_PATH  = 'assets/stage/';    // not "/assets/stage/"
export const ACTIVE_PATH = 'assets/aventador/';
```

A relative path resolves against whatever folder the page is currently in, so
the same build works at `username.github.io/any-name/`, at a custom domain, or
opened from `build/` locally. Nothing to configure, nothing to rename.

## Running it locally

```bash
npm install        # npm.cmd install if PowerShell blocks "npm"
npm run build-css  # compiles src/sass/style.scss -> src/static/css/style.css
npm run dev        # dev server on http://localhost:5000
```

To produce the deployable folder yourself:

```bash
npm run build      # writes build/
```

## What the build actually does

- `npm run build-css` compiles the Sass into `src/static/css/style.css`.
- `npm run build` runs webpack, which bundles `src/app/*.js` into
  `build/js/app.build.js` and copies everything in `src/static/` alongside it.

The result in `build/` is a plain static site — HTML, CSS, JS and assets — which
is exactly what GitHub Pages serves.

## Notes

- **Don't commit `node_modules/` or `build/`** — both are in `.gitignore`, and
  the workflow regenerates them.
- **This is a heavy page.** The car model is ~12 MB, the audio track ~3 MB, and
  the HDR environment ~1.5 MB. Well within Pages' limits, but the first load
  takes a while on a slow connection. That's inherent to the project, not a
  misconfiguration.
- **`src/blender-source/` is ~26 MB** of Blender and Photoshop source files.
  They are not used by the build at all — they're there so you can edit the 3D
  model. Deleting the folder makes the repo much lighter and changes nothing
  about the live site.
- **The "View on GitHub" button** in the top corner points at the original
  author's repository. That's fair attribution under the MIT license; if you'd
  rather it point at your own copy, edit the link in `src/static/index.html`.

## If the page comes up blank

Open the browser console (F12) and look for failed requests. Also confirm Pages
**Source** is set to **GitHub Actions**, not "Deploy from a branch" — the branch
method would serve the raw source folder, which has no `js/app.build.js` in it
because that file only exists after webpack runs.
