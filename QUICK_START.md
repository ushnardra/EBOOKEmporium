# 🚀 Quick Start - Deployment Steps

This is a **TL;DR** version. For detailed instructions, see `FREE_DEPLOYMENT_GUIDE.md`.

---

## ✅ Prerequisites

1. GitHub account
2. Railway account (https://railway.app) - Sign up with GitHub
3. Netlify account (https://netlify.com) - Sign up with GitHub

---

## 📝 Step-by-Step (5 Main Steps)

### 1️⃣ Push to GitHub

```bash
git add .
git commit -m "Ready for deployment"
git remote add origin https://github.com/YOUR_USERNAME/ebook-emporium.git
git branch -M main
git push -u origin main
```

---

### 2️⃣ Deploy Backend on Railway

1. **Railway Dashboard** → New Project → Deploy from GitHub repo
2. Select your repository
3. **Service Settings**:
   - Root Directory: `/backend`
4. **Add PostgreSQL Database**:
   - New → Database → Add PostgreSQL
5. **Add Environment Variables**:
   ```
   SECRET_KEY = [generate random string]
   DEBUG = False
   ALLOWED_HOSTS = *
   ```
   
   **Optional - Auto-create admin user:**
   ```
   DJANGO_SUPERUSER_USERNAME = admin
   DJANGO_SUPERUSER_EMAIL = admin@example.com
   DJANGO_SUPERUSER_PASSWORD = YourStrongPassword123!
   ```

6. **Generate Domain** and copy URL
7. **Access Django Admin**: `https://your-backend.railway.app/admin`

---

### 3️⃣ Deploy Frontend on Netlify

1. **Netlify Dashboard** → Add new site → Import from GitHub
2. Select your repository
3. **Build Settings**:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. **Environment Variable**:
   ```
   VITE_API_URL = https://your-backend.railway.app
   ```
   ⚠️ Remove trailing slash!

5. **Deploy site** and copy URL

---

### 4️⃣ Connect Frontend & Backend

Go back to Railway → Backend Service → Variables:

Add:
```
FRONTEND_URL = https://your-site.netlify.app
```

Railway will auto-restart.

---

### 5️⃣ Test Everything

1. Open your Netlify URL
2. Sign up / Login
3. Upload a book
4. Access Django Admin: `your-backend-url/admin`
5. Manage books, users, comments via admin panel

---

## 🎯 Database Management

**All database operations are controlled via Django Admin.**

📍 **Admin URL**: `https://your-backend.railway.app/admin`

### What You Can Do:

✅ **Add/Edit/Delete Books** - Full CRUD operations
✅ **Manage Users** - View all registered users
✅ **Moderate Comments** - Delete/edit user comments
✅ **View Statistics** - See all data in organized tables

### Creating Categories:

Genres are text fields in the Book model. When adding a book via admin:
- Enter any genre name (Fiction, Non-Fiction, Sci-Fi, etc.)
- The genre will be saved with the book

---

## 💰 Cost: $0 Forever

- **Railway**: 500 hours/month free
- **Netlify**: 100GB bandwidth/month free
- **PostgreSQL**: Included with Railway
- **Total**: $0.00/month

---

## 🔄 Updating Your App

Just push to GitHub:

```bash
git add .
git commit -m "Your changes"
git push origin main
```

Both Railway and Netlify will **auto-deploy** your changes!

---

## 📚 Important URLs After Deployment

Save these:

- **Frontend**: `https://your-site.netlify.app`
- **Backend API**: `https://your-backend.railway.app/api/`
- **Django Admin**: `https://your-backend.railway.app/admin`

---

## ⚠️ Common Issues

**Backend sleeping**: Free tier sleeps after inactivity. First request takes 30s to wake up. This is normal!

**CORS errors**: Make sure `FRONTEND_URL` is set in Railway environment variables.

**Can't login to admin**: Create superuser using Railway CLI or environment variables (see full guide).

---

## 📖 Full Documentation

For detailed step-by-step instructions with screenshots and troubleshooting:

👉 **See `FREE_DEPLOYMENT_GUIDE.md`**

---

**Happy Deploying! 🎉**
