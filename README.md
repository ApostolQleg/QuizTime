# QuizTime Frontend

Modern, responsive React 19 SPA for creating, managing, and taking quizzes. Built with Vite, React Router, and Tailwind CSS 4.

🌐 **Live Site:** [quiz-time-with-react.vercel.app](https://quiz-time-with-react.vercel.app/)  
🔗 **Backend Repository:** [QuizTime-backend](https://github.com/ApostolQleg/QuizTime-backend)

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Architecture](#architecture)
- [Routing](#routing)
- [State Management](#state-management)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Development Workflow](#development-workflow)
- [API Integration](#api-integration)
- [Styling & Theme](#styling--theme)
- [Browser Support](#browser-support)
- [Deployment](#deployment)
- [Performance](#performance)
- [Troubleshooting](#troubleshooting)
- [License](#license)
- [Authors](#authors)

## Overview

QuizTime Frontend is a feature-rich single-page application (SPA) for the QuizTime platform. Users can browse quizzes, create their own, take quizzes, review results, and manage their profiles—all with a smooth, responsive experience.

**Key User Flows:**

1. **Browse** - Explore quizzes with search and sorting
2. **Create** - Author new quizzes with an intuitive editor
3. **Attempt** - Take quizzes with real-time feedback
4. **Manage** - Edit or delete owned quizzes
5. **Review** - View result history and past quiz attempts
6. **Profiles** - View and manage user profiles

## Key Features

### Authentication & Security

- Email/password registration with verification flow
- Email verification codes (5-minute expiration)
- JWT token management with expiration checking
- Google OAuth 2.0 integration
- Link Google account to existing email account
- Secure password change functionality
- Account deletion with confirmation

### Quiz Management

- **Create** - Rich quiz editor with dynamic question/option management
- **Edit** - Modify quizzes you've created
- **Manage** - Dashboard showing all authored quizzes
- **Quiz Data** - Title, description, and questions with answer options

### Quiz Experience

- **Browse** - Paginated quiz list with search and sorting options
- **Attempt** - Interactive quiz flow with progress tracking
- **Results** - Score calculation and immediate feedback
- **History** - View past quiz attempts and performance

### User Profiles

- **Private Profile** - Manage personal settings and preferences
- **Public Profile** - View other users' profile and their quizzes
- **Avatar** - Algorithmic color generation for visual identity
- **Nickname** - Custom display name (3-20 characters)

### UX/Design

- **Responsive Design** - Mobile-first, works on all devices
- **Loading States** - Loading indicators during data fetching
- **Toast Notifications** - Non-intrusive feedback system (max 3 concurrent)
- **Page Auto-reload** - Automatic page refresh every 5 minutes when tab is visible

## Tech Stack

- **React** - 19.x (latest, with hooks)
- **React Router** - 7.x (SPA routing)
- **Vite** - 7.x (build tool, dev server)
- **Tailwind CSS** - 4.x (via @tailwindcss/vite)
- **Zustand** - 5.x (state management)
- **Google OAuth** - @react-oauth/google 0.13.x
- **ESLint** - 9.x (code quality)
- **Biome** - 2.4.x (formatting/linting)
- **Vitest** - 3.x (unit testing)
- **SASS** - CSS preprocessing

## Project Structure

```
src/
├── app/                        # Application bootstrap & routing
│   ├── App.jsx                # Root component
│   ├── AppRoutes.jsx          # Route definitions
│   └── main.jsx               # Entry point
├── entities/                   # Business entities (domain layer)
│   └── quiz/
│       └── ui/                # Quiz entity UI components
├── features/                   # Domain-specific feature modules
│   ├── auth/                  # Authentication feature
│   │   ├── api/               # Auth API calls
│   │   ├── hooks/             # Auth hooks (useAuth)
│   │   ├── libs/              # Auth utilities
│   │   └── stores/            # Zustand auth store
│   ├── profile/               # User profile feature
│   │   ├── api/               # Profile API
│   │   ├── components/        # Profile UI
│   │   ├── hooks/             # Profile hooks
│   │   ├── libs/              # Profile utilities
│   │   └── stores/            # Profile store
│   ├── quizzes/               # Quiz management feature
│   │   ├── api/               # Quiz API calls
│   │   ├── components/        # Quiz components
│   │   ├── hooks/             # Quiz hooks
│   │   └── stores/            # Quiz state management
│   └── results/               # Results feature
│       └── api/               # Results API calls
├── pages/                      # Page components (route-level)
│   ├── Quizzes.jsx            # Quiz browse page
│   ├── MyQuizzes.jsx          # User's quizzes
│   ├── Quiz.jsx               # Quiz attempt page
│   ├── Edit.jsx               # Quiz editor
│   ├── Results.jsx            # Results list
│   ├── Login.jsx              # Login page
│   ├── Register.jsx           # Registration page
│   ├── Profile.jsx            # User profile
│   ├── PublicProfile.jsx      # Other user's profile
│   ├── Help.jsx               # Help/FAQ page
│   └── NotFound.jsx           # 404 page
├── shared/                     # Cross-feature utilities
│   ├── api/
│   │   └── client.js          # Fetch-based API client with interceptors
│   ├── assets/                # Icons, images
│   ├── config/
│   │   └── config.js          # Global constants
│   ├── hooks/
│   │   ├── useAutoReload.js   # Periodic refresh hook
│   │   ├── useDebounce.js     # Debounce hook
│   │   └── useInfiniteList.js # Infinite scroll hook
│   ├── libs/
│   │   ├── formatDateTime.js  # Date formatting
│   │   ├── jwt.js             # JWT parsing
│   │   ├── memoizer.js        # Caching utility
│   │   ├── pagination.js      # Pagination logic
│   │   └── queue.js           # Task queue
│   └── ui/                     # Reusable UI components
│       ├── Avatar.jsx
│       ├── Button.jsx
│       ├── Input.jsx
│       └── ... (other primitives)
├── widgets/                    # Large compositional blocks
│   ├── footer/
│   ├── header/
│   ├── quiz-grid/
│   └── quiz-toolbar/
├── styles.css                  # Global styles & theme tokens
```

## Architecture

**Layer Design Pattern:**

- **Pages** - Route-level containers that compose features
- **Features** - Domain modules with isolated stores/API
- **Entities** - Shared business logic components
- **Shared** - Cross-cutting utilities and primitives
- **Widgets** - Large reusable UI blocks

**Benefits:**

- Scalable module structure
- Clear separation of concerns
- Easy to test and maintain
- Avoids prop drilling with Zustand stores

## Routing

Configured in [src/app/AppRoutes.jsx](src/app/AppRoutes.jsx):

| Route                            | Page          | Auth     | Purpose                    |
| -------------------------------- | ------------- | -------- | -------------------------- |
| `/`                              | Quizzes       | Optional | Browse all public quizzes  |
| `/my-quizzes`                    | MyQuizzes     | Required | View owned quizzes         |
| `/create`                        | Edit          | Required | Create new quiz            |
| `/manage/:quizId`                | Edit          | Required | Edit quiz                  |
| `/quiz/:quizId`                  | Quiz          | Optional | Take quiz                  |
| `/result/:quizId/:resultIdParam` | Quiz          | Optional | View result details        |
| `/results`                       | Results       | Required | View result history        |
| `/profile`                       | Profile       | Required | Manage own profile         |
| `/user/:userId`                  | PublicProfile | Optional | View user's public profile |
| `/login`                         | Login         | Guest    | Login page                 |
| `/register`                      | Register      | Guest    | Registration page          |
| `/help`                          | Help          | Optional | FAQ/help page              |
| `/*`                             | NotFound      | Optional | 404 page                   |

## State Management

**Zustand Stores** (in `features/*/stores/`):

- `authStore.js` - Authentication state, token, user info
- `profilePageStore.js` - Current user profile data and settings
- `quizEditorStore.js` - Quiz creation/editing form state
- `quizSessionStore.js` - Active quiz attempt state

**Benefits of Zustand:**

- Minimal boilerplate vs Context API
- Direct store access without Provider hell
- Automatic re-renders on state changes
- Simpler API calls without Redux complexity

## Prerequisites

- **Node.js/Bun** - 18.x or higher
- **npm/bun** - Latest version
- **Git** - For version control
- **Modern Browser** - Chrome, Firefox, Safari, Edge (last 2 versions)

## Installation

1. **Clone the repository**

    ```bash
    git clone <repo-url>
    cd QuizTime-frontend
    ```

2. **Install dependencies**

    ```bash
    bun install
    # or
    npm install
    ```

3. **Configure environment variables** (see [Environment Variables](#environment-variables))

    ```bash
    cp .env.example .env.local  # if available
    # or create .env.local manually
    ```

4. **Verify setup**
    ```bash
    bun run lint
    ```

## Environment Variables

Create a `.env.local` file in the project root:

```env
# Backend API
VITE_API_URL=http://localhost:3000

# Google OAuth
VITE_GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com

# Environment
VITE_ENV=development
```

**Important:**

- `VITE_` prefix required for Vite to expose variables
- Google OAuth ID from [Google Cloud Console](https://console.cloud.google.com/)
- For production: Set `VITE_API_URL` to production backend URL

## Available Scripts

```bash
# Development server (with HMR)
bun run dev
# Opens http://localhost:5173

# Production build
bun run build
# Outputs to dist/

# Preview production build
bun run preview

# Code quality
bun run lint

# Unit tests
bun run test

# Watch tests
bun run test:watch
```

## Development Workflow

1. **Start dev server**

    ```bash
    bun run dev
    ```

2. **Hot Module Replacement (HMR)**
    - Automatic reload on file changes
    - State preservation when possible

3. **Open browser**
    - Navigate to `http://localhost:5173`
    - Login with test credentials or Google OAuth

4. **Debug**
    - React DevTools extension
    - Network tab for API calls
    - Console for errors

5. **Code changes**
    - Changes reflect instantly via HMR
    - Linting errors shown in terminal

## API Integration

**Client Configuration:** [src/shared/api/client.js](src/shared/api/client.js)

Fetch-based API client with interceptors:

- Automatic JWT token in `Authorization` header
- Request/response error handling
- JSON parsing and validation

**API Call Pattern:**

```javascript
// Example in features/auth/api/
export const login = async (email, password) => {
	return await client.post(`${AUTH_URL}/login`, { email, password });
};
```

**Features:**

- JWT token auto-attached from localStorage
- Global error handling with error messages
- Response caching with Memoizer utility
- Support for query parameters

## Styling & Theme

**Tailwind CSS v4:**

- Utility-first CSS framework
- Configured via `@tailwindcss/vite` plugin
- No separate config file needed

**Theme System:** [src/styles.css](src/styles.css)

```css
/* Global CSS variables for theme */
:root {
	--color-primary: #4caf50;
	--color-secondary: #2196f3;
	/* ... more variables */
}
```

**Dark Mode:**

- CSS variables swap on class change
- Persistent to localStorage
- Smooth transitions

**Custom Components:**

- Tailwind utilities for consistency
- No CSS-in-JS (pure Tailwind)
- Responsive design built-in

## Browser Support

| Browser | Minimum Version | Status             |
| ------- | --------------- | ------------------ |
| Chrome  | 90+             | ✅ Fully supported |
| Firefox | 88+             | ✅ Fully supported |
| Safari  | 14+             | ✅ Fully supported |
| Edge    | 90+             | ✅ Fully supported |
| IE 11   | -               | ❌ Not supported   |

## Deployment

### Vercel (Recommended)

1. **Connect repository**
    - Link GitHub repo to Vercel
2. **Configure environment**
    - Set `VITE_API_URL` to production backend
    - Set `VITE_GOOGLE_CLIENT_ID`
3. **Deploy**
    ```bash
    vercel deploy
    # or push to main branch (auto-deploy)
    ```

### Manual Build & Deploy

```bash
# Build production bundle
bun run build

# Upload dist/ folder to your host
# Configure rewrite: /* → /index.html (for SPA routing)
```

**Vercel Configuration:** [vercel.json](vercel.json)

- Rewrite all routes to index.html for SPA
- Cache static assets with long TTL

## Performance

**Optimization Techniques:**

- Code splitting via React Router lazy routes
- Image optimization (WebP, responsive sizes)
- CSS purging in production
- Tree-shaking of unused Tailwind utilities
- Bundle size: ~150KB gzipped

**Best Practices:**

- Use React DevTools Profiler to identify slow components
- Implement React.memo() for expensive child components
- Lazy load routes with `React.lazy()`
- Memoize expensive computations with useMemo

## Troubleshooting

### Port 5173 already in use

```bash
# Kill process using port 5173
# Or use custom port:
bun run dev -- --port 5174
```

### Google OAuth not working

- Verify Client ID in `.env.local`
- Check origin in Google Cloud Console settings
- Ensure same domain for localhost/production

### API 401 errors (Unauthorized)

- JWT token expired: Re-login required
- Token not in localStorage: Check browser DevTools Storage
- Backend not returning token: Check backend logs

### Build errors

```bash
# Clear cache and reinstall
rm -rf node_modules bun.lock
bun install
bun run build
```

### Hot reload not working

- Restart dev server: `Ctrl+C` then `bun run dev`
- Clear browser cache
- Check terminal for compilation errors

## License

MIT - See LICENSE file

## Authors

- **Oleg Bondarenko** - _Lead Developer_
    - National Technical University of Ukraine "Igor Sikorsky Kyiv Polytechnic Institute"
    - Faculty of Informatics and Computer Engineering (FIOT)
    - Group: **IM-54**
- **dimpennn** - _Partner Developer_
    - National Technical University of Ukraine "Igor Sikorsky Kyiv Polytechnic Institute"
    - Faculty of Informatics and Computer Engineering (FIOT)
    - Group: **IM-54**
