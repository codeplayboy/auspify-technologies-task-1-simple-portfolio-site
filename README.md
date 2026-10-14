# Auspify Technologies Task - 1 (Simple Portfolio Site)

An editorial, responsive personal portfolio website for the Auspify Technologies full-stack development assignment. The site presents Arun S. as a full-stack developer through an art-directed introduction, About profile, Skills and tools, fictional Experience timeline, mock Projects, Process, CV download, and a working Contact flow.

> Portfolio content is intentionally marked as fictional/mock where it represents sample work or experience.

## What is included

- Responsive Home / Introduction section with newspaper-inspired art direction.
- About section with a full developer introduction and fictional portfolio context.
- Skills covering product thinking, frontend craft, backend systems, and visual direction.
- Technology marks for React, JavaScript, Node.js, Express, MongoDB, and Git.
- Experience with fictional companies: Northstar Systems, Morrow Labs, and Fieldnote Studio.
- Three complete mock case studies: Atlas Ledger, Northstar LMS, and Registrar.
- Interactive project case-study dialogs.
- Supplied interactive GLB figure rendered with Three.js, enhanced lighting, shadows, and pointer interaction.
- Downloadable sample CV at `public/downloads/arun-s-sample-cv.pdf`.
- Contact form with validation, loading, error, success, and API states.
- Reduced-motion support and keyboard-accessible project interactions.

## Technology

- React 19, Vite 6, Three.js, GLTFLoader, Express 5, and Lucide React.
- Responsive CSS with an editorial cobalt-and-paper visual system.

## Run locally

```bash
npm install
npm run dev
```

For the API-backed production shape:

```bash
npm run build
npm run server
```

The Express server serves `dist` and exposes `GET /api/health` and `POST /api/contact`. Contact submissions are acknowledged in memory for this assignment demo. Production use should connect the handler to a mail provider, database, spam protection, and abuse controls.

## Deployment

The repository includes `render.yaml` for a Render web service:

- Build command: `npm ci && npm run build`
- Start command: `npm run server`
- Health check: `/api/health`

The server reads the hosting provider's `PORT` environment variable and falls back to `4101` locally.

## Assignment delivery checklist

- [x] Responsive portfolio UI
- [x] Home, About, Skills, Projects, Process, and Contact sections
- [x] Project showcase with interactive detail dialogs
- [x] Contact form and API boundary
- [x] CV download
- [x] Supplied GLB model integrated in the hero
- [x] Production build verified with `npm run build`
- [ ] Public hosting URL
- [ ] GitHub repository URL
- [ ] Final screenshots / optional walkthrough video

## Credits

Special thanks to **Auspify Technologies** for providing the opportunity to complete this full-stack development task and for the practical brief that shaped this portfolio project.

Suggested hashtags: `#Auspify` `#AuspifyTechnologies` `#AuspifyInternship` `#AuspifyProjects`
