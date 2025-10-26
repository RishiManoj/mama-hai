# 📁 MAMA HAI Folder Structure

This document explains every folder and file in the project.

---

## 🗂️ Complete Directory Tree

```
mama_hai/                                    # ROOT DIRECTORY
│
├── 📄 package.json                          # Root package manager (runs both frontend & backend)
├── 📄 README.md                             # Main documentation (installation, usage, features)
├── 📄 PHASE1_CHECKLIST.md                   # Phase 1 completion status
├── 📄 FOLDER_STRUCTURE.md                   # This file!
├── 📄 .gitignore                            # Files to exclude from version control
│
├── 📁 frontend/                             # REACT PWA APPLICATION
│   │
│   ├── 📁 public/                           # Static files (served directly)
│   │   └── 📄 manifest.json                 # PWA configuration (name, icons, theme)
│   │
│   ├── 📁 src/                              # Source code (React components)
│   │   │
│   │   ├── 📁 components/                   # Reusable UI components
│   │   │   # Examples (to be created in later phases):
│   │   │   # - Button.jsx
│   │   │   # - Card.jsx
│   │   │   # - Alert.jsx
│   │   │   # - Navbar.jsx
│   │   │
│   │   ├── 📁 pages/                        # Full page components
│   │   │   # Examples (to be created):
│   │   │   # - Login.jsx
│   │   │   # - Dashboard.jsx
│   │   │   # - PatientList.jsx
│   │   │   # - MonitoringView.jsx
│   │   │
│   │   ├── 📁 services/                     # API communication & business logic
│   │   │   # Examples (to be created):
│   │   │   # - api.service.js (Axios setup)
│   │   │   # - auth.service.js (Login/register)
│   │   │   # - patient.service.js (Patient CRUD)
│   │   │   # - bluetooth.service.js (Device connection)
│   │   │
│   │   ├── 📁 hooks/                        # Custom React hooks
│   │   │   # Examples (to be created):
│   │   │   # - useAuth.js (Authentication state)
│   │   │   # - useSocket.js (Real-time connection)
│   │   │   # - useLocalStorage.js (Offline storage)
│   │   │
│   │   ├── 📁 contexts/                     # React Context providers (global state)
│   │   │   # Examples (to be created):
│   │   │   # - AuthContext.jsx (User session)
│   │   │   # - LanguageContext.jsx (i18n)
│   │   │   # - ThemeContext.jsx (UI preferences)
│   │   │
│   │   ├── 📁 utils/                        # Helper functions
│   │   │   # Examples (to be created):
│   │   │   # - calculations.js (Shock Index, Delta SI)
│   │   │   # - validators.js (Form validation)
│   │   │   # - formatters.js (Date, number formatting)
│   │   │
│   │   ├── 📁 assets/                       # Media files
│   │   │   └── 📁 icons/                    # SVG icons
│   │   │       # - logo.svg
│   │   │       # - device-icons.svg
│   │   │
│   │   ├── 📁 styles/                       # CSS files
│   │   │   └── 📄 index.css                 # Global styles + TailwindCSS imports
│   │   │
│   │   ├── 📄 App.jsx                       # Root React component (routing, providers)
│   │   └── 📄 main.jsx                      # Entry point (ReactDOM render)
│   │
│   ├── 📄 package.json                      # Frontend dependencies
│   ├── 📄 vite.config.js                    # Vite bundler + PWA plugin config
│   ├── 📄 tailwind.config.js                # TailwindCSS theme (colors, fonts, spacing)
│   ├── 📄 postcss.config.js                 # PostCSS configuration
│   ├── 📄 .eslintrc.cjs                     # Code quality rules
│   ├── 📄 .env.example                      # Environment variables template
│   ├── 📄 .env                              # Actual environment variables (NOT in git)
│   └── 📄 index.html                        # HTML entry point
│
├── 📁 backend/                              # EXPRESS API SERVER
│   │
│   ├── 📁 src/                              # Source code
│   │   │
│   │   ├── 📁 controllers/                  # Route handlers (business logic)
│   │   │   # Examples (to be created):
│   │   │   # - auth.controller.js (Login, register, logout)
│   │   │   # - patient.controller.js (CRUD operations)
│   │   │   # - monitoring.controller.js (Start/stop sessions)
│   │   │   # - alert.controller.js (Generate, acknowledge alerts)
│   │   │   # - referral.controller.js (Create, track transfers)
│   │   │
│   │   ├── 📁 routes/                       # API endpoint definitions
│   │   │   # Examples (to be created):
│   │   │   # - auth.routes.js (POST /api/auth/login)
│   │   │   # - patient.routes.js (GET/POST /api/patients)
│   │   │   # - monitoring.routes.js (POST /api/monitoring/start)
│   │   │   # - alert.routes.js (GET /api/alerts)
│   │   │   # - referral.routes.js (POST /api/referrals)
│   │   │
│   │   ├── 📁 middleware/                   # Express middleware
│   │   │   # Examples (to be created):
│   │   │   # - auth.middleware.js (Verify JWT token)
│   │   │   # - validate.middleware.js (Input validation)
│   │   │   # - role.middleware.js (Check user permissions)
│   │   │   # - error.middleware.js (Error handling)
│   │   │
│   │   ├── 📁 services/                     # Business logic & database operations
│   │   │   # Examples (to be created):
│   │   │   # - auth.service.js (Password hashing, token generation)
│   │   │   # - patient.service.js (Database queries)
│   │   │   # - alert.service.js (Alert calculation logic)
│   │   │   # - socket.service.js (Real-time event broadcasting)
│   │   │
│   │   ├── 📁 utils/                        # Helper functions
│   │   │   # Examples (to be created):
│   │   │   # - jwt.util.js (Token generation/verification)
│   │   │   # - calculation.util.js (Shock Index formulas)
│   │   │   # - seed.js (Populate database with test data)
│   │   │
│   │   ├── 📁 config/                       # Configuration files
│   │   │   # Examples (to be created):
│   │   │   # - database.config.js (Prisma client instance)
│   │   │   # - socket.config.js (Socket.io setup)
│   │   │
│   │   └── 📄 server.js                     # Main server file (Express app, middleware)
│   │
│   ├── 📁 prisma/                           # Database configuration
│   │   ├── 📄 schema.prisma                 # Database schema (tables, relationships)
│   │   └── 📁 migrations/                   # Database version history (auto-generated)
│   │
│   ├── 📄 package.json                      # Backend dependencies
│   ├── 📄 .env.example                      # Environment variables template
│   └── 📄 .env                              # Actual environment variables (NOT in git)
│
└── 📁 shared/                               # SHARED CODE (used by both frontend & backend)
    └── 📁 types/                            # TypeScript type definitions
        # Examples (to be created):
        # - user.types.js
        # - patient.types.js
        # - alert.types.js
```

---

## 📖 Folder Explanations

### Root Level

| File/Folder | Purpose |
|-------------|---------|
| `package.json` | Root package manager. Allows running frontend and backend together with `npm run dev` |
| `README.md` | Main documentation with installation instructions, features, troubleshooting |
| `.gitignore` | Tells Git which files NOT to track (like .env, node_modules) |
| `frontend/` | All React/Vite code for the user interface |
| `backend/` | All Node.js/Express code for the API server |
| `shared/` | Code used by both frontend and backend (type definitions, constants) |

---

### Frontend Structure

#### `/frontend/public/` - Static Assets
Files here are served directly without processing.

- `manifest.json` - PWA metadata (app name, icons, colors)
- Images, icons, fonts will go here

#### `/frontend/src/` - Application Source Code

**📁 `components/`** - Reusable UI building blocks
- Think of these as LEGO pieces you use multiple times
- Examples: Button, Card, Modal, Form Input, Alert Banner
- Each component is self-contained and reusable

**📁 `pages/`** - Full-screen views
- Complete pages that users navigate to
- Examples: Login page, Dashboard, Patient List, Monitoring View
- Pages are made up of multiple components

**📁 `services/`** - Communication with backend
- All API calls go here (using Axios)
- Bluetooth device communication
- Data fetching and sending logic

**📁 `hooks/`** - Custom React hooks
- Reusable stateful logic
- Examples: `useAuth()`, `useSocket()`, `useLocalStorage()`
- Makes code cleaner and easier to test

**📁 `contexts/`** - Global state management
- Data that needs to be accessed by many components
- Examples: Current user, language preference, theme
- Uses React Context API

**📁 `utils/`** - Helper functions
- Pure utility functions (no React)
- Examples: Calculate Shock Index, format dates, validate phone numbers

**📁 `assets/`** - Media files
- Images, icons, logos
- Organized by type (icons, images, fonts)

**📁 `styles/`** - CSS styling
- `index.css` - Global styles and TailwindCSS imports
- Component-specific styles (if needed)

---

### Backend Structure

#### `/backend/src/` - Server Source Code

**📁 `controllers/`** - Request handlers
- Functions that handle HTTP requests
- Example: When someone calls `POST /api/auth/login`, the auth controller handles it
- Contains business logic for each endpoint

**📁 `routes/`** - API endpoint definitions
- Maps URLs to controller functions
- Example: `GET /api/patients` → calls `patientController.getAll()`
- Organized by feature (auth routes, patient routes, etc.)

**📁 `middleware/`** - Request processing
- Functions that run BEFORE controllers
- Examples:
  - Authentication: Check if user is logged in
  - Validation: Ensure data is correct format
  - Authorization: Check if user has permission

**📁 `services/`** - Business logic layer
- Complex operations separated from controllers
- Database queries using Prisma
- Third-party integrations

**📁 `utils/`** - Helper functions
- JWT token generation/verification
- Password hashing
- Calculation formulas (Shock Index)
- Database seeding scripts

**📁 `config/`** - Configuration
- Database connection setup
- Socket.io configuration
- Environment-specific settings

#### `/backend/prisma/` - Database Management

**`schema.prisma`** - Database blueprint
- Defines all tables and relationships
- Written in Prisma Schema Language
- Changes here create migrations

**`migrations/`** - Database version control
- Auto-generated when you change the schema
- Tracks all database changes over time
- Allows rollback if needed

---

### Shared Structure

#### `/shared/types/` - Type Definitions

- JavaScript object structures used by both frontend and backend
- Ensures consistency in data format
- Examples: User object shape, Patient record format

---

## 🔄 How It All Works Together

### User Makes a Request:

1. **Frontend** → User clicks "Login" button
2. **services/auth.service.js** → Sends POST request to backend
3. **Backend routes** → Receives at `/api/auth/login`
4. **Middleware** → Validates the request data
5. **Controller** → Calls auth.controller.js login function
6. **Service** → auth.service.js checks database via Prisma
7. **Database** → PostgreSQL verifies credentials
8. **Response** → Backend sends JWT token back
9. **Frontend** → Stores token, redirects to dashboard

### Real-time Monitoring:

1. **Device** → Sends blood loss data via Bluetooth
2. **Frontend** → bluetooth.service.js receives data
3. **Socket.io** → Emits event to backend
4. **Backend** → Receives via socket.io
5. **Service** → Calculates Shock Index, checks alert thresholds
6. **Database** → Saves vital signs record
7. **Socket.io** → Broadcasts to all connected clients
8. **Frontend** → Updates UI in real-time for all users watching

---

## 📊 File Count by Phase

**Phase 1 (Current):**
- ✅ 20+ files created
- ✅ Basic structure in place

**Phase 2 (Authentication):**
- Will add ~12 files
- Total: ~32 files

**Phase 8 (Complete):**
- Estimated ~80-100 files
- All features implemented

---

## 💡 Key Concepts

### Monorepo
- Single repository containing multiple projects (frontend + backend)
- Easier to keep everything in sync
- Share code between frontend and backend

### Separation of Concerns
- Each folder has ONE job
- Controllers handle requests
- Services handle business logic
- Routes define endpoints
- Components render UI

### DRY (Don't Repeat Yourself)
- Reusable components
- Shared utilities
- Single source of truth

---

## 🎯 Quick Reference

Need to find something?

| I want to... | Go to... |
|--------------|----------|
| Add a new page | `frontend/src/pages/` |
| Create a reusable button | `frontend/src/components/` |
| Add an API endpoint | `backend/src/routes/` |
| Change database structure | `backend/prisma/schema.prisma` |
| Add a helper function | `frontend/src/utils/` or `backend/src/utils/` |
| Configure TailwindCSS colors | `frontend/tailwind.config.js` |
| Change server port | `backend/.env` |
| Add authentication logic | `backend/src/middleware/auth.middleware.js` |
| Create a custom hook | `frontend/src/hooks/` |
| Add Socket.io events | `backend/src/server.js` |

---

## 🔜 What Gets Created in Phase 2

Phase 2 will add these files:

**Backend:**
- `src/routes/auth.routes.js`
- `src/controllers/auth.controller.js`
- `src/services/auth.service.js`
- `src/middleware/auth.middleware.js`
- `src/utils/jwt.util.js`

**Frontend:**
- `src/pages/Login.jsx`
- `src/pages/Register.jsx`
- `src/pages/Profile.jsx`
- `src/contexts/AuthContext.jsx`
- `src/services/api.service.js`
- `src/services/auth.service.js`
- `src/components/LanguageSelector.jsx`

---

**This structure is designed for:**
- ✅ Scalability (easy to add features)
- ✅ Maintainability (easy to find and fix bugs)
- ✅ Collaboration (multiple developers can work together)
- ✅ Best Practices (industry-standard organization)

Ready to start Phase 2? 🚀
