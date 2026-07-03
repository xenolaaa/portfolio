# La Schaffer — Portfolio

A fast, animated, fully static portfolio site. No frameworks, no build step, no monthly
fees. Just HTML, CSS, and a little JavaScript — which means it will load instantly and can
be hosted **for free** almost anywhere.

Everything below is written for a non-developer. Take it one section at a time.

---

## 1. What's in here

```
portfolio/
├─ index.html                     ← the home page (hero, fast facts, work, about, contact)
├─ work/                          ← one page per case study
│  ├─ chick-fil-a.html
│  ├─ amex-travel.html
│  ├─ marta.html
│  ├─ arthritis-foundation.html
│  └─ mastercard-touchcard.html
├─ assets/
│  ├─ css/style.css               ← ALL the styling. Change colors/fonts here.
│  ├─ js/main.js                  ← the animations & mobile menu
│  ├─ img/                        ← images (favicon, social image, your photos go here)
│  └─ la-schaffer-resume.pdf      ← your résumé (already added — replace anytime)
└─ README.md                      ← this file
```

## 2. See it on your computer right now

Just **double-click `index.html`** — it opens in your browser. That's it for a quick look.

(A few interactions load smoother when served by a tiny local web server. If you want the
"real" experience: open Terminal, type `cd ` then drag the `portfolio` folder onto the
window and press Return, then run `python3 -m http.server 8000`, and visit
`http://localhost:8000`. Totally optional.)

---

## 3. Make it yours (the fill-in-the-blanks list)

The site is **live-ready as-is**, but these swaps take it from "great template" to "hire her":

| What | Where | How |
|---|---|---|
| **Your photo** | About section | Save a portrait as `assets/img/portrait.jpg`, then in `index.html` search for `DROP YOUR PORTRAIT` and follow the note. |
| **Project images** | Each case study | Every gray placeholder tells you the exact filename to save (e.g. `assets/img/cfa-hero.png`). Drop images into `assets/img/` and they appear. Skip any you can't show for NDA reasons — the design looks finished without them. |
| **Real outcome metrics** | Case studies | Search each file for `Add %` / `Add #` and replace with real numbers when you can share them. The pink dashed boxes (`callout`) are private notes to yourself — delete them before publishing. |
| **LinkedIn link** | `index.html` | Search for `linkedin.com/` and paste your real profile URL. |
| **Résumé** | already wired up | Replace `assets/la-schaffer-resume.pdf` with a newer file (keep the same name). |

**Project list thumbnails:** each row on the home page has a colored placeholder labeled with
a filename (`cfa.jpg`, `amex.jpg`, etc.). To use a real image, open `index.html`, find that
project's `work-item__media`, and replace the inner placeholder with an image, e.g.:
```html
<span class="work-item__media"><img src="assets/img/cfa.jpg" alt="Chick-fil-A order flow"></span>
```

**Don't want the "swap me" notes to show?** They live inside the gray placeholders and the
pink dashed `callout` boxes. Once you've added real content, just delete those bits — or
leave them; they only show to you until you replace them.

### Changing colors or fonts
Open `assets/css/style.css`. The very top (`:root`) has every color and font in one place:
```css
--pink:   #ff2e97;   --orange: #ff6a2b;
--green:  #14f195;   --purple: #a855f7;
```
Change a value there and it updates across the entire site instantly. Each project's accent
color is set by the `data-accent="pink|orange|green|purple"` attribute on its page.

---

## 4. Put it online — for free (this replaces Webflow)

You have a few good options. **Cloudflare Pages** and **Netlify** are both free forever for a
site like this, include free HTTPS, and let you use `laschaffer.com`. Pick ONE.

### 🟢 Easiest: Netlify Drop (no account gymnastics, ~2 minutes)
1. Go to **https://app.netlify.com/drop**
2. Drag the **`portfolio` folder** onto the page.
3. It's live instantly at a `something.netlify.app` URL. Done.
4. To use your domain: in the site's **Domain settings → Add custom domain**, enter
   `laschaffer.com`, and follow their DNS instructions (see §5).
5. To update later, drag the folder again (or connect GitHub — below — so it auto-updates).

### 🟢 Best long-term: Cloudflare Pages or Netlify via GitHub (auto-deploys on every change)
1. Put this `portfolio` folder in its own GitHub repository (I can do this for you — just ask).
2. In **Cloudflare Pages** (dash.cloudflare.com → Workers & Pages → Create → Pages) **or**
   **Netlify** (Add new site → Import from Git), connect that repo.
3. Build settings: **there is no build step.** Leave the build command **empty** and set the
   output/publish directory to **`/`** (the root of the repo). Deploy.
4. Every time the repo changes, the site rebuilds automatically.

> Also fine: **GitHub Pages** (free) and **Vercel** (free) — same idea. Any static host works
> because there's nothing to compile.

---

## 5. Point laschaffer.com at the new site & stop paying Webflow

1. **First, deploy** using §4 and confirm the site works on the temporary URL.
2. In your new host (Netlify/Cloudflare), **add `laschaffer.com` as a custom domain.** It will
   show you the exact DNS records to set (an `A` record and/or `CNAME`, or nameservers for
   Cloudflare).
3. Update those DNS records **wherever your domain is registered** (e.g. GoDaddy, Google
   Domains/Squarespace, Namecheap). This is the step that moves your domain off Webflow.
4. Wait for it to take effect (minutes to a few hours). HTTPS turns on automatically.
5. Once `laschaffer.com` loads the new site, **downgrade/cancel your Webflow subscription.**
   Don't cancel before the DNS switch is confirmed working.

⚠️ I can guide you through the DNS records, but you should make the actual domain/registrar
and billing changes yourself — those touch your accounts and payment.

---

## 6. Accessibility & performance notes (talking points for interviews)
- Semantic HTML, keyboard-navigable, visible focus states, skip link.
- All motion is disabled automatically for visitors who set "reduce motion."
- Neon is used for large text/accents only; body text stays high-contrast on near-black.
- No tracking, no cookies, no frameworks — loads fast on any connection.

Yes, you can say your portfolio site itself is WCAG-minded. That's on-brand for you.
