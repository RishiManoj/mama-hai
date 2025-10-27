# 🔐 Phase 2 Setup Guide - Authentication System

## 📋 Current Status

### Completed ✅
- [x] Chose Supabase for database
- [ ] Created Supabase project
- [ ] Got database connection string
- [ ] Updated Vercel backend with DATABASE_URL
- [ ] Updated local backend with DATABASE_URL
- [ ] Ran database migrations

---

## 🗄️ Supabase Setup Checklist

### Step 1: Create Supabase Account
- [ ] Go to https://supabase.com
- [ ] Sign up with GitHub
- [ ] Create organization (if needed)

### Step 2: Create Project
- [ ] Click "New Project"
- [ ] Name: `mama-hai`
- [ ] **Password:** _________________ (write it down!)
- [ ] Region: ____________
- [ ] Wait for project to be ready (2-3 minutes)

### Step 3: Get Connection String
- [ ] Settings → Database
- [ ] Connection string → URI tab
- [ ] Copy the connection string
- [ ] Replace `[YOUR-PASSWORD]` with your actual password

**Your connection string format:**
```
postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:5432/postgres
```

### Step 4: Update Vercel
- [ ] Go to Vercel → mama-hai-backend
- [ ] Settings → Environment Variables
- [ ] Edit `DATABASE_URL`
- [ ] Paste Supabase connection string
- [ ] Save
- [ ] Redeploy backend

### Step 5: Update Local Environment
- [ ] Open: `backend/.env`
- [ ] Line 10: Update `DATABASE_URL`
- [ ] Paste Supabase connection string
- [ ] Save file

---

## 🔧 Next Steps (After Database Setup)

### Step 6: Create Database Tables
Run Prisma migrations to create all tables:

```bash
cd backend
npx prisma generate
npx prisma db push
```

This creates:
- users table
- patients table
- hospitals table
- monitoring_sessions table
- vital_signs table
- alerts table
- referrals table

### Step 7: Verify Database
```bash
npx prisma studio
```
Opens visual database browser at http://localhost:5555

---

## 🎯 What We'll Build Next

### Backend (API):
1. **Auth Routes** (`/api/auth/register`, `/api/auth/login`)
2. **Auth Controller** (business logic)
3. **JWT Middleware** (verify tokens)
4. **Password Hashing** (bcrypt)

### Frontend (UI):
1. **Login Page** (`/login`)
2. **Register Page** (`/register`)
3. **Profile Page** (`/profile`)
4. **Auth Context** (global state)
5. **Protected Routes** (require login)

---

## 🐛 Troubleshooting

### "Could not connect to database"
- Check DATABASE_URL is correct
- Make sure password has no special characters that need escaping
- Verify Supabase project is running
- Check IP whitelist (Supabase allows all by default)

### "Connection timeout"
- Supabase may be starting up (wait 30 seconds)
- Check internet connection
- Try connection string from Supabase dashboard again

### "Password authentication failed"
- Make sure you replaced `[YOUR-PASSWORD]` with actual password
- Check for extra spaces in connection string
- Regenerate password in Supabase if needed

---

## 📞 Ready to Continue?

Once you have:
- ✅ Supabase project created
- ✅ Connection string copied
- ✅ Updated in Vercel
- ✅ Updated locally

**Tell me:** "Database is ready" or share the connection string

Then we'll run migrations and start building authentication! 🚀
