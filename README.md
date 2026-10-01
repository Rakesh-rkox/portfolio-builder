# Portfolio Builder (Claude Skill)

A Claude skill that interviews you for your details and builds a finished, animated personal portfolio website (Vite + React) from a bundled template.

**Template features:** sticky red hero with scroll-out blur, script-font name, typewriter intro, floating GitHub/LinkedIn bubbles, project poster grid, horizontal-scroll About cards, skills grid, contact CTA, particle backgrounds.

## Install

**Claude Code**
```bash
git clone https://github.com/Rakesh-rkox/portfolio-builder ~/.claude/skills/portfolio-builder
```

**Claude desktop / web**
Download the repo as a ZIP (make sure the top-level folder is `portfolio-builder/` containing `SKILL.md`), then upload it under Settings → Capabilities → Skills.

## Use

Say any of:
- "build my portfolio"
- "make my portfolio website"
- `/portfolio-builder`

Claude asks for your name, role, intro, links, projects, About cards, skills, colours and portrait, then generates the site, runs `npm install` + `npm run build`, and checks it in a browser if one is available.

## After it's built

```bash
cd <your-portfolio-folder>
npm install
npm run dev      # local preview
npm run build    # outputs dist/ — upload to Vercel or Netlify
```

All text lives in `src/content.js`. Theme colours are in the `:root` block of `src/styles.css`.

## Repo layout

```
SKILL.md      # skill instructions
template/     # Vite + React template copied for each new portfolio
```

## Requirements

Node.js 18+ and npm.

## License

MIT
