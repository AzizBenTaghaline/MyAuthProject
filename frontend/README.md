# MyAuthProject

Full‑stack authentication app with email verification, password reset, JWT auth (HTTP‑only cookies), and a React frontend.

- Backend: Node.js, Express, MongoDB (Mongoose), JWT, Mailtrap
- Frontend: React (Vite), Axios, Zustand, React Router

## Features

- Sign up with email verification (6‑digit code)
- Login with JWT (stored in HTTP‑only cookie)
- Protected routes (backend + frontend guards)
- Forgot password via email link with token
- Reset password with token
- Logout
- Basic user dashboard

## Tech Stack

- Backend: Node.js, Express, Mongoose, bcryptjs, jsonwebtoken, cookie-parser, cors, dotenv
- Email: Mailtrap (sandbox)
- Frontend: React, Vite, react-router-dom, Zustand, Axios, Tailwind (optional)

## Project Structure

```
MyAuthProject/
  backend/
    index.js
    controllers/
      auth.controllers.js
    db/
      connectDB.js
    mailtrap/
      emails.js
      emailTemplates.js
      mailtrap.js
    middleware/
      verifyToken.js
    models/
      user.model.js
    routes/
      auth.routes.js
    utils/
      generateTokenAndSetCookie.js
  frontend/
    index.html
    vite.config.js
    src/
      App.jsx
      main.jsx
      store/authStore.js
      pages/...
      components/...
      utils/date.js
  package.json
  .env (not committed)
```