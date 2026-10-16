---
description: "Workspace agent instructions for Galaxy Renovations. Use these rules when editing the backend or frontend projects in this multi-root workspace."
---

# Galaxy Renovations Workspace Instructions

## Workspace overview

This workspace contains two separate projects:

- `GalaxyRen_Admin/` — Node/Express backend server with MongoDB, authentication, Jade views, file upload, and API routes for rentals, services, tools, contacts, mail, and users.
- `GalaxyRen/` — React frontend application bootstrapped with Create React App, including Redux state, router-based navigation, admin forms, and a public landing site.

There is no shared root `package.json`; each project manages dependencies independently in its own folder.

## When editing code

- For backend/API/server work, focus on `GalaxyRen_Admin/`.
- For UI, React, client-side state, or deployment of the public site, focus on `GalaxyRen/`.
- Keep backend and frontend changes separated unless the task explicitly requires cross-project coordination.

## Project-specific commands

### `GalaxyRen_Admin/`
- Install dependencies: `npm install`
- Run server: `npm start`
- Node engine target: `24.x`

### `GalaxyRen/`
- Install dependencies: `npm install`
- Start development server: `npm start`
- Build production app: `npm run build`
- Run tests: `npm test`
- Deploy to GitHub Pages: `npm run deploy`

## Project conventions

### Backend (`GalaxyRen_Admin/`)
- Uses Express routes under `routes/`.
- Uses Mongoose models under `models/`.
- Uses Jade templates under `views/`.
- Uses `public/` for static assets like images and styles.
- Uses `utils/db.js` for database connection.
- The backend is configured for Vercel/Heroku-style deployment with `vercel.json` and `Procfile`.

### Frontend (`GalaxyRen/`)
- Uses CRA file conventions under `src/`.
- Contains Redux code in `src/redux/` and shared API base URLs in `src/shared/`.
- Contains admin form components in `src/\u201cAdmin Forms\u201d/` and UI components under `src/components/`.
- Uses React Router, Redux Thunk, and socket.io client integration.

## How to answer user requests

- If the user asks to modify or extend the API, routes, database models, or server logic, make edits in `GalaxyRen_Admin/`.
- If the user asks to modify UI, frontend application behavior, page layout, styling, or React state, make edits in `GalaxyRen/`.
- If the user asks about running or debugging the project, reference the correct subfolder and script.

## Helpful notes for the agent

- Do not assume a single repository-level build command exists.
- Use the correct subproject folder when referencing package scripts.
- Prefer existing conventions in each folder rather than introducing new frameworks or structures unless the user explicitly requests them.
- When adding dependencies, update the appropriate `package.json` only.
- Do not move frontend files into the backend or vice versa unless the task explicitly requires architecture changes.
