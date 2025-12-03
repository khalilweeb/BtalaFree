# 🚀 BtalaFree - Complete Setup Guide

## 📋 Quick Navigation
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [MongoDB Atlas Setup](#mongodb-atlas-setup)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [Demo Accounts](#demo-accounts)

---

## 📦 Prerequisites

Install these before starting:

- **Node.js** (v14+) - [Download](https://nodejs.org/)
- **npm** (v6+) - Comes with Node.js
- **Git** - [Download](https://git-scm.com/)
- **MongoDB Atlas Account** (Free) - [Sign up](https://www.mongodb.com/cloud/atlas)

**Verify installations:**
```bash
node --version
npm --version
git --version
```

---

## 🔧 Installation

### 1. Clone Repository
```bash
git clone https://github.com/YOUR_USERNAME/BtalaFree.git
cd BtalaFree
```

### 2. Install Backend Dependencies
```bash
cd server
npm install
```

### 3. Install Frontend Dependencies
```bash
cd ../front
npm install
```

---

## 🗄️ MongoDB Atlas Setup (Cloud Database)

### Step 1: Create Account
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. **Sign up** for free
3. **Create new cluster** (choose FREE M0 tier)

### Step 2: Database Access (Create User)
1. Click **"Database Access"** in left sidebar
2. Click **"Add New Database User"**
3. Choose **"Password"** authentication method
4. **Set username:** `btalauser` (or your choice)
5. **Set password:** Choose a strong password (SAVE THIS!)
6. **Privileges:** "Read and write to any database"
7. Click **"Add User"**

### Step 3: Network Access (Allow Connections)
1. Click **"Network Access"** in left sidebar
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"**  
   (Sets IP: `0.0.0.0/0` - good for development)
4. Click **"Confirm"**

### Step 4: Get Connection String
1. Click **"Database"** in left sidebar
2. Click **"Connect"** button on your cluster
3. Choose **"Connect your application"**
4. **Driver:** Node.js
5. **Version:** 4.1 or later
6. **Copy** the connection string:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

### Step 5: Prepare Connection String
Replace placeholders in the connection string:

**Original:**
```
mongodb+srv://<username>:<password>@cluster0.abc123.mongodb.net/?retryWrites=true&w=majority
```

**Modified (Example):**
```
mongodb+srv://btalauser:MySecurePass123@cluster0.abc123.mongodb.net/btala-free?retryWrites=true&w=majority
```

**Important Changes:**
- Replace `<username>` with your database username
- Replace `<password>` with your database password
- Add database name: `/btala-free` before the `?`
- Keep `?retryWrites=true&w=majority`

---

## 🔐 Environment Variables

### Create `.env` File in `server` Directory

```bash
# Navigate to server directory
cd server

# Create .env file
# Windows:
type nul > .env

# Mac/Linux:
touch .env
```

### Edit `server/.env` File

Add this content (replace with YOUR values):

```env
# MongoDB Atlas Connection String
# Replace YOUR_USERNAME, YOUR_PASSWORD, and cluster address
MONGO_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/btala-free?retryWrites=true&w=majority

# JWT Secret (use random string)
JWT_SECRET=your_very_secure_random_jwt_secret_key_12345678

# Server Port
PORT=5000

# Environment
NODE_ENV=development
```

### Example `.env` File

```env
MONGO_URI=mongodb+srv://btalauser:MySecurePass123@cluster0.abc123.mongodb.net/btala-free?retryWrites=true&w=majority
JWT_SECRET=2c3cd82e9178f409bd9108b6bf5192788eec5621930f33f5f87f7932c06a6af8
PORT=5000
NODE_ENV=development
```

### Generate Secure JWT Secret

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## ▶️ Running the Application

### Terminal 1: Start Backend

```bash
# Navigate to server directory
cd server

# Run development server with auto-reload
npm run dev
```

✅ **Backend running:** `http://localhost:5000`

**You should see:**
```
Server is running on port 5000
MongoDB connected successfully
```

### Terminal 2: Start Frontend

```bash
# Navigate to frontend directory (from root)
cd front

# Start React development server
npm run dev
```

✅ **Frontend running:** `http://localhost:3000`

### Access Application

Open browser: `http://localhost:3000`

---

## 🌱 Seed Database with Demo Data

```bash
# In server directory
cd server
npm run seed
```

**Creates:**
- ✅ 5 Users (2 clients, 3 freelancers)
- ✅ 5 Jobs
- ✅ 5 Proposals
- ✅ 1 Contract

---

## 👤 Demo Accounts

### Clients

| Email | Password | Name |
|-------|----------|------|
| `client1@demo.com` | `password123` | John Smith |
| `client2@demo.com` | `password123` | Sarah Johnson |

### Freelancers

| Email | Password | Name | Skills |
|-------|----------|------|--------|
| `freelancer1@demo.com` | `password123` | Alice Brown | React, Node.js, MongoDB |
| `freelancer2@demo.com` | `password123` | Bob Wilson | Python, Django |
| `freelancer3@demo.com` | `password123` | Charlie Davis | UI/UX, Figma |

---

## 🐛 Troubleshooting

### Cannot Connect to MongoDB

**Error:** `MongooseServerSelectionError`

**Solutions:**
1. Check MONGO_URI in `.env`
2. Verify MongoDB Atlas Network Access allows your IP
3. Confirm database user has correct permissions
4. Ensure password doesn't have special characters (or URL-encode them)

### Port Already in Use

**Error:** `Port 5000 is already in use`

**Solutions:**
```bash
# Change PORT in server/.env to different number
PORT=5001

# Or kill process on port 5000 (Windows)
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:5000 | xargs kill -9
```

### JWT Authentication Fails

**Solutions:**
1. Clear browser localStorage
2. Check JWT_SECRET in `.env`
3. Log out and log in again

### CORS Errors

**Solutions:**
1. Ensure backend is running on port 5000
2. Ensure frontend is running on port 3000
3. Check CORS configuration in `server/server.js`

---

## ✅ Checklist Before Running

- [ ] Node.js installed
- [ ] MongoDB Atlas cluster created
- [ ] Database user created
- [ ] Network access configured
- [ ] Connection string copied
- [ ] `.env` file created in `server/`
- [ ] MONGO_URI added to `.env`
- [ ] JWT_SECRET added to `.env`
- [ ] Backend dependencies installed (`npm install` in server/)
- [ ] Frontend dependencies installed (`npm install` in front/)
- [ ] Database seeded (`npm run seed`)
- [ ] Backend running (`npm run dev` in server/)
- [ ] Frontend running (`npm run dev` in front/)

---

## 📱 Quick Start Commands

```bash
# 1. Clone and navigate
git clone https://github.com/YOUR_USERNAME/BtalaFree.git
cd BtalaFree

# 2. Setup backend
cd server
npm install
# Create .env file and add MongoDB URI + JWT secret
npm run seed
npm run dev

# 3. Setup frontend (new terminal)
cd ../front
npm install
npm run dev

# 4. Open browser
# Go to: http://localhost:3000
# Login: freelancer1@demo.com / password123
```

---

## 🎯 What to Do After Setup

1. **Login** with demo account
2. **Browse Jobs** as freelancer
3. **Submit Proposal** on a job
4. **See "Already Proposed" badge**
5. **Login as client** (`client1@demo.com`)
6. **Review proposals** in "My Jobs"
7. **Accept a proposal**
8. **View contract** in "Contracts"

---

## 📞 Need Help?

1. Check [Troubleshooting](#troubleshooting) section
2. Verify all [Checklist](#checklist-before-running) items
3. Review MongoDB Atlas connection string format
4. Ensure both servers are running
5. Check browser console for errors

---

**Happy Coding! 🎉**
