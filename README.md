# Serong Ecom — Landing Page

A single-page static website. Plain HTML, CSS and JavaScript — no build step,
no framework, no package manager.

## Folder structure

```
index.html                 ← the page (must stay in the top-level folder)
assets/
  css/style.css            ← all styling
  js/main.js               ← all behaviour + your WhatsApp / Discord / email settings
  img/                     ← all images (hero collage, results screenshots, favicon)
.nojekyll                  ← tells GitHub Pages to serve the files as-is
README.md                  ← this file
```

**Always upload the whole folder contents together.** `index.html` loads its
styling, scripts and images from the `assets` folder. If you upload only
`index.html`, the page will look blank/unstyled.

The only thing loaded from the internet is Google Fonts (if it can't load,
the page falls back to the visitor's system fonts and still works).

## Change your WhatsApp, Discord or email

Open `assets/js/main.js` and edit the lines at the top of the configuration block:

```js
var WHATSAPP_NUMBER = "447529499294";          // digits only, with country code, no +
var CONTACT_EMAIL   = "mentoshipserong@gmail.com";
var DISCORD_URL     = "https://discord.gg/F9rV4KPUnJ";
```

Every WhatsApp / Discord button and the application form use these values.

## Deploy

Your site's entry file must be named exactly `index.html` and sit at the top level.

**Vercel**
1. Put all the files from this folder in a Git repository (or deploy the folder with the Vercel CLI).
2. Import the repo in Vercel. Framework Preset: **Other**. Leave Build Command and Output Directory empty.
3. Deploy. (If you put the files inside a subfolder, set that folder as the Root Directory in Project Settings.)

**Netlify**
Drag the whole folder (not a zip) onto app.netlify.com/drop.

**GitHub Pages**
1. Upload everything in this folder to the root of a repository.
2. Settings → Pages → Source: "Deploy from a branch" → branch `main`, folder `/ (root)` → Save.
3. Open `https://YOURUSERNAME.github.io/REPONAME/` after a minute or two.

**Any web host / cPanel**
Upload everything into `public_html`.

**Preview on your computer**
Double-click `index.html`.

## If the page looks blank after deploying

1. Open your live URL, right-click → **View page source**. You should see the full page ending in `</html>`. If you see a 404 message instead, the host can't find `index.html` — it isn't at the top level or isn't named exactly `index.html`.
2. Press F12 → **Network** tab and reload. `assets/css/style.css`, `assets/js/main.js` and the images should all say 200. A 404 on them means the `assets` folder wasn't uploaded.
3. Check you are opening the website address (for example `https://your-site.vercel.app`), not a GitHub `blob/` or `raw.githubusercontent.com` link.
