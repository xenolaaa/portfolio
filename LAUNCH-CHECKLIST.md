# 🚀 Launch Checklist — laschaffer.com

Drop the files below into place, then commit & push via GitHub Desktop. Netlify deploys automatically.

## 1. Photos to drop in (exact paths)

Save each image with EXACTLY this filename, in the folder shown. JPG, reasonable web size (~1600–2400px wide, under ~500KB each is ideal).

### Home / About
- [ ] `assets/img/portrait.jpg` — your photo (already there? swap if you have a better one) — About page + classic page

### Murder on Vavianna Island — `assets/img/vavianna/`
- [ ] `assets/img/vavianna/hero.jpg` — wide production still (cast or set), 16:9
- [ ] `assets/img/vavianna/journey-map.jpg` — your guest journey map, extra-wide 21:9
- [ ] `assets/img/vavianna/scene-1.jpg` — favorite still #1, 16:10
- [ ] `assets/img/vavianna/scene-2.jpg` — favorite still #2, 16:10

### CLUE at Swan House — `assets/img/clue/`
- [ ] `assets/img/clue/hero.jpg` — Swan House or cast wide shot, 16:9
- [ ] `assets/img/clue/scene-1.jpg` — production still, 16:10
- [ ] `assets/img/clue/scene-2.jpg` — production still, 16:10

### Bèl Rèv — `assets/img/bel-rev/`
(already have: dreamers.jpg, stage.jpg — used on home page doors)
- [ ] `assets/img/bel-rev/seating-map.jpg` — the seating/ops map (a real ops artifact!)
- [ ] `assets/img/bel-rev/night-of.jpg` — volunteers / service in motion

### Dad's Garage — `assets/img/dads-garage/`
- [ ] `assets/img/dads-garage/house.jpg` — lobby, house, or marquee shot

### Social preview
- [ ] `assets/img/og.png` — currently a generated placeholder. Optional: replace with a 1200×630 image (your face + name looks great in link previews).

> The gray "Save as…" placeholder boxes on each page disappear automatically once the image exists — no HTML edits needed? **Not quite:** the placeholders are static. Ping Claude after dropping files and I'll swap each placeholder `<div class="ph">` for a real `<img>` with alt text in one pass — or do it yourself by replacing the placeholder div with `<img src="../assets/img/<path>" alt="(describe the photo)" loading="lazy" />`.

## 2. Résumés — `assets/resume/`

Each path page now has a résumé download button at the bottom. Drop PDFs with EXACTLY these names:

- [ ] `assets/resume/la-schaffer-resume-immersive.pdf` — Immersive path page button
- [ ] `assets/resume/la-schaffer-resume-ux.pdf` — Interactive/UX path page button
- [ ] `assets/resume/la-schaffer-resume-production.pdf` — Production path page button
- [ ] `assets/la-schaffer-resume.pdf` — the generalist "whole La" résumé (nav Résumé link, all pages). Already exists — make sure it's the CURRENT version matching the new three-path story.

Until a PDF exists, its button will 404 — so either drop the files before pushing, or temporarily point a button at the generalist PDF.

## 3. Before you push live

- [ ] Review the 4 legacy UX case studies (Amex, MARTA, Arthritis, Mastercard) — content hasn't been re-read since the revamp
- [ ] Vavianna consistency check: the "What I owned" production bullet + immersive-page tile still read slightly more ownership-y than the new honest credits in the overview — decide if that's fine
- [ ] `assets/img/arthritis-foundation/` contains an SOW `.docx` — client document, probably shouldn't ship publicly. Delete or move it out of the repo.
- [ ] Old screenshots have messy filenames ("Screen Shot 2023…") — they work, just untidy. Optional cleanup.
- [ ] Test the live site on your phone after deploy (real Safari ≠ the artifact preview)
- [ ] Check one link preview (paste laschaffer.com into a DM) to see the OG image
- [ ] Update LinkedIn summary (text from Claude) + link to laschaffer.com in your profile

## 4. Ship it

1. GitHub Desktop → review changes → push
2. Netlify auto-deploys in ~1 min
3. Hard-refresh laschaffer.com (cache-busting is handled, but first visit after deploy may lag a few seconds)
