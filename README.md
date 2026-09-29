# Serong Ecom — Landing Page

A single-page, self-contained website for Serong Ecom (e-commerce mentorship &
Done-For-You Shopify service). Built with plain HTML, CSS and JavaScript —
no build step, no package manager, no framework.

## What's in this project

```
serong-ecom-project/
├── index.html     ← the entire website (HTML + CSS + JS + all images, one file)
└── README.md      ← this file
```

Everything — every screenshot, icon, and image on the page — is embedded
directly inside `index.html` as inline code, so there are **no missing
files and no broken links to worry about**. You can move this one file
anywhere and it will still work exactly the same.

The only things `index.html` loads from the internet are:
- **Google Fonts** (Manrope + Inter), for the typography.
- The **WhatsApp** (`wa.me`) and **Discord** (`discord.gg`) links, which are
  meant to open externally — that's intentional, not a dependency issue.

If Google Fonts is ever unreachable, the page automatically falls back to
the visitor's system fonts, so the site still works fine either way.

## How to deploy it

Because it's a single static HTML file, you can host it almost anywhere.
A few easy options:

**Netlify / Vercel (drag-and-drop, free)**
1. Go to netlify.com (or vercel.com) and sign in.
2. Drag the `index.html` file (or this whole folder) onto the dashboard.
3. Done — you'll get a live URL in seconds. You can rename it or connect
   your own domain afterward in the site settings.

**GitHub Pages**
1. Create a new GitHub repository.
2. Upload `index.html` to the repo (rename is not needed — GitHub Pages
   automatically serves `index.html` as the homepage).
3. In the repo's Settings → Pages, set the source to the `main` branch.
4. Your site will be live at `https://yourusername.github.io/reponame/`.

**Your own web host / cPanel**
1. Upload `index.html` into your site's `public_html` (or equivalent) folder.
2. That's it — no server setup, no database, no build process needed.

**Just testing locally**
Double-click `index.html` and it opens directly in your browser. No local
server required.

## Before you launch: things to double-check

### 1. WhatsApp number and Discord invite
Open `index.html` in any text editor and search for the word
`CONFIGURATION` (near the bottom, inside the `<script>` tag). You'll see:

```js
var WHATSAPP_NUMBER = "447529499294";
var CONTACT_EMAIL   = "hello@serongecom.com";
var DISCORD_URL     = "https://discord.gg/pXeW3j4VE";
```

- `WHATSAPP_NUMBER`: digits only, international format, no `+`, no spaces.
- `CONTACT_EMAIL`: shown in the footer.
- `DISCORD_URL`: your community invite link.

This is the **only place** you need to change these — every WhatsApp/Discord
button and link on the page (floating buttons, footer, final call-to-action,
and the application form) automatically pulls from these three variables
when the page loads.

### 2. Application form → WhatsApp
When someone submits the mentorship application form, the site builds a
pre-filled WhatsApp message from their answers and opens `wa.me` with that
message ready to send to the number above. No backend, database, or email
server is required — it all happens in the browser.

### 3. Testimonials, pricing, and proof screenshots
All testimonial text, pricing figures, and the "real results" screenshots
in the Results section are real content already added to the page — search
for the relevant heading text in `index.html` if you ever need to update,
add, or remove one.

### 4. Favicon
A simple emoji-style favicon is already set in the `<head>`. Swap it for a
proper logo file later if you'd like — just replace the `<link rel="icon">`
tag with a link to your own `favicon.ico` or `.png`.

## Notes on browser support

Built with modern, widely-supported CSS and vanilla JavaScript (flexbox,
CSS custom properties, `IntersectionObserver`, native smooth scrolling).
Works in all current versions of Chrome, Safari, Firefox and Edge, on both
desktop and mobile.

## Support

This file was generated with Claude. If you need further edits (new
sections, more testimonials, a different color, additional pages), just
share the file back in a Claude conversation and describe the change.
