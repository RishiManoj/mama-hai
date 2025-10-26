# MAMA HAI - Maternal Health Monitoring System

> **A Progressive Web App for monitoring postpartum hemorrhage and maternal vital signs**

## 📋 Table of Contents

- [What is MAMA HAI?](#what-is-mama-hai)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation Guide](#installation-guide)
- [Running the Application](#running-the-application)
- [Development Phases](#development-phases)
- [Database Setup](#database-setup)
- [Environment Variables](#environment-variables)
- [Testing](#testing)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)

---

## 🏥 What is MAMA HAI?

MAMA HAI (Maternal Health AI) is a comprehensive Progressive Web App designed to monitor mothers during the postpartum period, with a focus on detecting and managing postpartum hemorrhage (PPH).

### Key Capabilities:

- **Real-time Monitoring**: Connects to Bluetooth medical devices (Smart Mat for blood loss, Life Signs for vitals)
- **Intelligent Alerts**: Four-zone color-coded alert system (Green/Yellow/Orange/Red)
- **Medical Calculations**: Automatic Shock Index (SI) and Delta SI calculations
- **Patient Management**: Complete obstetrical records using G-P-A-L-D formula
- **Referral System**: Hospital-to-hospital patient transfer management
- **Multi-language**: Supports English and French
- **Offline Capable**: Works without internet connection through PWA features

---

## ✨ Features

### For Healthcare Workers:

- 👩‍⚕️ **Role-based Access**: Different features for Doctors, Nurses, and Ambulance workers
- 📱 **Mobile-First Design**: Optimized for tablets and phones used in clinical settings
- 🔴 **Real-time Alerts**: Instant notifications when blood loss or vitals reach concerning levels
- 📊 **Visual Dashboard**: Easy-to-read monitoring displays with color-coded zones
- 🚑 **Emergency Referrals**: Quick patient transfer to higher-level facilities
- 📈 **Analytics**: Track outcomes and monitor program effectiveness

### Technical Features:

- 🌐 **Progressive Web App**: Installable on any device, works offline
- ⚡ **Real-time Data**: Socket.io for instant updates across devices
- 🔐 **Secure**: JWT authentication, encrypted passwords, HTTPS ready
- 📱 **Responsive**: Works on phones, tablets, and desktops
- 🎨 **Healthcare UI**: Calming colors, large touch targets, high contrast

---

## 🛠️ Technology Stack

### Frontend:
- **React 18** - Modern UI library
- **Vite** - Fast build tool and development server
- **TailwindCSS** - Utility-first CSS framework
- **Zustand** - Lightweight state management
- **Socket.io Client** - Real-time communication
- **React Router** - Navigation
- **Recharts** - Data visualization
- **Web Bluetooth API** - Device connectivity

### Backend:
- **Node.js** - JavaScript runtime
- **Express** - Web application framework
- **PostgreSQL** - Robust relational database
- **Prisma ORM** - Type-safe database client
- **Socket.io** - Real-time engine
- **JWT** - Secure authentication
- **Bcrypt** - Password hashing

### Security:
- **Helmet.js** - Security headers
- **CORS** - Cross-origin resource sharing
- **Rate Limiting** - Prevent abuse
- **Express Validator** - Input validation

---

## 📁 Project Structure

```
mama_hai/
├── frontend/                    # React Progressive Web App
│   ├── public/                 # Static assets
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   ├── pages/              # Page components
│   │   ├── services/           # API calls and business logic
│   │   ├── hooks/              # Custom React hooks
│   │   ├── contexts/           # React context providers
│   │   ├── utils/              # Helper functions
│   │   ├── assets/             # Images, icons
│   │   ├── styles/             # CSS files
│   │   ├── App.jsx             # Main app component
│   │   └── main.jsx            # Entry point
│   ├── .env.example            # Environment variables template
│   ├── package.json            # Frontend dependencies
│   ├── vite.config.js          # Vite and PWA configuration
│   └── tailwind.config.js      # TailwindCSS theme
│
├── backend/                     # Express API Server
│   ├── src/
│   │   ├── controllers/        # Route handlers
│   │   ├── routes/             # API endpoints
│   │   ├── middleware/         # Authentication, validation
│   │   ├── services/           # Business logic
│   │   ├── utils/              # Helper functions
│   │   ├── config/             # Configuration files
│   │   └── server.js           # Main server file
│   ├── prisma/
│   │   └── schema.prisma       # Database schema
│   ├── .env.example            # Environment variables template
│   └── package.json            # Backend dependencies
│
├── shared/                      # Shared code between frontend/backend
│   └── types/                  # TypeScript type definitions
│
├── .gitignore                  # Files to ignore in git
├── package.json                # Root package.json for monorepo
└── README.md                   # This file!
```

---

## 📋 Prerequisites

Before you begin, make sure you have the following installed on your computer:

### Required Software:

1. **Node.js** (v18 or higher)
   - Download from: https://nodejs.org/
   - This includes npm (Node Package Manager)
   - To check if installed: Open terminal and run `node --version`

2. **PostgreSQL** (v14 or higher)
   - Download from: https://www.postgresql.org/download/
   - This is the database where patient data is stored
   - To check if installed: Run `psql --version`

3. **Git** (optional, for version control)
   - Download from: https://git-scm.com/
   - To check if installed: Run `git --version`

### System Requirements:

- **Operating System**: Windows 10+, macOS 10.15+, or Linux
- **RAM**: Minimum 4GB (8GB recommended)
- **Disk Space**: At least 2GB free space
- **Internet**: Required for initial setup and npm package installation

---

## 🚀 Installation Guide

Follow these steps carefully. Each step builds on the previous one.

### Step 1: Open Terminal/Command Prompt

**On Windows:**
- Press `Windows + R`
- Type `cmd` and press Enter

**On macOS:**
- Press `Command + Space`
- Type `terminal` and press Enter

**On Linux:**
- Press `Ctrl + Alt + T`

### Step 2: Navigate to the Project Folder

```bash
# Change directory to mama_hai project
cd /Users/rishi/Downloads/Temp_Delete/mama_hai
```

### Step 3: Install Dependencies

This will install all the necessary packages for both frontend and backend.

```bash
# Install root dependencies
npm install

# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install

# Go back to root
cd ..
```

**What this does:** Downloads and installs all the code libraries that MAMA HAI needs to run (React, Express, Prisma, etc.). This might take 5-10 minutes depending on your internet speed.

### Step 4: Set Up Environment Variables

Environment variables are configuration settings that should NOT be shared publicly (like passwords and secret keys).

**For Backend:**

```bash
# Copy the example file
cd backend
cp .env.example .env

# Now edit the .env file with your actual values
```

Open `backend/.env` in a text editor and update:

```env
DATABASE_URL="postgresql://your_username:your_password@localhost:5432/mama_hai"
JWT_SECRET="generate-a-random-32-character-string-here"
```

**To generate a secure JWT_SECRET**, run this in terminal:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copy the output and paste it as your JWT_SECRET.

**For Frontend:**

```bash
# Copy the example file
cd ../frontend
cp .env.example .env
```

The default values in `.env.example` should work for local development.

### Step 5: Set Up the Database

**5.1: Create the Database**

Open PostgreSQL and create a new database:

```bash
# Connect to PostgreSQL
psql -U postgres

# Create the database
CREATE DATABASE mama_hai;

# Exit PostgreSQL
\q
```

**5.2: Run Database Migrations**

This creates all the tables in your database based on the Prisma schema.

```bash
cd backend
npm run db:generate
npm run db:push
```

**What this does:**
- `db:generate` - Generates Prisma Client (the code that talks to the database)
- `db:push` - Creates all the database tables (Users, Patients, Alerts, etc.)

---

## 🎮 Running the Application

Now that everything is installed, let's run the application!

### Option 1: Run Frontend and Backend Separately

**Terminal 1 - Backend:**

```bash
cd backend
npm run dev
```

You should see:
```
╔════════════════════════════════════════╗
║   MAMA HAI API Server                  ║
║   Status: Running                      ║
║   Port: 5000                           ║
║   URL: http://localhost:5000           ║
╚════════════════════════════════════════╝
```

**Terminal 2 - Frontend:**

Open a NEW terminal window and run:

```bash
cd frontend
npm run dev
```

You should see:
```
  VITE v5.1.4  ready in 500 ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
```

### Option 2: Run Both Together (From Root)

```bash
npm run dev
```

This runs both frontend and backend simultaneously.

### Opening the Application

Open your web browser and go to:

```
http://localhost:3000
```

You should see the MAMA HAI welcome screen with a green "Phase 1 Complete!" message.

---

## 📚 Development Phases

MAMA HAI is being built in 8 phases:

- ✅ **Phase 1: Foundation** (COMPLETED)
  - Project structure
  - Dependencies installed
  - Basic server and frontend
  - Database schema designed

- ⏳ **Phase 2: Authentication System** (Next)
  - User registration
  - Login/logout
  - JWT tokens
  - Protected routes

- ⏳ **Phase 3: Patient Management**
  - Register patients
  - View patient list
  - Patient details
  - Obstetrical records

- ⏳ **Phase 4: Device Connection & Monitoring**
  - Bluetooth device pairing
  - Real-time vital signs display
  - Blood loss tracking
  - Shock Index calculations

- ⏳ **Phase 5: Alert System**
  - Automated alerts
  - Zone-based triggers
  - Alert notifications
  - Alert history

- ⏳ **Phase 6: Referral System**
  - Hospital network
  - Transfer requests
  - Referral tracking
  - Outcome reporting

- ⏳ **Phase 7: PWA Features**
  - Offline support
  - Install prompts
  - Background sync
  - Push notifications

- ⏳ **Phase 8: Web Dashboard**
  - Analytics
  - Reports
  - Charts and graphs
  - Export functionality

---

## 🗄️ Database Setup

### Understanding the Database Structure

The database has 7 main tables:

1. **users** - Healthcare workers (doctors, nurses, ambulance)
2. **patients** - Mothers being monitored
3. **hospitals** - Healthcare facilities in the network
4. **monitoring_sessions** - Active monitoring periods
5. **vital_signs** - Time-series data from devices
6. **alerts** - Generated warnings and emergencies
7. **referrals** - Patient transfers between hospitals

### Viewing the Database

**Option 1: Prisma Studio (Visual Interface)**

```bash
cd backend
npm run db:studio
```

This opens a web interface at http://localhost:5555 where you can see and edit database records.

**Option 2: psql (Command Line)**

```bash
psql -U postgres mama_hai
```

Commands:
- `\dt` - List all tables
- `SELECT * FROM users;` - View all users
- `\q` - Quit

---

## 🔐 Environment Variables

### Backend Variables Explained

| Variable | Purpose | Example |
|----------|---------|---------|
| `NODE_ENV` | Environment mode | `development` or `production` |
| `PORT` | Server port | `5000` |
| `DATABASE_URL` | PostgreSQL connection | `postgresql://user:pass@localhost:5432/mama_hai` |
| `JWT_SECRET` | Token signing key | Random 32+ character string |
| `JWT_EXPIRES_IN` | Token lifetime | `7d` (7 days) |
| `FRONTEND_URL` | CORS allowed origin | `http://localhost:3000` |
| `BCRYPT_ROUNDS` | Password hashing strength | `10` (higher = more secure but slower) |

### Frontend Variables Explained

| Variable | Purpose | Example |
|----------|---------|---------|
| `VITE_API_URL` | Backend API endpoint | `http://localhost:5000/api` |
| `VITE_SOCKET_URL` | Socket.io endpoint | `http://localhost:5000` |
| `VITE_DEFAULT_LANGUAGE` | App language | `ENGLISH` or `FRENCH` |

---

## 🧪 Testing

### Manual Testing Checklist

**Phase 1:**
- [ ] Frontend loads at http://localhost:3000
- [ ] Backend responds at http://localhost:5000/health
- [ ] Click counter works (tests React state)
- [ ] Tailwind styles are applied
- [ ] No console errors

**Testing the Health Endpoint:**

```bash
# In a new terminal
curl http://localhost:5000/health
```

Should return:
```json
{
  "status": "ok",
  "timestamp": "2024-01-...",
  "service": "MAMA HAI API"
}
```

---

## 🚀 Deployment

*(Will be detailed in Phase 8)*

Deployment considerations:
- Frontend: Vercel, Netlify, or Azure Static Web Apps
- Backend: Railway, Render, or Azure App Service
- Database: Managed PostgreSQL (Azure Database, AWS RDS)
- HTTPS: Required for production (especially for Bluetooth API)

---

## 🔧 Troubleshooting

### Common Issues

**1. "npm: command not found"**

Solution: Install Node.js from https://nodejs.org/

**2. "Cannot connect to database"**

Solutions:
- Make sure PostgreSQL is running
- Check DATABASE_URL in backend/.env
- Verify database exists: `psql -U postgres -l`

**3. "Port 3000 already in use"**

Solution: Kill the process using the port:

```bash
# On macOS/Linux
lsof -ti:3000 | xargs kill -9

# On Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

**4. "Module not found"**

Solution: Reinstall dependencies:

```bash
rm -rf node_modules package-lock.json
npm install
```

**5. Frontend loads but shows blank page**

Solutions:
- Check browser console for errors (F12)
- Verify all .env variables are set
- Clear browser cache
- Try a different browser

**6. Database migration errors**

Solution: Reset the database:

```bash
cd backend
npx prisma migrate reset
npm run db:push
```

**7. CORS errors**

Solution: Verify FRONTEND_URL in backend/.env matches your frontend URL.

---

## 📞 Getting Help

### Resources:

- **React Docs**: https://react.dev/
- **Vite Docs**: https://vitejs.dev/
- **Prisma Docs**: https://www.prisma.io/docs
- **TailwindCSS Docs**: https://tailwindcss.com/docs
- **Express Docs**: https://expressjs.com/

### Error Logs:

Always check the terminal output for error messages. They usually tell you exactly what's wrong.

---

## 📝 Next Steps

Now that Phase 1 is complete, you're ready for **Phase 2: Authentication System**!

Phase 2 will include:
- User registration with role selection
- Login with JWT tokens
- Protected routes
- User profile management

When you're ready, let me know and I'll start building Phase 2!

---

## 👥 Credits

**MAMA HAI** - Maternal Health Monitoring System

Built with ❤️ for healthcare workers and mothers everywhere.

---

## 📄 License

MIT License - Feel free to use this project for educational or commercial purposes.
