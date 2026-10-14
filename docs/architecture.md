# Architecture and delivery notes

## Runtime shape

The project is a Vite-built React client with an Express server around the production output. The client owns the portfolio experience and loads the supplied GLB lazily through Three.js. The server owns static delivery and the contact API boundary.

```text
Browser
  ├─ Vite React application
  │    ├─ editorial sections and project dialogs
  │    ├─ responsive CSS and reduced-motion states
  │    └─ lazy Three.js GLB scene
  └─ /api/contact → Express acknowledgement
```

## Build and deployment

1. `npm ci` installs the locked dependency graph.
2. `npm run build` creates `dist`.
3. `npm run server` serves `dist` and the API.
4. The host injects `PORT`; local development defaults to `4101`.
5. `/api/health` provides a deployment health check.

## Production follow-ups

- Replace the in-memory contact acknowledgement with a transactional email provider or database-backed message queue.
- Add rate limiting, bot protection, and server-side validation to the contact endpoint.
- Connect the repository to Render using `render.yaml` and record the deployed URL in the README and submission notes.
- Replace mock experience and project language with verified professional history when the portfolio is used publicly.
