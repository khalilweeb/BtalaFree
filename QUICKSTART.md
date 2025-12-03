# 🚀 BtalaFree - Quick Start Guide

Get BtalaFree up and running in 5 minutes!

---

## ⚡ Quick Setup

### 1️⃣ Start MongoDB

**Windows:**
```powershell
# Start MongoDB service
net start MongoDB
```

**macOS/Linux:**
```bash
brew services start mongodb-community
# OR
sudo systemctl start mongod
```

---

### 2️⃣ Start Backend Server

Open **Terminal 1** (PowerShell on Windows):

```powershell
cd C:\Users\Dell\Desktop\ProjetAdnene\BtalaFree\server

# Install dependencies (first time only)
npm install

# Start the server
npm run dev
```

✅ Backend running on: `http://localhost:5000`

---

### 3️⃣ Start Frontend

Open **Terminal 2** (New PowerShell window):

```powershell
cd C:\Users\Dell\Desktop\ProjetAdnene\BtalaFree\front

# Install dependencies (first time only)
npm install

# Start the frontend
npm run dev
```

✅ Frontend running on: `http://localhost:5173`

---

### 4️⃣ Access the Application

Open your browser and go to:
```
http://localhost:5173
```

---

## 👤 Test Users

### Create Test Accounts

#### Client Account
1. Click "Register"
2. Fill in:
   - First Name: John
   - Last Name: Client
   - Email: client@test.com
   - Password: password123
   - Role: **Client**

#### Freelancer Account
1. Click "Register"
2. Fill in:
   - First Name: Jane
   - Last Name: Freelancer
   - Email: freelancer@test.com
   - Password: password123
   - Role: **Freelancer**

#### Admin Account
1. Register as usual, then manually update the role in MongoDB:
```javascript
// In MongoDB shell or Compass
db.users.updateOne(
  { email: "admin@test.com" },
  { $set: { role: "admin" } }
)
```

---

## 🎯 Testing the Workflow

### As a Client:
1. ✅ Login as client
2. ✅ Navigate to "Post Job"
3. ✅ Create a job with title, description, and budget
4. ✅ View your posted jobs on dashboard

### As a Freelancer:
1. ✅ Login as freelancer
2. ✅ Navigate to "Browse Jobs"
3. ✅ Click on a job
4. ✅ Click "Submit Proposal"
5. ✅ Fill in bid amount and cover letter
6. ✅ Submit proposal

### As a Client (Reviewing Proposals):
1. ✅ Go to your job details
2. ✅ View received proposals
3. ✅ Review freelancer profiles
4. ✅ Accept a proposal (creates contract automatically)

### Contract Management:
1. ✅ Both parties can view contract in "Contracts" section
2. ✅ Client can mark contract as "Completed"
3. ✅ Either party can cancel contract

---

## 🔧 Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution:** Make sure MongoDB is running
```powershell
mongod
```

### Port Already in Use
```
Error: Port 5000 is already in use
```
**Solution:** Kill the process or change PORT in `.env`

### Frontend Not Loading
**Solution:** Clear browser cache and restart the dev server

---

## 📝 Environment Variables

Located at: `server/.env`

```env
MONGO_URI=mongodb://localhost:27017/btalafree
PORT=5000
JWT_SECRET=2c3cd82e9178f409bd9108b6bf5192788eec5621930f33f5f87f7932c06a6af8
```

---

## 🎨 Key Features to Test

- ✅ User Registration & Login
- ✅ Role-based Dashboards
- ✅ Job Posting (Client)
- ✅ Job Browsing (Freelancer)
- ✅ Proposal Submission
- ✅ Proposal Review & Accept
- ✅ Contract Management
- ✅ Contract Completion

---

## 📦 Project URLs

| Service | URL |
|---------|-----|
| Frontend | http://localhost:5173 |
| Backend API | http://localhost:5000/api |
| MongoDB | mongodb://localhost:27017/btalafree |

---

## 🆘 Need Help?

Check the full [README.md](./README.md) for:
- Complete API documentation
- Detailed feature list
- Project structure
- Advanced configuration

---

**Happy Coding! 🚀**
