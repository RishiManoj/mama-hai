# 🚀 Deploying MAMA HAI to Vercel

This guide will walk you through deploying both the frontend and backend to Vercel.

---

## 📋 Prerequisites

Before deploying, you need:

1. **Vercel Account** (free)
   - Sign up at: https://vercel.com/signup
   - You can sign up with GitHub, GitLab, or Bitbucket

2. **Git Repository** (recommended)
   - Push your code to GitHub, GitLab, or Bitbucket
   - Alternatively, you can deploy directly from your local machine using Vercel CLI

3. **PostgreSQL Database** (for production)
   - You'll need a hosted PostgreSQL database
   - Options:
     - **Vercel Postgres** (recommended, easy integration)
     - **Supabase** (free tier available)
     - **Railway** (free tier available)
     - **Neon** (serverless PostgreSQL, free tier)

---

## 🎯 Deployment Strategy

MAMA HAI will be deployed as **two separate Vercel projects**:

1. **Frontend** - The React PWA (User Interface)
2. **Backend** - The Express API (Server)

This separation allows independent scaling and updates.

---

## 📦 PART 1: Deploy Frontend to Vercel

### Option A: Deploy via Vercel Dashboard (Easiest)

#### Step 1: Push to Git

```bash
# Initialize git repository (if not already done)
cd /Users/rishi/Downloads/Temp_Delete/mama_hai
git init
git add .
git commit -m "Initial commit - MAMA HAI Phase 1"

# Create a repository on GitHub and push
git remote add origin https://github.com/YOUR_USERNAME/mama-hai.git
git push -u origin main
```

#### Step 2: Import to Vercel

1. Go to https://vercel.com/new
2. Click **Import Git Repository**
3. Select your `mama-hai` repository
4. Vercel will detect it's a monorepo

#### Step 3: Configure Frontend Project

When Vercel asks for configuration:

**Project Settings:**
- **Framework Preset**: Vite
- **Root Directory**: `frontend`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

**Environment Variables:**

Click **Add Environment Variables** and add:

```
VITE_API_URL=https://YOUR-BACKEND-URL.vercel.app/api
VITE_SOCKET_URL=https://YOUR-BACKEND-URL.vercel.app
VITE_DEFAULT_LANGUAGE=ENGLISH
VITE_PWA_ENABLED=true
VITE_ENABLE_BLUETOOTH=true
VITE_ENABLE_QR_SCANNER=true
VITE_ENABLE_OFFLINE_MODE=true
```

**Note:** You'll update `VITE_API_URL` and `VITE_SOCKET_URL` after deploying the backend.

#### Step 4: Deploy

1. Click **Deploy**
2. Wait 2-3 minutes for build to complete
3. You'll get a URL like: `https://mama-hai-frontend.vercel.app`

---

### Option B: Deploy via Vercel CLI

#### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

#### Step 2: Login to Vercel

```bash
vercel login
```

#### Step 3: Deploy Frontend

```bash
cd frontend
vercel
```

Follow the prompts:
- Set up and deploy? **Y**
- Which scope? Choose your account
- Link to existing project? **N**
- Project name: `mama-hai-frontend`
- In which directory is your code? `./`
- Want to override settings? **Y**
- Build Command: `npm run build`
- Output Directory: `dist`
- Development Command: `npm run dev`

#### Step 4: Add Environment Variables

```bash
vercel env add VITE_API_URL production
# Enter: https://YOUR-BACKEND-URL.vercel.app/api

vercel env add VITE_SOCKET_URL production
# Enter: https://YOUR-BACKEND-URL.vercel.app

# Add other env vars similarly...
```

#### Step 5: Deploy to Production

```bash
vercel --prod
```

---

## 🔧 PART 2: Deploy Backend to Vercel

### Option A: Deploy via Vercel Dashboard

#### Step 1: Import Project Again

1. Go to https://vercel.com/new
2. Select the same `mama-hai` repository
3. This time we'll configure it for the backend

#### Step 2: Configure Backend Project

**Project Settings:**
- **Framework Preset**: Other
- **Root Directory**: `backend`
- **Build Command**: `npm run build`
- **Output Directory**: Leave empty
- **Install Command**: `npm install`

**Environment Variables:**

Add these critical variables:

```
NODE_ENV=production
PORT=5001
FRONTEND_URL=https://YOUR-FRONTEND-URL.vercel.app
DATABASE_URL=postgresql://user:password@host:5432/database
JWT_SECRET=YOUR-SUPER-SECRET-KEY-CHANGE-THIS
JWT_EXPIRES_IN=7d
BCRYPT_ROUNDS=10
```

**Important:**
- Replace `DATABASE_URL` with your actual PostgreSQL connection string
- Generate a strong `JWT_SECRET` (at least 32 random characters)
- Replace `FRONTEND_URL` with your actual frontend URL

#### Step 3: Deploy

1. Click **Deploy**
2. Wait for build to complete
3. You'll get a URL like: `https://mama-hai-backend.vercel.app`

#### Step 4: Update Frontend Environment Variables

Now that you have the backend URL:

1. Go to your frontend project in Vercel dashboard
2. Settings → Environment Variables
3. Update `VITE_API_URL` and `VITE_SOCKET_URL` with the backend URL
4. Redeploy the frontend: Deployments → Click "..." → Redeploy

---

### Option B: Deploy via Vercel CLI

#### Step 1: Deploy Backend

```bash
cd backend
vercel
```

Follow prompts similar to frontend deployment.

#### Step 2: Add Environment Variables

```bash
# Add all required environment variables
vercel env add DATABASE_URL production
# Enter your PostgreSQL connection string

vercel env add JWT_SECRET production
# Enter a strong random secret

vercel env add FRONTEND_URL production
# Enter your frontend URL

# ... add other variables
```

#### Step 3: Deploy to Production

```bash
vercel --prod
```

---

## 🗄️ PART 3: Set Up Database

### Option 1: Vercel Postgres (Recommended)

#### Step 1: Create Database

1. Go to Vercel Dashboard → Storage
2. Click **Create Database**
3. Select **Postgres**
4. Choose a name: `mama-hai-db`
5. Select region (choose closest to users)
6. Click **Create**

#### Step 2: Connect to Backend

1. In your backend project settings
2. Go to Storage → Connect to Project
3. Select `mama-hai-db`
4. Vercel automatically adds `DATABASE_URL` environment variable

#### Step 3: Run Migrations

You need to run Prisma migrations from your local machine:

```bash
# Set the production database URL temporarily
export DATABASE_URL="your-vercel-postgres-connection-string"

# Run migrations
cd backend
npx prisma migrate deploy

# Or push schema directly
npx prisma db push
```

---

### Option 2: Supabase (Free Tier)

#### Step 1: Create Project

1. Go to https://supabase.com
2. Create new project
3. Choose region
4. Set database password (save this!)

#### Step 2: Get Connection String

1. Project Settings → Database
2. Copy the Connection String (URI format)
3. Replace `[YOUR-PASSWORD]` with your actual password

#### Step 3: Add to Vercel

1. Go to backend project in Vercel
2. Settings → Environment Variables
3. Update `DATABASE_URL` with Supabase connection string
4. Redeploy backend

#### Step 4: Run Migrations

```bash
export DATABASE_URL="your-supabase-connection-string"
cd backend
npx prisma db push
```

---

## 🔐 PART 4: Security Configuration

### Generate Secure JWT Secret

Never use a simple string in production! Generate a secure secret:

```bash
# Option 1: Using Node.js
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# Option 2: Using OpenSSL
openssl rand -hex 64
```

Copy the output and use it as your `JWT_SECRET`.

### Update CORS Settings

If you get CORS errors after deployment, ensure:

1. Backend `.env` has correct `FRONTEND_URL`
2. Frontend `.env` has correct `VITE_API_URL`
3. Both are using `https://` (not `http://`)

---

## ✅ PART 5: Verify Deployment

### Test Frontend

1. Visit your frontend URL
2. You should see:
   - ✅ MAMA HAI logo
   - ✅ Phase 1 Complete message
   - ✅ Working counter button
   - ✅ No console errors

### Test Backend

1. Visit: `https://YOUR-BACKEND-URL.vercel.app/health`
2. Should return: `{"status":"ok","service":"MAMA HAI API"}`

### Test API Connection

1. Open browser DevTools (F12)
2. Go to Network tab
3. The frontend should be able to reach the backend
4. Check for any CORS or connection errors

---

## 🔄 Continuous Deployment

Once set up, Vercel automatically redeploys when you push to Git:

```bash
# Make changes to your code
git add .
git commit -m "Update feature"
git push

# Vercel automatically:
# 1. Detects the push
# 2. Builds both frontend and backend
# 3. Deploys to production
# ✨ No manual deployment needed!
```

---

## 📊 Custom Domains (Optional)

### Add Custom Domain to Frontend

1. Go to frontend project → Settings → Domains
2. Click **Add Domain**
3. Enter your domain: `app.mamahai.com`
4. Follow DNS configuration instructions
5. Vercel automatically provisions SSL certificate

### Add Custom Domain to Backend

1. Go to backend project → Settings → Domains
2. Add: `api.mamahai.com`
3. Update frontend environment variables with new API URL

---

## 🐛 Troubleshooting

### Build Fails

**Error:** "Module not found"
- Solution: Make sure all dependencies are in `package.json`
- Run `npm install` locally first

**Error:** "Build exceeded maximum duration"
- Solution: Optimize build size, remove unused dependencies

### Database Connection Fails

**Error:** "Can't reach database server"
- Solution: Check `DATABASE_URL` is correct
- Verify database is running and accessible
- Check IP whitelist settings (some databases require allowing Vercel's IPs)

### CORS Errors

**Error:** "CORS policy blocked"
- Solution: Ensure `FRONTEND_URL` in backend matches actual frontend URL
- Use `https://` not `http://` in production
- Redeploy backend after changing CORS settings

### Environment Variables Not Working

- **Frontend:** Must start with `VITE_`
- **Backend:** No prefix needed
- After changing env vars, **always redeploy**

### Socket.io Connection Fails

Vercel has limitations with WebSockets. For real-time features in production:
- Consider using Vercel's built-in WebSocket support (beta)
- Or deploy backend to Railway/Render instead
- Or use a managed Socket.io service like Ably

---

## 📈 Monitoring & Analytics

### Enable Vercel Analytics

1. Go to project → Analytics
2. Enable Web Analytics (free for hobby plan)
3. Tracks:
   - Page views
   - Performance metrics
   - Core Web Vitals

### View Deployment Logs

1. Go to project → Deployments
2. Click on any deployment
3. View **Build Logs** and **Function Logs**
4. Useful for debugging production issues

---

## 💰 Cost Considerations

### Vercel Pricing

**Hobby Plan (Free):**
- ✅ Unlimited deployments
- ✅ 100GB bandwidth/month
- ✅ Serverless functions
- ✅ Automatic HTTPS
- ❌ No team features
- ❌ Limited build minutes

**Pro Plan ($20/month):**
- ✅ Everything in Hobby
- ✅ 1TB bandwidth
- ✅ Team collaboration
- ✅ Advanced analytics
- ✅ Password protection

For MAMA HAI in production with real users, **Pro plan is recommended**.

### Database Costs

- **Vercel Postgres:** Starts at $20/month
- **Supabase:** Free up to 500MB, then $25/month
- **Railway:** Free tier includes $5 credit/month

---

## 🎉 Success!

Once deployed, you'll have:

- ✅ **Frontend:** Accessible worldwide at your Vercel URL
- ✅ **Backend:** Scalable API with automatic HTTPS
- ✅ **Database:** Secure PostgreSQL with backups
- ✅ **PWA:** Installable on any device
- ✅ **CI/CD:** Automatic deployments on git push
- ✅ **SSL:** Free automatic HTTPS certificates
- ✅ **CDN:** Global content delivery network

---

## 📞 Next Steps

After successful deployment:

1. **Test thoroughly** - Check all features work in production
2. **Set up monitoring** - Enable analytics and error tracking
3. **Configure custom domain** - Use your own domain name
4. **Set up database backups** - Ensure data safety
5. **Continue to Phase 2** - Add authentication and more features

---

## 🆘 Need Help?

- **Vercel Docs:** https://vercel.com/docs
- **Vercel Discord:** https://vercel.com/discord
- **Prisma Docs:** https://www.prisma.io/docs/guides/deployment

---

**Ready to deploy?** Follow the steps above, and MAMA HAI will be live in about 15-20 minutes! 🚀
