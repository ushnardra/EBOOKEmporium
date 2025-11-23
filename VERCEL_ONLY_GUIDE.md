# 🚀 Vercel-Only Deployment Guide (Frontend + Backend)

This guide explains how to deploy your **entire** application (React + Django) on Vercel for free.

## ⚠️ CRITICAL: Database & Admin
Since you want to use **Django Admin**, you **MUST** connect a real database (Vercel Postgres).
*   **Why?** Vercel is "serverless". If you use the default `db.sqlite3` file, it will **reset** every time your site sleeps or updates. All your admin changes will be lost instantly.
*   **Solution**: We will use **Vercel Postgres** (Free).

---

## Step 1: Push to GitHub
Make sure your latest code is on GitHub (I have already done this for you).

## Step 2: Create Vercel Project
1.  Go to [Vercel Dashboard](https://vercel.com/dashboard).
2.  Click **"Add New..."** -> **"Project"**.
3.  Import your repository: `ushnardra/EBOOKEmporium`.
4.  **Configuration**:
    *   **Framework Preset**: `Vite` (it usually detects this).
    *   **Root Directory**: `./` (leave default).
    *   **Build Command**: `npm run build` (default).
    *   **Output Directory**: `dist` (default).
5.  **Environment Variables**:
    *   `DEBUG` = `False`
    *   `SECRET_KEY` = (Any random string)
    *   `VITE_API_URL` = `/` (This is important! It tells React to use the same domain)

## Step 3: Add Database (Vercel Postgres) - REQUIRED
1.  After the project is created, go to the **"Storage"** tab in your Vercel project dashboard.
2.  Click **"Connect Store"** -> **"Create New"** -> **"Postgres"**.
3.  Accept the terms and create.
4.  **IMPORTANT**: Once created, Vercel automatically adds environment variables (`POSTGRES_URL`, etc.) to your project. You don't need to do anything else for connection!

## Step 4: Deploy
1.  Go to **"Deployments"** tab.
2.  If it failed before (due to missing DB), click **"Redeploy"**.
3.  Wait for it to finish.

## Step 5: Initialize Database (Create Tables & Superuser)
Since we can't "SSH" into Vercel, we need to run commands remotely.
The easiest way is to connect to your Vercel database from your local computer.

1.  In Vercel Storage tab, click **"Quick Connect"** (or ".env.local") and copy the connection details.
2.  On your **LOCAL** computer, update your `.env` or just export the variable:
    *   (Windows PowerShell): `$env:DATABASE_URL="postgres://default:PASSWORD@...vercel-storage.com:5432/verceldb"`
3.  Run migrations locally (pointing to remote DB):
    ```bash
    cd backend
    python manage.py migrate
    python manage.py createsuperuser
    ```
4.  Now your remote database has tables and an admin user!

## Step 6: Access Admin
Go to `https://your-project.vercel.app/admin`.
Login with the superuser you just created.
**Your data will now persist!**

---

## ⚠️ Note on Media Files (Images/PDFs)
While the database works, **user-uploaded files** (new book covers/PDFs) will still vanish after a few minutes on Vercel.
*   **Solution**: Use a cloud storage service like **Cloudinary** or **AWS S3** for media files.
*   For now, your pre-uploaded books will work fine.

