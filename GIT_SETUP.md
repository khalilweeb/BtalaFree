# 📦 Git Setup Guide - BtalaFree

This guide will help you set up Git for your project and push it to GitHub.

---

## ✅ What Was Added

### **3 .gitignore Files Created:**

1. **Root `.gitignore`** - Main project level
2. **`server/.gitignore`** - Backend specific
3. **`front/.gitignore`** - Frontend specific (enhanced)

---

## 🚫 What Will Be Ignored

### **Dependencies:**
- ✅ `node_modules/` (both frontend & backend)
- ✅ `package-lock.json` (can be regenerated)
- ✅ `yarn.lock` / `pnpm-lock.yaml`

### **Environment Files:**
- ✅ `.env` (contains sensitive data like MongoDB connection)
- ✅ `.env.local`, `.env.development`, `.env.production`
- ✅ All environment variable files

### **Build Outputs:**
- ✅ `dist/` (Vite build output)
- ✅ `build/` (production builds)
- ✅ `.vite/` (Vite cache)

### **Logs:**
- ✅ `*.log` files
- ✅ `npm-debug.log`
- ✅ `yarn-error.log`

### **OS Files:**
- ✅ `.DS_Store` (macOS)
- ✅ `Thumbs.db` (Windows)
- ✅ `Desktop.ini` (Windows)

### **Editor Files:**
- ✅ `.vscode/` (VS Code settings)
- ✅ `.idea/` (IntelliJ/WebStorm)
- ✅ `*.swp`, `*.swo` (Vim)

---

## 🔧 Git Setup - Step by Step

### **1. Initialize Git Repository**

Open PowerShell in your project root:

```powershell
cd C:\Users\Dell\Desktop\ProjetAdnene\BtalaFree

# Initialize Git
git init

# Check status
git status
```

You should see only the files that are **not** ignored!

---

### **2. Create a .env.example File**

Since `.env` is ignored, create an example file for other developers:

**Create `server/.env.example`:**
```env
# MongoDB Connection
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority

# Server Port
PORT=5000

# JWT Secret (generate your own)
JWT_SECRET=your_secret_key_here
```

---

### **3. Add Files to Git**

```powershell
# Add all files (respecting .gitignore)
git add .

# Check what will be committed
git status
```

**You should see:**
- ✅ Source code files (.js, .jsx, .css)
- ✅ Configuration files (package.json, vite.config.js)
- ✅ Documentation (README.md, etc.)
- ❌ node_modules/ (ignored)
- ❌ .env files (ignored)
- ❌ dist/ (ignored)

---

### **4. Create Initial Commit**

```powershell
git commit -m "Initial commit: BtalaFree freelance platform"
```

---

## 🌐 Push to GitHub

### **Option 1: Create New Repository on GitHub**

1. Go to https://github.com
2. Click **"New Repository"**
3. Name it: `BtalaFree`
4. **Don't** initialize with README (we already have one)
5. Click **"Create Repository"**

---

### **Option 2: Connect to Existing Repository**

```powershell
# Add remote origin
git remote add origin https://github.com/YOUR_USERNAME/BtalaFree.git

# Verify remote
git remote -v

# Push to GitHub
git branch -M main
git push -u origin main
```

---

## 📝 Commit Messages Guide

### **Good Commit Messages:**
```bash
✅ "Add user authentication with JWT"
✅ "Fix: Resolve password toggle bug in login"
✅ "Feature: Add contract management UI"
✅ "Update: Enhance dashboard empty states"
✅ "Docs: Update README with installation guide"
```

### **Bad Commit Messages:**
```bash
❌ "update"
❌ "fix bug"
❌ "changes"
❌ "asdfasdf"
```

---

## 🔄 Daily Git Workflow

### **1. Before Starting Work:**
```powershell
# Pull latest changes
git pull origin main
```

### **2. Make Your Changes:**
- Edit files
- Test your changes

### **3. Check What Changed:**
```powershell
git status
git diff
```

### **4. Stage and Commit:**
```powershell
# Add specific files
git add path/to/file.js

# Or add all changes
git add .

# Commit with message
git commit -m "Add feature: Description of changes"
```

### **5. Push to GitHub:**
```powershell
git push origin main
```

---

## 🌿 Branch Workflow (Recommended)

### **Create Feature Branch:**
```powershell
# Create and switch to new branch
git checkout -b feature/user-profiles

# Make changes, then commit
git add .
git commit -m "Add user profile page"

# Push branch to GitHub
git push origin feature/user-profiles
```

### **Merge Branch:**
```powershell
# Switch to main
git checkout main

# Merge feature branch
git merge feature/user-profiles

# Push to GitHub
git push origin main

# Delete branch (optional)
git branch -d feature/user-profiles
```

---

## 🚨 Important Notes

### **⚠️ NEVER Commit These Files:**
- ❌ `.env` (contains secrets!)
- ❌ `node_modules/` (too large)
- ❌ Build files (`dist/`, `build/`)
- ❌ Log files
- ❌ Personal IDE settings

### **✅ DO Commit These:**
- ✅ Source code (`.js`, `.jsx`, `.css`)
- ✅ Configuration (without secrets)
- ✅ Documentation (`.md` files)
- ✅ `.env.example` (template only)

---

## 🔐 Security Best Practices

### **1. Environment Variables:**
```bash
# ❌ NEVER do this
git add server/.env

# ✅ Always use example files
git add server/.env.example
```

### **2. If You Accidentally Committed .env:**
```powershell
# Remove from Git (keeps local file)
git rm --cached server/.env

# Commit the removal
git commit -m "Remove .env from repository"

# Push
git push origin main

# Then go to GitHub and rotate all secrets!
```

---

## 📊 Check Your .gitignore Works

```powershell
# List all files Git will track
git ls-files

# Should NOT see:
# - node_modules/
# - .env
# - dist/
# - *.log files
```

---

## 🎯 Quick Reference

| Command | Description |
|---------|-------------|
| `git status` | Check current status |
| `git add .` | Stage all changes |
| `git commit -m "msg"` | Commit with message |
| `git push` | Push to remote |
| `git pull` | Pull from remote |
| `git log` | View commit history |
| `git diff` | See changes |
| `git checkout -b branch` | Create new branch |

---

## 📦 Clone Your Repository Later

When you need to clone your project on another machine:

```powershell
# Clone repository
git clone https://github.com/YOUR_USERNAME/BtalaFree.git

cd BtalaFree

# Install backend dependencies
cd server
npm install

# Create .env file (copy from .env.example)
cp .env.example .env
# Then edit .env with your actual credentials

# Install frontend dependencies
cd ../front
npm install

# Run the project
# Backend:
cd ../server
npm run dev

# Frontend (new terminal):
cd ../front
npm run dev
```

---

## ✅ Checklist Before First Push

- [ ] `.gitignore` files created (root, server, front)
- [ ] `.env.example` created in server directory
- [ ] `node_modules/` not in staging area
- [ ] `.env` not in staging area
- [ ] README.md updated
- [ ] All tests passing
- [ ] Code reviewed
- [ ] Commit message is clear

---

## 🎉 You're Ready!

Your repository is now properly configured with:
- ✅ Comprehensive .gitignore files
- ✅ Proper file exclusions
- ✅ Security best practices
- ✅ Clean Git history

**Happy coding! 🚀**

---

## 🆘 Need Help?

**Common Issues:**

### **Issue: Files still tracked after adding to .gitignore**
```powershell
# Remove from Git cache
git rm -r --cached .
git add .
git commit -m "Update .gitignore"
```

### **Issue: Merge conflicts**
```powershell
# Check conflicted files
git status

# Edit files to resolve conflicts
# Then:
git add .
git commit -m "Resolve merge conflicts"
```

### **Issue: Want to undo last commit**
```powershell
# Undo commit but keep changes
git reset --soft HEAD~1

# Undo commit and discard changes
git reset --hard HEAD~1
```

---

**For more help, check:** https://git-scm.com/doc
