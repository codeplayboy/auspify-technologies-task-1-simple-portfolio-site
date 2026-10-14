# Auspify Technologies Task - 1 (Simple Portfolio Site)

<p align="center">
  <img src="./public/images/arun-frontpage.png" alt="ARUN.S portfolio editorial cover" width="900" />
</p>

<p align="center"><strong>An editorial portfolio for a full-stack developer — where product thinking, interface craft, and working software meet.</strong></p>

<p align="center">
  <a href="https://github.com/codeplayboy/auspify-technologies-task-1-simple-portfolio-site/actions/workflows/ci.yml"><img src="https://github.com/codeplayboy/auspify-technologies-task-1-simple-portfolio-site/actions/workflows/ci.yml/badge.svg" alt="Build status" /></a>
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=111" alt="React 19" />
  <img src="https://img.shields.io/badge/Three.js-GLB-black?logo=threedotjs" alt="Three.js" />
  <img src="https://img.shields.io/badge/Assignment-Auspify%20Task%201-062B8A" alt="Auspify Task 1" />
</p>

An editorial, responsive personal portfolio website for the Auspify Technologies full-stack development assignment. The site presents Arun S. as a full-stack developer through an art-directed introduction, About profile, Skills and tools, fictional Experience timeline, mock Projects, Process, CV download, and a working Contact flow.

> Portfolio content is intentionally marked as fictional/mock where it represents sample work or experience.

## The experience

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

## Project map

| Area | Purpose |
| --- | --- |
| `src/App.jsx` | Page structure, project data, experience timeline, contact flow |
| `src/components/CharacterScene.jsx` | Interactive GLB loading, lighting, shadows, and pointer response |
| `src/*.css` | Editorial tokens, responsive layout, motion, and component styling |
| `server/index.js` | Express static server and contact API boundary |
| `public/models` | Supplied GLB portfolio character |
| `public/images` | Editorial imagery, project imagery, and identity assets |
| `render.yaml` | Render deployment definition |
| `docs/architecture.md` | Implementation and deployment notes |

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

## Repository

Public source repository: [github.com/codeplayboy/auspify-technologies-task-1-simple-portfolio-site](https://github.com/codeplayboy/auspify-technologies-task-1-simple-portfolio-site)

The repository is ready to connect to Render using the included `render.yaml`. A public hosting URL should be added here after the Render service is created and its `/api/health` endpoint has been verified.

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
