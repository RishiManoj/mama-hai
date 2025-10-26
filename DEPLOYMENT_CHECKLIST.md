# ✅ MAMA HAI Deployment Checklist

Use this checklist before deploying to production.

---

## 🔒 Security Checklist

- [ ] **Environment Variables**
  - [ ] Backend `.env` file is **NOT** committed to Git
  - [ ] Frontend `.env` file is **NOT** committed to Git
  - [ ] Generated a strong JWT_SECRET (64+ characters)
  - [ ] Database URL has strong password

- [ ] **JWT Configuration**
  - [ ] JWT_SECRET is random and secure
  - [ ] JWT_EXPIRES_IN is set appropriately (7d recommended)

- [ ] **Database Security**
  - [ ] Database has strong password
  - [ ] Database is not publicly accessible (except via your app)
  - [ ] SSL/TLS enabled for database connections

- [ ] **CORS Configuration**
  - [ ] FRONTEND_URL is set to your actual frontend domain
  - [ ] No wildcard (*) CORS in production

---

## 📦 Pre-Deployment Checklist

### Frontend

- [x] Logo integrated (`/logo.png`)
- [x] PWA manifest configured
- [x] Icons created (192x192, 512x512)
- [x] Favicon updated
- [x] vercel.json created
- [ ] Environment variables ready:
  - [ ] VITE_API_URL
  - [ ] VITE_SOCKET_URL
  - [ ] VITE_DEFAULT_LANGUAGE

### Backend

- [x] vercel.json created
- [x] Build scripts added to package.json
- [x] Node version specified in package.json
- [ ] Environment variables ready:
  - [ ] NODE_ENV=production
  - [ ] DATABASE_URL
  - [ ] JWT_SECRET
  - [ ] FRONTEND_URL
  - [ ] PORT

### Database

- [ ] PostgreSQL database created
- [ ] Connection string obtained
- [ ] Database is accessible from Vercel
- [ ] Prisma schema is finalized

---

## 🚀 Deployment Steps

### Step 1: Prepare Code

- [ ] All changes committed to Git
- [ ] Code pushed to GitHub/GitLab/Bitbucket
- [ ] No console.log statements in production code
- [ ] No TODO comments that block features

### Step 2: Deploy Backend First

- [ ] Import backend to Vercel
- [ ] Set all environment variables
- [ ] Verify deployment successful
- [ ] Test health endpoint: `/health`
- [ ] Note backend URL

### Step 3: Deploy Frontend

- [ ] Import frontend to Vercel
- [ ] Set environment variables (use backend URL)
- [ ] Verify deployment successful
- [ ] Test frontend loads
- [ ] Note frontend URL

### Step 4: Update Cross-References

- [ ] Update backend `FRONTEND_URL` with actual frontend URL
- [ ] Update frontend `VITE_API_URL` with actual backend URL
- [ ] Redeploy both if needed

### Step 5: Database Setup

- [ ] Run Prisma migrations: `npx prisma migrate deploy`
- [ ] Or push schema: `npx prisma db push`
- [ ] Verify tables created
- [ ] (Optional) Seed initial data

---

## 🧪 Post-Deployment Testing

### Frontend Tests

- [ ] **Page Loads**
  - [ ] Homepage loads without errors
  - [ ] Logo displays correctly
  - [ ] Styles are applied properly
  - [ ] No 404 errors in console

- [ ] **Browser Console**
  - [ ] No JavaScript errors
  - [ ] No CORS errors
  - [ ] API calls succeed

- [ ] **PWA Features**
  - [ ] App can be installed
  - [ ] Offline page works (after first load)
  - [ ] Icons show correctly when installed

- [ ] **Responsive Design**
  - [ ] Test on mobile device
  - [ ] Test on tablet
  - [ ] Test on desktop

### Backend Tests

- [ ] **API Endpoints**
  - [ ] Health check responds: `GET /health`
  - [ ] Returns correct JSON
  - [ ] No error responses

- [ ] **Database Connection**
  - [ ] Backend can connect to database
  - [ ] No connection timeout errors
  - [ ] Queries execute successfully

- [ ] **CORS**
  - [ ] Frontend can make API calls
  - [ ] No CORS errors in console
  - [ ] Preflight requests succeed

### Integration Tests

- [ ] Frontend → Backend communication works
- [ ] API responses are received correctly
- [ ] Error handling works properly
- [ ] Loading states display correctly

---

## 📊 Monitoring Setup

- [ ] **Vercel Analytics Enabled**
  - [ ] Web Analytics active
  - [ ] Core Web Vitals tracking

- [ ] **Error Tracking** (Future Phase)
  - [ ] Sentry or similar tool configured
  - [ ] Error alerts set up

- [ ] **Uptime Monitoring** (Optional)
  - [ ] UptimeRobot or similar
  - [ ] Alert email configured

---

## 🎨 Optional Enhancements

- [ ] Custom domain configured
- [ ] SSL certificate verified (auto by Vercel)
- [ ] Meta tags optimized for SEO
- [ ] Open Graph tags for social sharing
- [ ] Favicon at all sizes (16x16, 32x32, 180x180)

---

## 📝 Documentation

- [ ] Update README with production URLs
- [ ] Document deployment process for team
- [ ] Create rollback procedure
- [ ] Document environment variables

---

## 🐛 Rollback Plan

If something goes wrong:

1. **Vercel Instant Rollback**
   - Go to Deployments
   - Find last working deployment
   - Click "..." → Promote to Production

2. **Database Rollback**
   - Have recent backup ready
   - Know how to restore from backup

3. **Git Rollback**
   ```bash
   git revert HEAD
   git push
   # Vercel auto-deploys previous version
   ```

---

## 🎯 Success Criteria

Deployment is successful when:

- ✅ Frontend loads at production URL
- ✅ Backend responds to health check
- ✅ Database is accessible
- ✅ No console errors
- ✅ API calls succeed
- ✅ HTTPS works (automatic)
- ✅ PWA features functional
- ✅ Mobile responsive

---

## 📞 Emergency Contacts

**If deployment fails:**

1. Check Vercel deployment logs
2. Check browser console for errors
3. Verify all environment variables
4. Test database connection
5. Review CORS configuration

**Common Issues:**
- Build fails → Check dependencies
- Database unreachable → Check DATABASE_URL
- CORS errors → Check FRONTEND_URL in backend
- 404 errors → Check vercel.json routing

---

## 🎉 Deployment Complete!

Once all checks pass:

- [ ] Announce to team
- [ ] Update documentation
- [ ] Share production URLs
- [ ] Start Phase 2 development

---

**Current Status:** ✅ Ready for deployment!

**Estimated Deployment Time:** 15-20 minutes

**Deployment Difficulty:** Easy (with this guide)

---

Last Updated: Phase 1 Complete
Next: Deploy to Vercel following VERCEL_DEPLOYMENT.md
