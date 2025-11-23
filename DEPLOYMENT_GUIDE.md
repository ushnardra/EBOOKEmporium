# 🚀 Free Deployment Guide - EBook Emporium

This guide will help you deploy your EBook Emporium application completely FREE!

## 📋 Prerequisites

- GitHub account (already setup ✓)
- Render account (free) - https://render.com
- Vercel account (free) - https://vercel.com

---

## Part 1: Deploy Django Backend on Render (FREE)

### Step 1: Create Render Account
1. Go to https://render.com
2. Sign up with your GitHub account
3. Authorize Render to access your repositories

### Step 2: Create Web Service
1. Click "New +" → "Web Service"
2. Connect your GitHub repository: `ushnardra/EBOOKEmporium`
3. Configure the service:
   - **Name**: `ebook-emporium-backend`
   - **Region**: Choose closest to you
   - **Branch**: `master`
   - **Root Directory**: `backend`
   - **Runtime**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt && python manage.py collectstatic --no-input && python manage.py migrate`
   - **Start Command**: `gunicorn bookstore_backend.wsgi:application`
   - **Instance Type**: **Free**

### Step 3: Add Environment Variables
Click "Advanced" and add these environment variables:
- `PYTHON_VERSION` = `3.11.0`
- `SECRET_KEY` = (Generate a random string, or use: `django-insecure-YOUR-RANDOM-KEY-HERE`)
- `DEBUG` = `False`
- `FRONTEND_URL` = (Leave empty for now, we'll add this after deploying frontend)

### Step 4: Create PostgreSQL Database (Optional - FREE tier available)
1. Go to "New +" → "PostgreSQL"
2. **Name**: `ebook-emporium-db`
3. **Database**: `ebook_emporium`
4. **User**: `ebook_user`
5. **Instance Type**: **Free**
6. Create Database

### Step 5: Connect Database to Web Service
1. Go back to your web service
2. Add environment variable:
   - `DATABASE_URL` = (Copy from your PostgreSQL database's "Internal Database URL")

### Step 6: Deploy!
1. Click "Create Web Service"
2. Wait for deployment (5-10 minutes)
3. **Save your backend URL**: `https://ebook-emporium-backend.onrender.com`

**Important Notes:**
- Free tier sleeps after 15 minutes of inactivity
- First request after sleep takes 30-60 seconds
- 750 hours/month of free usage

---

## Part 2: Deploy React Frontend on Vercel (FREE)

### Step 1: Prepare Frontend for Deployment

You need to update your frontend to use the deployed backend URL.

In your `BooksContext.jsx` and `AuthContext.jsx`, update:
```javascript
const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';
```

Create a `.env.production` file in your project root:
```
VITE_API_URL=https://ebook-emporium-backend.onrender.com
```

### Step 2: Create Vercel Account
1. Go to https://vercel.com
2. Sign up with your GitHub account

### Step 3: Deploy Frontend
1. Click "Add New..." → "Project"
2. Import `ushnardra/EBOOKEmporium`
3. Configure project:
   - **Framework Preset**: Vite
   - **Root Directory**: `./` (leave as root)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

### Step 4: Add Environment Variables
- `VITE_API_URL` = `https://ebook-emporium-backend.onrender.com`

### Step 5: Deploy!
1. Click "Deploy"
2. Wait 2-3 minutes
3. **Your site is live!**: `https://ebook-emporium.vercel.app`

### Step 6: Update Backend CORS
Go back to Render and update environment variable:
- `FRONTEND_URL` = `https://ebook-emporium.vercel.app`

Then manually redeploy your backend service.

---

## 🎯 Alternative Free Options

### Backend Alternatives:
1. **PythonAnywhere** (easiest for beginners)
   - Free tier: 1 web app
   - URL: `yourusername.pythonanywhere.com`
   - Note: Manual file upload, no git auto-deploy on free tier

2. **Railway** (has free tier with limitations)
   - $5 free credit monthly
   - Sleeps after inactivity

### Frontend Alternatives:
1. **Netlify** (similar to Vercel)
   - 100 GB bandwidth/month free
   - Continuous deployment from GitHub

2. **GitHub Pages** (static only, requires some config)
   - Free forever
   - URL: `username.github.io/repo-name`

---

## ✅ Post-Deployment Checklist

- [ ] Backend is deployed and accessible
- [ ] Frontend is deployed and accessible
- [ ] CORS is configured correctly (frontend URL added to backend)
- [ ] Environment variables are set correctly
- [ ] API calls work from frontend to backend
- [ ] File uploads work (test book upload)
- [ ] User authentication works (signup/login)

---

## 🐛 Common Issues

### Issue: CORS Error
**Solution**: Make sure `FRONTEND_URL` environment variable is set in Render and includes the exact Vercel URL

### Issue: Backend takes forever to load
**Solution**: Free tier on Render sleeps after inactivity. First request wakes it up (takes 30-60s)

### Issue: Database not saving data
**Solution**: Make sure `DATABASE_URL` is set correctly in Render environment variables

### Issue: Static files (images) not loading
**Solution**: Run `python manage.py collectstatic` is included in build command

---

## 💰 Cost Summary

- **Backend (Render)**: $0/month (with limitations)
- **Database (Render PostgreSQL)**: $0/month (with limitations)
- **Frontend (Vercel)**: $0/month
- **Domain**: $0 (using provided subdomains)

**TOTAL: $0/month** 🎉

---

## 📝 Notes

- Free tiers have limitations but are perfect for personal projects and portfolios
- If your app gets popular, you can upgrade to paid tiers later
- Keep your SECRET_KEY and DATABASE_URL safe - never commit them to GitHub!

---

Good luck with your deployment! 🚀
