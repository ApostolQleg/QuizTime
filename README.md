# QuizTime Frontend

Frontend application for QuizTime, built with React and Vite.

It supports guest and authenticated quiz flows, quiz authoring, results history, profile management, and Google OAuth integration.

## Table of Contents

- [Overview](#overview)
- [Main Features](#main-features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Routing](#routing)
- [Configuration](#configuration)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Backend Integration](#backend-integration)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)
- [License](#license)
- [Authors](#authors)

## Overview

QuizTime Client is a single-page application (SPA) for creating and taking quizzes.

Core flows:

- Browse quizzes with search, sort, and pagination.
- Take quizzes as guest or logged-in user.
- Save and review results (for authenticated users).
- Create, edit, and manage authored quizzes.
- Manage profile settings, including password change and account deletion.

## Main Features

- Authentication: email/password registration and login, verification code flow, Google OAuth login and account linking.
- Quiz management: create, update, delete, and manage quizzes with a question/option editor.
- Quiz sessions and results: interactive quiz flow, result saving, and result details/history.
- Profile: private profile management, public profile pages, password change, account deletion, and avatar color generation.
- UX: responsive interface with Tailwind CSS v4 and app-wide theme variables.

## Tech Stack

- React 19
- React Router 7
- Vite 7
- Tailwind CSS 4 (via @tailwindcss/vite)
- Google OAuth (@react-oauth/google)
- ESLint 9

## Project Structure

```text
src/
    app/              # App shell, routes, layout, providers, app-level pages
    constants/        # Centralized app constants and configuration values
    features/         # Domain modules (auth, profile, quizzes, results)
        auth/
        profile/
        quizzes/
        results/
    shared/           # Reusable cross-feature modules
        api/          # API client and headers
        components/   # Shared UI blocks (grid, cards, toolbar, sort)
        hooks/        # Shared hooks (debounce, auto reload)
        libs/         # Shared utils (jwt, formatDateTime)
        ui/           # Low-level UI primitives
    styles.css        # Global styles and theme tokens
```

## Routing

Configured in `src/app/AppRoutes.jsx`.

- / - Quizzes list
- /my-quizzes - Current user's quizzes
- /login - Login page
- /register - Registration page
- /results - Results list
- /help - Help page
- /profile - Current user profile
- /quiz/:quizId - Quiz attempt page
- /result/:quizId/:resultIdParam - Quiz result details page
- /create - Quiz creation page
- /manage/:quizId - Quiz edit/manage page
- /user/:userId - Public profile page
-   -   - Not found page

## Configuration

Global app constants are centralized in `src/shared/config/config.js`.

It currently includes:

- API pagination limits (`API_CONFIG`)
- Validation/form constraints (`QUIZ_CONSTRAINTS`)
- Auto-reload timeout (`AUTO_RELOAD_CONFIG`)
- Color animation settings (`COLOR_ANIMATION_CONFIG`)
- Sort options labels and ids (`SORT_OPTIONS`)

## Prerequisites

- Node.js 18+ (recommended)
- npm 9+

## Installation

```bash
git clone <your-repository-url>
cd QuizTime
npm install
```

Start development server:

```bash
npm run dev
```

## Environment Variables

Create a `.env` file in the project root:

```env
VITE_GOOGLE_CLIENT_ID=your_google_client_id
VITE_API_URL=http://localhost:3000/api
```

Notes:

- `VITE_GOOGLE_CLIENT_ID` is consumed in `src/app/main.jsx` by `GoogleOAuthProvider`.
- `VITE_API_URL` is consumed in `src/shared/api/client.js` as `API_URL`.
- `AUTH_URL` is derived from `API_URL` by replacing `/api` with `/auth`.

## Available Scripts

- `npm run dev` - Start Vite dev server.
- `npm run build` - Create production build.
- `npm run preview` - Preview production build locally.
- `npm run lint` - Run ESLint.

## Backend Integration

The frontend expects a backend that provides these route groups:

- `/auth` (register, login, Google auth, verification code, account link)
- `/api/quizzes`
- `/api/results`
- `/api/user`

Auth token behavior:

- Token is read from localStorage key `token`.
- User object is read from localStorage key `user`.
- Authorization header uses `Bearer <token>` when available.

## Deployment

Vercel SPA rewrite is configured in `vercel.json`:

- All routes are rewritten to `/index.html`.

Build command:

```bash
npm run build
```

Output directory:

- `dist`

## Troubleshooting

- Google login fails immediately: verify `VITE_GOOGLE_CLIENT_ID` is set correctly.
- API requests fail in development: confirm backend is running and verify `VITE_API_URL` usage in `src/shared/api/client.js`.
- Refreshing non-root routes returns 404 in production: ensure hosting has SPA rewrite support (already set for Vercel).

## License

MIT. See [LICENSE](LICENSE) for details.

## Authors

- **Oleg Bondarenko** - _Lead Developer_
    - National Technical University of Ukraine "Igor Sikorsky Kyiv Polytechnic Institute"
    - Faculty of Informatics and Computer Engineering (FIOT)
    - Group: **IM-54**
    
- **dimpennn** - _Partner Developer_
    - National Technical University of Ukraine "Igor Sikorsky Kyiv Polytechnic Institute"
    - Faculty of Informatics and Computer Engineering (FIOT)
    - Group: **IM-54**
