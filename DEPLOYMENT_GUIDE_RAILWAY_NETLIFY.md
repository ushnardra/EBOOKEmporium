# 🚀 Deployment Guide: Railway (Backend) & Netlify (Frontend)

This guide will help you deploy your EBook Emporium application.

## 📋 Prerequisites

- GitHub account
- Railway account (https://railway.app)
- Netlify account (https://netlify.com)

---

## Part 1: GitHub Setup

1.  **Create a new repository** on GitHub (e.g., `ebook-emporium`).
2.  **Push your code** to this repository.
    *   I have already prepared the local files.
    *   Run the following commands in your terminal:
        ```bash
        git remote add origin <YOUR_GITHUB_REPO_URL>
        git branch -M main
        git push -u origin main
        ```

---

## Part 2: Deploy Backend on Railway

1.  **Login to Railway** and click **New Project** > **Deploy from GitHub repo**.
2.  Select your `ebook-emporium` repository.
3.  **Configure the Service**:
    *   Click on the newly created service card.
    *   Go to **Settings**.
    *   **Root Directory**: Set this to `/backend`.
    *   **Build Command**: `pip install -r requirements.txt && python manage.py collectstatic --noinput && python manage.py migrate`
    *   **Start Command**: `gunicorn bookstore_backend.wsgi` (Railway might auto-detect the Procfile, but good to double check).
4.  **Add a Database**:
    *   Right-click on the canvas (or click "New") > **Database** > **PostgreSQL**.
    *   This will create a database service.
5.  **Connect Database**:
    *   Railway usually auto-injects `DATABASE_URL` if they are in the same project.
    *   To verify, go to your Backend Service > **Variables**. You should see `DATABASE_URL` (if not, copy it from the Postgres service > Connect > Postgres Connection URL).
6.  **Add Environment Variables** (Backend Service > Variables):
    *   `SECRET_KEY`: (Generate a random string)
    *   `DEBUG`: `False`
    *   `ALLOWED_HOSTS`: `*` (or your railway domain)
    *   `FRONTEND_URL`: (Leave empty for now, we will add Netlify URL later)
7.  **Deploy**:
    *   Railway should automatically deploy. Check the **Deployments** tab for logs.
    *   Once successful, copy the **Public Domain** (e.g., `https://web-production-xxxx.up.railway.app`).

    *Note: If you want to use the Django Admin, you will need to create a superuser. You can do this via Railway CLI or by running a command in the Railway console (if available) or by adding a temporary start command.*
    *   **Create Superuser Command**: `python manage.py createsuperuser --noinput --username admin --email admin@example.com` (You'll need to set `DJANGO_SUPERUSER_PASSWORD` env var).

---

## Part 3: Deploy Frontend on Netlify

1.  **Login to Netlify** and click **Add new site** > **Import from an existing project**.
2.  Select **GitHub** and choose your `ebook-emporium` repository.
3.  **Configure Build Settings**:
    *   **Base directory**: (Leave empty or `/`)
    *   **Build command**: `npm run build`
    *   **Publish directory**: `dist`
4.  **Environment Variables**:
    *   Click **Show advanced** > **New Variable**.
    *   Key: `VITE_API_URL`
    *   Value: (Paste your Railway Backend URL, e.g., `https://web-production-xxxx.up.railway.app`) - **Make sure to remove any trailing slash!**
5.  **Deploy**:
    *   Click **Deploy site**.
6.  **Get Frontend URL**:
    *   Once deployed, copy your Netlify URL (e.g., `https://glowing-site-xxxx.netlify.app`).

---

## Part 4: Final Configuration

1.  **Update Backend CORS**:
    *   Go back to **Railway** > Backend Service > **Variables**.
    *   Add/Update `FRONTEND_URL` with your Netlify URL (e.g., `https://glowing-site-xxxx.netlify.app`).
    *   Railway will restart the service automatically.

2.  **Verify**:
    *   Open your Netlify URL.
    *   Try to login/signup.
    *   Try to upload a book.

---

## ℹ️ Important Note on Database

You mentioned using the "database from django admin".
*   **Railway uses PostgreSQL** (recommended). The data you had locally in `db.sqlite3` **will not** be there. You start fresh.
*   You can use the **Django Admin** on the deployed site (append `/admin` to your backend URL) to add categories, users, etc.
*   If you *really* need your local data, you would need to dump it (`python manage.py dumpdata`) and load it into the production database, which is an advanced step. For now, it's best to start fresh and repopulate via the Admin interface.
