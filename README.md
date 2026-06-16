# Kinnect — React Social Media Web Application

A modern social media front-end built with React. Browse a news feed, view user profiles, and manage authentication — all with a responsive UI inspired by popular social platforms.

## Features

- **Authentication** — Login, registration, and a forgot-password flow (email verification and password reset)
- **News feed** — Timeline of posts with likes, comments, and share counts
- **User profiles** — View profiles by username with user-specific posts
- **Social UI** — Sidebar navigation, top bar, right bar with online users and close friends
- **Post composer** — Share box for creating new posts (photo, tag, location, emoji options)
- **State management** — Redux Toolkit for auth, posts, and user data
- **Persistent sessions** — Auth state stored in `localStorage`

## Tech Stack

| Category | Technologies |
|----------|--------------|
| Framework | React 19 |
| Build tool | Vite 8 |
| Routing | React Router v6 |
| State | Redux Toolkit, React Redux |
| UI | Material UI (MUI), styled-components, Emotion |
| Forms | Formik, Yup |
| Utilities | timeago.js |

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or newer recommended)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd React-Social-Media-Web-Application

# Install dependencies
npm install
```

### Environment Variables

Create a `.env` file in the project root (optional):

```env
VITE_REACT_APP_PUBLIC_FOLDER=/assets/
```

This sets the base path for profile pictures and other public assets. If omitted, `/assets/` is used by default.

### Run Locally

```bash
# Start development server
npm start

# Build for production
npm run build

# Preview production build
npm run serve
```

The dev server runs at [http://localhost:5173](http://localhost:5173) by default.

## Demo Login

The app uses mock data (no backend API). You can sign in with any pre-seeded user from `src/dummyData.jsx`:

| Email | Password |
|-------|----------|
| `safak@example.com` | `123456` |
| `janell@example.com` | `123456` |
| `alex@example.com` | `123456` |

You can also register a new account from the registration page.

## Project Structure

```
src/
├── components/       # Reusable UI (Feed, Post, Share, Sidebar, Topbar, etc.)
├── pages/              # Route-level pages (Home, Profile, Login, Register, etc.)
├── store/
│   ├── main.jsx        # Redux store configuration
│   └── slices/         # Redux slices (user, posts, post users)
├── dummyData.jsx       # Mock users and posts
├── App.jsx             # Routes and protected route logic
└── index.jsx           # App entry point

public/
└── assets/             # Static images, styles, and favicons
```

## Routes

| Path | Description |
|------|-------------|
| `/` | Login (redirects to `/home` if authenticated) |
| `/register` | Create a new account |
| `/forgot-password` | Request password reset |
| `/forgot-password/verify` | Enter verification code |
| `/forgot-password/reset` | Set a new password |
| `/home` | Main feed (protected) |
| `/profile/:username` | User profile (protected) |

## Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start Vite dev server |
| `npm run build` | Build for production (output in `build/`) |
| `npm run serve` | Preview the production build |

## License

This project is for educational and portfolio use.
