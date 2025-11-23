# 🚀 100% FREE Deployment Guide - EBook Emporium

This guide will help you deploy your **frontend** and **backend** completely **FREE** using:
- **Backend**: Railway (500 hours/month free) or Render (750 hours/month free)
- **Frontend**: Netlify (100GB bandwidth/month free)
- **Database**: PostgreSQL (managed by Railway/Render - FREE)
- **Django Admin**: Full control over your database

---

## 📋 Prerequisites

1. **GitHub Account** (free): https://github.com
2. **Railway Account** (free): https://railway.app OR **Render Account** (free): https://render.com
3. **Netlify Account** (free): https://netlify.com

---

## 🗑️ STEP 0: Clean Up Before Deployment

### Files to DELETE (not needed for deployment):
```
✅ run_frontend.bat
✅ run_backend.bat
✅ backend/db.sqlite3 (local database - will use PostgreSQL in production)
✅ backend/venv/ (virtual environment - DO NOT commit)
✅ dist/ folder (will be rebuilt during deployment)
✅ .env.production (if it contains local URLs)
```

### Files that MUST STAY:
```
✅ backend/Procfile (Railway/Render needs this)
✅ backend/requirements.txt (dependencies list)
✅ netlify.toml (Netlify configuration)
✅ .gitignore files (prevent committing unnecessary files)
```

---

## 📦 PART 1: Prepare Your Code for GitHub

### 1.1 Verify .gitignore files are updated
Your `.gitignore` files should exclude:
- `node_modules/`
- `venv/`
- `db.sqlite3`
- `media/`
- `.env`
- `.bat` files

### 1.2 Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `ebook-emporium` (or your choice)
3. Make it **Public** (required for free tier)
4. **Do NOT** initialize with README (you already have one)
5. Click **Create repository**

### 1.3 Push to GitHub

Open a terminal in your project root and run:

```bash
# Check git status
git status

# Add all files
git add .

# Commit
git commit -m "Ready for deployment"

# Add GitHub remote (replace with YOUR repo URL)
git remote add origin https://github.com/YOUR_USERNAME/ebook-emporium.git

# Push to GitHub
git branch -M main
git push -u origin main
```

---

## 🔧 PART 2A: Deploy Backend on Railway (OPTION 1 - Recommended)

### 2A.1 Create Railway Account
1. Go to https://railway.app
2. Sign up with GitHub (links your repos automatically)

### 2A.2 Create New Project

1. Click **New Project**
2. Select **Deploy from GitHub repo**
3. Choose your `ebook-emporium` repository
4. Railway will detect your project

### 2A.3 Configure Backend Service

1. Click on the created service card
2. Go to **Settings**:
   - **Root Directory**: `/backend`
   - **Build Command**: (leave empty, uses `build.sh` automatically)
   - **Start Command**: (leave empty, uses `Procfile` automatically)

### 2A.4 Add PostgreSQL Database

1. Click **New** → **Database** → **Add PostgreSQL**
2. Railway will automatically:
   - Create a PostgreSQL database
   - Inject `DATABASE_URL` into your backend service

### 2A.5 Add Environment Variables

Go to your Backend Service → **Variables** tab and add:

```
SECRET_KEY = your-super-secret-random-key-here-make-it-long-and-random
DEBUG = False
ALLOWED_HOSTS = *
```

**To generate SECRET_KEY**, run this in Python:
```python
import secrets
print(secrets.token_urlsafe(50))
```

### 2A.6 Deploy & Get Backend URL

1. Railway will auto-deploy (check **Deployments** tab)
2. Once deployed, go to **Settings** → **Generate Domain**
3. Copy your Railway domain (e.g., `https://ebook-backend-production-xxxx.up.railway.app`)

### 2A.7 Create Django Admin Superuser

You need to create an admin account to manage your database.

**Option A - Using Railway CLI** (recommended):
```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Link to your project
railway link

# Create superuser
railway run python manage.py createsuperuser
```

**Option B - Using Environment Variable**:
Add these to Railway Variables:
```
DJANGO_SUPERUSER_USERNAME = admin
DJANGO_SUPERUSER_EMAIL = admin@example.com
DJANGO_SUPERUSER_PASSWORD = YourStrongPassword123!
```

Then add this to `backend/build.sh`:
```bash
python manage.py createsuperuser --noinput || true
```

---

## 🔧 PART 2B: Deploy Backend on Render (OPTION 2 - Alternative)

### 2B.1 Create Render Account
1. Go to https://render.com
2. Sign up with GitHub

### 2B.2 Create New Web Service

1. Click **New** → **Web Service**
2. Connect your GitHub repository
3. Configure:
   - **Name**: `ebook-backend`
   - **Root Directory**: `backend`
   - **Runtime**: `Python 3`
   - **Build Command**: `./build.sh`
   - **Start Command**: `gunicorn bookstore_backend.wsgi:application`

### 2B.3 Add PostgreSQL Database

1. Click **New** → **PostgreSQL**
2. Name it `ebook-database`
3. Select **Free** tier
4. Copy the **Internal Database URL**

### 2B.4 Add Environment Variables

In your Web Service → **Environment**:
```
DATABASE_URL = [paste your PostgreSQL Internal Database URL]
SECRET_KEY = [generate using Python secrets]
DEBUG = False
PYTHON_VERSION = 3.11.0
```

### 2B.5 Deploy & Get Backend URL

1. Click **Create Web Service**
2. Wait for deployment (5-10 minutes first time)
3. Copy your Render URL (e.g., `https://ebook-backend.onrender.com`)

---

## 🌐 PART 3: Deploy Frontend on Netlify

### 3.1 Create Netlify Account
1. Go to https://netlify.com
2. Sign up with GitHub

### 3.2 Create New Site

1. Click **Add new site** → **Import an existing project**
2. Choose **GitHub**
3. Select your `ebook-emporium` repository
4. Configure build settings:
   - **Base directory**: (leave empty)
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`

### 3.3 Add Environment Variable

Click **Show advanced** → **New variable**:
```
VITE_API_URL = https://your-backend-url-from-railway-or-render.app
```
⚠️ **IMPORTANT**: Remove any trailing slash from the URL!

Example:
- ✅ `https://ebook-backend-production.up.railway.app`
- ❌ `https://ebook-backend-production.up.railway.app/`

### 3.4 Deploy Site

1. Click **Deploy site**
2. Wait for build (2-5 minutes)
3. Copy your Netlify URL (e.g., `https://ebook-emporium.netlify.app`)

---

## 🔗 PART 4: Connect Frontend & Backend

### 4.1 Update Backend CORS

Go back to **Railway/Render** → Backend Service → **Variables**:

Add/Update:
```
FRONTEND_URL = https://your-netlify-site-url.netlify.app
```

The backend will automatically restart and allow requests from your frontend.

### 4.2 Test Your Deployment

1. Open your Netlify URL
2. Try signing up / logging in
3. Try uploading a book
4. Check if everything works!

---

## 🛠️ PART 5: Manage Your Database via Django Admin

### 5.1 Access Django Admin

1. Go to: `https://your-backend-url.app/admin`
2. Login with your superuser credentials

### 5.2 What You Can Do in Django Admin

✅ **Books**: Add, edit, delete books manually
✅ **Comments**: Moderate user comments
✅ **Users**: View and manage user accounts
✅ **Authentication tokens**: Manage user sessions

### 5.3 Managing Data

**To add books via admin**:
1. Go to `/admin` → Books → Add Book
2. Fill in all fields
3. Save

**To add categories/genres**:
- Genres are currently stored as text fields in the Book model
- You can create books with different genres

**To manage users**:
1. `/admin` → Users
2. View all registered users
3. Make users staff/superuser if needed

---

## 💰 FREE Tier Limits

### Railway (FREE Plan)
- ✅ 500 hours/month (~20 days)
- ✅ 512MB RAM
- ✅ 1GB Storage
- ✅ PostgreSQL Database included
- ⚠️ Sleeps after 30 mins of inactivity (wakes instantly)

### Render (FREE Plan)
- ✅ 750 hours/month (~31 days)
- ✅ 512MB RAM
- ✅ PostgreSQL Database (90 days, then expires)
- ⚠️ Sleeps after 15 mins of inactivity (takes ~30s to wake)

### Netlify (FREE Plan)
- ✅ 100GB bandwidth/month
- ✅ 300 build minutes/month
- ✅ Unlimited sites
- ✅ Instant global CDN
- ✅ No sleep - always on!

---

## 🐛 Troubleshooting

### Backend Issues

**Problem**: `ModuleNotFoundError`
- **Fix**: Check your `requirements.txt` includes all dependencies

**Problem**: Database connection error
- **Fix**: Verify `DATABASE_URL` is set correctly in environment variables

**Problem**: Cannot access `/admin`
- **Fix**: Make sure you created a superuser (see Part 2A.7 or 2B)

### Frontend Issues

**Problem**: API calls failing (CORS error)
- **Fix**: Add your Netlify URL to `FRONTEND_URL` in backend env variables

**Problem**: `VITE_API_URL is undefined`
- **Fix**: Add `VITE_API_URL` to Netlify environment variables and redeploy

**Problem**: 404 on page refresh
- **Fix**: `netlify.toml` should have redirects configured (already done)

### Both

**Problem**: Site is slow
- **Fix**: Free tiers sleep when inactive. First request wakes them (30s delay)

---

## 🔄 How to Update Your App

### For Code Changes:

```bash
# Make your changes locally
# Test them

# Commit and push
git add .
git commit -m "Description of changes"
git push origin main
```

Both Railway/Render and Netlify will **automatically deploy** when you push to GitHub!

### For Django Admin Changes:

Just use the `/admin` panel - no deployment needed!

---

## 📱 Your Live URLs

After deployment, save these:

- **Frontend**: `https://your-site.netlify.app`
- **Backend API**: `https://your-backend.up.railway.app/api/`
- **Django Admin**: `https://your-backend.up.railway.app/admin`

---

## ✅ Post-Deployment Checklist

- [ ] Backend deployed successfully
- [ ] Database connected (PostgreSQL)
- [ ] Superuser created for Django Admin
- [ ] Frontend deployed successfully
- [ ] `VITE_API_URL` set correctly
- [ ] `FRONTEND_URL` set in backend
- [ ] Can login/signup from frontend
- [ ] Can upload books
- [ ] Can access Django Admin panel
- [ ] Can manage books/users via admin

---

## 🎉 You're Done!

Your EBook Emporium is now **fully deployed** and **100% FREE**!

### Database Control
- All database operations are controlled via **Django Admin**
- Access it at: `your-backend-url/admin`
- You have full CRUD (Create, Read, Update, Delete) capabilities

### Need Help?
- Railway Docs: https://docs.railway.app
- Render Docs: https://render.com/docs
- Netlify Docs: https://docs.netlify.com
- Django Admin: https://docs.djangoproject.com/en/5.0/ref/contrib/admin/
