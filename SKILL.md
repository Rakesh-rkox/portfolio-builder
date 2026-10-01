---
name: portfolio-builder
description: Interviews the user for their personal details (name, role, intro, links, projects, about cards, skills, colours, portrait) and builds a finished animated portfolio website (Vite + React) from a bundled template with a red-hero, scroll-out, horizontal-scroll-about design. Use when the user says "build my portfolio", "portfolio builder", "make my portfolio website", or invokes /portfolio-builder.
---

# Portfolio Builder

Builds a personal portfolio site from the bundled template in `template/` (relative to this file). The template has: sticky hero with scroll-out blur, script-font name, typewriter intro, floating GitHub/LinkedIn bubbles, project poster grid, horizontal-scroll About cards, skills grid, contact CTA, particle backgrounds. All content lives in `template/src/content.js`; theme colours in the `:root` block of `template/src/styles.css`.

Never copy any real person's name, photo or text into the result. Only use what the user provides.

## Step 1 — Interview the user
Use AskUserQuestion (max 4 questions per call, several rounds) or plain questions. Collect, skipping anything already supplied:

**Round 1 — Identity**
- Full name, and the first name to show large in script font
- Role/title (e.g. "Full Stack Developer")
- 1–2 sentence intro (offer to draft one from their answers)
- Email

**Round 2 — Links & look**
- GitHub URL, LinkedIn URL (either can be blank → bubble hidden)
- "Previous portfolio" link (optional)
- Theme: keep red, or pick another hero colour (get a hex; derive `--bg`, `--accent`, `--accent-text` (lighter tint), `--accent-rgb`, and the hero bottom-gradient tints in styles.css)
- Path to portrait image (transparent PNG/WebP best); if none, keep placeholder and say so

**Round 3 — Projects** (loop until they say done)
For each: title, one-line blurb, tech tags, link (optional), screenshot path (optional).

**Round 4 — About cards**
- Identity card: headline role + 4–6 skill chips
- Narrative card: short paragraph about them + 1–2 footer facts
- Education card: degree/institution/years/status
- Offer extra cards (experience, interests, achievements)

**Round 5 — Skills & contact**
- Skills: name, what they use it for, tag (e.g. version/area), level (Daily driver / Proficient / Learning)
- Contact heading line and button text (offer defaults)
- Output folder name/location (default: `./<firstname>-portfolio` in the current directory)

Confirm a short summary of everything before building.

## Step 2 — Build
1. Copy `template/` to the output folder (excluding nothing; it has no node_modules).
2. Rewrite `src/content.js` with the user's data, keeping the same exported shapes (`profile`, `nav`, `projects`, `aboutCards`, `skills`, `contact`).
3. Copy the portrait to `public/` and project screenshots to `public/projects/`; update paths.
4. If a custom colour was chosen, update `:root` and the hero `::after` gradient tints in `src/styles.css`.
5. Update `<title>` in `index.html` and the `name` in `package.json`.
6. Run `npm install` then `npm run build`; fix any errors.
7. Start `npm run dev`, open it with chrome-devtools (if available), screenshot the hero, scroll through About, and check the console for errors. Stop the dev server when done.

## Step 3 — Hand off
Tell the user: output location, how to run (`npm run dev`), how to deploy (`npm run build` → upload `dist/` to Vercel/Netlify), and that all text edits go in `src/content.js`. Offer follow-ups: project detail modal, dark/light toggle, contact form, extra sections.
