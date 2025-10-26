# 🧪 MAMA HAI - Local Testing Guide

Before deploying to Vercel, let's make sure everything works perfectly locally.

---

## ✅ Current Status

**Both servers are running:**
- ✅ Backend: http://localhost:5001 (Port 5001)
- ✅ Frontend: http://localhost:3000 (Port 3000)
- ✅ Logo: Integrated and ready (68KB PNG file)

---

## 🧪 Testing Checklist

### Test 1: Backend Health Check ✅ PASSED

**What to do:**
```bash
curl http://localhost:5001/health
```

**Expected Result:**
```json
{
  "status": "ok",
  "timestamp": "2025-10-26T...",
  "service": "MAMA HAI API"
}
```

**Status:** ✅ Working perfectly!

---

### Test 2: Frontend Loads

**What to do:**
1. Open your web browser (Chrome, Firefox, Safari, etc.)
2. Go to: **http://localhost:3000**

**What you should see:**
- ✅ MAMA HAI logo at the top (your logo image)
- ✅ "MAMA HAI" title in blue
- ✅ "Maternal Health Monitoring System" subtitle
- ✅ Green box with "Phase 1 Complete!" message
- ✅ Counter button with "Click Count: 0"
- ✅ Blue gradient background (light blue to teal)
- ✅ "Next Steps" section
- ✅ Footer: "Built with React + Vite + TailwindCSS"

**Screenshot what it should look like:**
```
┌─────────────────────────────────────────┐
│                                         │
│          [MAMA HAI LOGO IMAGE]          │
│                                         │
│            MAMA HAI                     │
│   Maternal Health Monitoring System    │
│                                         │
│  ┌───────────────────────────────┐    │
│  │    ✓ Phase 1 Complete!        │    │
│  │  The foundation is set up...  │    │
│  └───────────────────────────────┘    │
│                                         │
│  ┌───────────────────────────────┐    │
│  │  Test the interactive features │    │
│  │  [Click Count: 0]              │    │
│  └───────────────────────────────┘    │
│                                         │
│  Next Steps:                            │
│  ✓ Project structure created           │
│  ✓ Dependencies installed              │
│  ...                                    │
└─────────────────────────────────────────┘
```

---

### Test 3: Interactive Features

**What to do:**
1. On the page, find the button that says "Click Count: 0"
2. Click it several times

**Expected Result:**
- ✅ Number increases each time you click
- ✅ Button shows: "Click Count: 1", "Click Count: 2", etc.
- ✅ No errors appear
- ✅ Page doesn't reload

**Why this matters:**
This tests that React is working correctly and can handle user interactions.

---

### Test 4: Browser Console Check

**What to do:**
1. Open your browser's Developer Tools:
   - **Chrome/Edge:** Press F12 or Cmd+Option+I (Mac) or Ctrl+Shift+I (Windows)
   - **Firefox:** Press F12 or Cmd+Option+K (Mac) or Ctrl+Shift+K (Windows)
   - **Safari:** Press Cmd+Option+C

2. Click on the **Console** tab

**What you should see:**
- ✅ No red error messages
- ✅ Maybe some blue/gray informational messages (that's OK)
- ✅ No CORS errors
- ✅ No "Failed to load" errors

**What red errors would look like (you should NOT see these):**
```
❌ GET http://localhost:3000/logo.png 404 (Not Found)
❌ Uncaught ReferenceError: ... is not defined
❌ CORS policy blocked...
```

If you see any red errors, let me know!

---

### Test 5: Network Tab Check

**What to do:**
1. In Developer Tools, click the **Network** tab
2. Refresh the page (Cmd+R or Ctrl+R)
3. Watch as files load

**What you should see:**
- ✅ `index.html` - Status: 200 (green)
- ✅ `logo.png` - Status: 200 (green) - **Your logo loads!**
- ✅ `main.jsx` or similar JS files - Status: 200
- ✅ All files show green "200" status

**What NOT to see:**
- ❌ Red "404" errors (file not found)
- ❌ Red "500" errors (server error)
- ❌ Red "CORS" errors

---

### Test 6: Responsive Design

**What to do:**
1. Resize your browser window
2. Make it narrow (like a phone)
3. Make it wide (like a desktop)

**Expected Result:**
- ✅ Layout adjusts to different sizes
- ✅ Everything stays readable
- ✅ No horizontal scrolling needed
- ✅ Logo scales appropriately
- ✅ Buttons remain touch-friendly

**Test on actual mobile device (optional):**
1. Find your computer's IP address:
   ```bash
   # On Mac:
   ifconfig | grep "inet " | grep -v 127.0.0.1

   # On Windows:
   ipconfig
   ```
2. On your phone, go to: `http://YOUR_IP:3000`
3. Make sure everything works on mobile

---

### Test 7: Logo Verification

**What to do:**
1. Look at the browser tab (at the very top)
2. Look at the main page

**Expected Result:**
- ✅ Logo appears in browser tab (favicon)
- ✅ Logo appears on the page (large, centered)
- ✅ Logo is clear and not pixelated
- ✅ Logo has correct colors

**To verify logo file:**
```bash
# Check logo exists
ls -lh frontend/public/logo.png

# Should show: ~68KB file
```

---

### Test 8: PWA Manifest

**What to do:**
1. In Developer Tools, go to **Application** tab (Chrome) or **Storage** (Firefox)
2. Look for **Manifest** in the left sidebar

**Expected Result:**
- ✅ Manifest loads without errors
- ✅ Shows app name: "MAMA HAI - Maternal Health Monitor"
- ✅ Shows icons (192x192, 512x512)
- ✅ Theme color: #2563eb (blue)

---

### Test 9: Performance

**What to do:**
1. Refresh the page
2. Notice how fast it loads

**Expected Result:**
- ✅ Page loads in less than 1 second
- ✅ No long delays
- ✅ Smooth interactions

**Optional - Run Lighthouse:**
1. Open DevTools
2. Click **Lighthouse** tab
3. Select "Progressive Web App"
4. Click "Generate report"
5. Should score 80+ in all categories

---

## 🐛 Common Issues & Fixes

### Issue: Logo doesn't show

**Symptoms:**
- Broken image icon appears
- Console shows 404 error for logo.png

**Fix:**
```bash
# Check if logo exists
ls frontend/public/logo.png

# If missing, copy it again
cp mama_hai_logo.png frontend/public/logo.png
```

---

### Issue: Page won't load

**Symptoms:**
- "This site can't be reached"
- Connection refused

**Fix:**
1. Check servers are running
2. Make sure you're using correct URL: http://localhost:3000
3. Try stopping and restarting:
   ```bash
   # Stop servers (Ctrl+C)
   # Restart
   cd frontend && npm run dev
   ```

---

### Issue: Styles look wrong

**Symptoms:**
- No gradient background
- Buttons look plain
- No colors

**Fix:**
1. Check console for CSS errors
2. Clear browser cache (Cmd+Shift+R or Ctrl+Shift+R)
3. Check TailwindCSS is compiling:
   ```bash
   # In frontend folder
   npm run dev
   # Should show "vite ready"
   ```

---

### Issue: Console shows errors

**Symptoms:**
- Red text in console
- Error messages

**Fix:**
1. Read the error message carefully
2. Most common:
   - Module not found → Run `npm install`
   - CORS error → Check backend is running
   - 404 error → Check file path is correct

---

## 📸 Take Screenshots

Before deploying, take screenshots of:

1. **Homepage** - Full page view
2. **Console Tab** - Showing no errors
3. **Network Tab** - Showing all files loaded (green 200s)
4. **Mobile View** - Resized browser window

These help verify everything works before deployment!

---

## ✅ Pre-Deployment Checklist

Before we deploy to Vercel, verify:

- [ ] Frontend loads at http://localhost:3000
- [ ] Logo displays correctly
- [ ] Backend responds at http://localhost:5001/health
- [ ] Counter button works (React state)
- [ ] No console errors
- [ ] Network tab shows all files load (200 status)
- [ ] Responsive design works
- [ ] Favicon shows in browser tab
- [ ] PWA manifest loads without errors

---

## 🎯 Manual Testing Steps

**Let me walk you through this step by step:**

### Step 1: Open Frontend
```
1. Open your browser
2. Type: http://localhost:3000
3. Press Enter
```

**Tell me:** ✅ Do you see the MAMA HAI logo?

### Step 2: Test Interaction
```
1. Find the "Click Count: 0" button
2. Click it 5 times
```

**Tell me:** ✅ Does it count to 5?

### Step 3: Check Console
```
1. Press F12 (or Cmd+Option+I on Mac)
2. Click "Console" tab
3. Look for red errors
```

**Tell me:** ✅ Any red errors? (Share if yes)

### Step 4: Check Logo File
```
1. Look at browser tab (very top)
2. Look at main page (center, near top)
```

**Tell me:** ✅ See logo in both places?

### Step 5: Test Backend
```
1. Open new browser tab
2. Go to: http://localhost:5001/health
```

**Tell me:** ✅ Do you see JSON response with "status: ok"?

---

## 🎉 If All Tests Pass

If everything above works, you're ready to deploy!

**What this means:**
- ✅ React is working
- ✅ Vite is building correctly
- ✅ TailwindCSS is compiling
- ✅ Backend is responding
- ✅ Logo is integrated
- ✅ PWA is configured
- ✅ No critical errors

**Next step:** Let's deploy to Vercel! 🚀

---

## 📞 Report Results

**Please confirm these work:**

1. **Frontend loads:** ☐ Yes / ☐ No / ☐ Issues
2. **Logo shows:** ☐ Yes / ☐ No / ☐ Issues
3. **Counter works:** ☐ Yes / ☐ No / ☐ Issues
4. **No console errors:** ☐ Yes / ☐ No / ☐ Issues
5. **Backend responds:** ☐ Yes / ☐ No / ☐ Issues

**If all YES:** We're ready for Vercel deployment! 🎊

**If any NO:** Let me know which one, and I'll help fix it before deploying.

---

Ready to test? Open http://localhost:3000 in your browser now! 🧪
