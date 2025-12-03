# 🚀 BtalaFree - Professional Freelance Marketplace

<div align="center">

![BtalaFree](https://img.shields.io/badge/BtalaFree-Freelance%20Platform-blue?style=for-the-badge)
![MERN Stack](https://img.shields.io/badge/Stack-MERN-green?style=for-the-badge)
![MongoDB Atlas](https://img.shields.io/badge/Database-MongoDB%20Atlas-brightgreen?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)

**A modern, full-featured freelance marketplace built with the MERN stack**

*Connect clients with talented freelancers • Manage proposals • Track contracts*

[Features](#-features) • [Demo](#-demo) • [Installation](#-quick-start) • [Setup Guide](./SETUP_GUIDE.md)

![BtalaFree Screenshot](https://via.placeholder.com/800x400?text=BtalaFree+Platform+Screenshot)

</div>

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Demo](#-demo)
- [Quick Start](#-quick-start)
- [Project Structure](#-project-structure)
- [API Documentation](#-api-documentation)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

### 🔐 Authentication & User Management
- **Secure JWT Authentication** with bcrypt password hashing
- **Dual Role System**: Separate interfaces for clients and freelancers
- **Profile Management**: Complete user profiles with skills, ratings, and experience levels

### 💼 Job Management
- **Post Jobs**: Clients create detailed job listings with budget and deadlines
- **Browse Jobs**: Freelancers search and filter available opportunities
- **Smart Filtering**: Search by title, budget, skills, and deadline
- **Status Tracking**: Real-time job status updates (pending, assigned, completed)

### 📝 Proposal System
- **Submit Proposals**: Freelancers submit detailed bids with:
  - Bid amount
  - Skills (auto-filled from profile)
  - Personal rating
  - Estimated duration
  - Cover letter
- **"Already Proposed" Badges**: Visual indicators prevent duplicate submissions
- **Accept/Reject**: Clients review and manage proposals with custom modals

### 📄 Contract Management
- **Automatic Creation**: Contracts auto-generated when proposals are accepted
- **Status Tracking**: Monitor contract lifecycle (active, completed, cancelled)
- **Dual Views**: Different interfaces for clients and freelancers
- **Action Buttons**: Complete or cancel contracts with confirmation modals

### 🎨 Modern UI/UX
- **Toast Notifications**: Beautiful custom notifications for all actions
- **Loading States**: Professional spinners with context-specific messages
- **Custom Modals**: Confirmation dialogs for important actions
- **Responsive Design**: Seamless experience on desktop and mobile
- **Empty States**: Helpful messages when no data is available
- **Real-time Updates**: Auto-refresh on page navigation

---

## 🛠️ Tech Stack

### Frontend
```json
{
  "React": "19.1.1",
  "React Router DOM": "7.9.6",
  "Axios": "1.13.2",
  "Vite": "7.1.7"
}
```

### Backend
```json
{
  "Node.js": ">=14.0.0",
  "Express.js": "5.1.0",
  "MongoDB": "Cloud Atlas",
  "Mongoose": "8.19.1",
  "JWT": "Authentication",
  "bcryptjs": "Password Hashing"
}
```

### Development Tools
- **ES6+ JavaScript** with ES Modules
- **dotenv** for environment management
- **Nodemon** for auto-reload

---

## 🎯 Demo

### Live Demo
🔗 **[Try BtalaFree Live](https://your-demo-link.com)** *(Coming soon)*

### Demo Accounts

After seeding the database, use these credentials:

#### 👔 Clients
| Email | Password | Name |
|-------|----------|------|
| `client1@demo.com` | `password123` | John Smith |
| `client2@demo.com` | `password123` | Sarah Johnson |

#### 💼 Freelancers
| Email | Password | Name | Skills |
|-------|----------|------|--------|
| `freelancer1@demo.com` | `password123` | Alice Brown | React, Node.js, MongoDB, Express |
| `freelancer2@demo.com` | `password123` | Bob Wilson | Python, Django, PostgreSQL |
| `freelancer3@demo.com` | `password123` | Charlie Davis | UI/UX, Figma, HTML/CSS |

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v14+)
- npm (v6+)
- MongoDB Atlas account (Free)

### Installation

```bash
# 1. Clone repository
git clone https://github.com/YOUR_USERNAME/BtalaFree.git
cd BtalaFree

# 2. Install backend dependencies
cd server
npm install

# 3. Install frontend dependencies
cd ../front
npm install
```

### Setup MongoDB Atlas

**📚 [Complete Setup Guide](./SETUP_GUIDE.md)**

Quick steps:
1. Create free MongoDB Atlas account
2. Create cluster (M0 Free tier)
3. Add database user
4. Configure network access (allow all IPs for development)
5. Get connection string

### Environment Variables

Create `server/.env`:

```env
MONGO_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/btala-free?retryWrites=true&w=majority
JWT_SECRET=your_secure_random_jwt_secret_key
PORT=5000
NODE_ENV=development
```

**⚠️ Important:** Replace `YOUR_USERNAME`, `YOUR_PASSWORD`, and cluster address with your actual MongoDB Atlas credentials.

### Run Application

**Terminal 1 - Backend:**
```bash
cd server
npm run seed    # Seed database with demo data
npm run dev     # Start backend server
```

**Terminal 2 - Frontend:**
```bash
cd front
npm run dev     # Start frontend server
```

**Access:** Open `http://localhost:3000`

---

## 📁 Project Structure

```
BtalaFree/
├── front/                          # React Frontend
│   ├── src/
│   │   ├── api/                   # API services
│   │   ├── components/            # Reusable components
│   │   │   ├── Toast.jsx         # Toast notifications
│   │   │   ├── ConfirmModal.jsx  # Confirmation modals
│   │   │   └── Navbar.jsx        # Navigation bar
│   │   ├── contexts/             # React Context
│   │   │   └── AuthContext.jsx
│   │   ├── hooks/                # Custom hooks
│   │   │   └── useToast.js
│   │   ├── pages/                # Page components
│   │   │   ├── Auth/             # Login, Register
│   │   │   ├── Jobs/             # Browse, Details, MyJobs
│   │   │   ├── Proposals/        # MyProposals
│   │   │   └── Contracts/        # Contract management
│   │   ├── assets/styles/        # CSS files
│   │   └── routes/Routes.jsx
│   └── package.json
│
├── server/                         # Express Backend
│   ├── controllers/               # Business logic
│   │   ├── authController.js
│   │   ├── jobController.js
│   │   ├── proposalController.js
│   │   └── contractController.js
│   ├── models/                    # Mongoose schemas
│   │   ├── User.js
│   │   ├── Job.js
│   │   ├── Proposel.js
│   │   └── Contract.js
│   ├── routes/                    # API routes
│   ├── middleware/                # Auth middleware
│   ├── .env                       # Environment variables
│   ├── seed.js                    # Database seeder
│   └── server.js                  # Entry point
│
├── SETUP_GUIDE.md                 # Detailed setup instructions
└── README.md                      # This file
```

---

## 📡 API Documentation

### Base URL: `http://localhost:5000/api`

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/user/signup` | Register new user |
| POST | `/user/login` | Login user |
| GET | `/user/profile` | Get user profile (Auth required) |

### Jobs
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/jobs` | Get all jobs | ✅ |
| GET | `/jobs/:id` | Get job by ID | ✅ |
| POST | `/jobs` | Create job | ✅ Client |
| PUT | `/jobs/:id` | Update job | ✅ Owner |
| DELETE | `/jobs/:id` | Delete job | ✅ Owner |
| GET | `/jobs/client/:clientId` | Get client's jobs | ✅ |

### Proposals
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/proposals` | Submit proposal | ✅ Freelancer |
| GET | `/proposals/job/:jobId` | Get job proposals | ✅ Client |
| GET | `/proposals/freelancer/:freelancerId` | Get freelancer proposals | ✅ |
| PUT | `/proposals/:id/accept` | Accept proposal | ✅ Client |
| PUT | `/proposals/:id/reject` | Reject proposal | ✅ Client |

### Contracts
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/contracts` | Get user contracts | ✅ |
| GET | `/contracts/:id` | Get contract details | ✅ |
| PUT | `/contracts/:id/complete` | Complete contract | ✅ Client |
| PUT | `/contracts/:id/cancel` | Cancel contract | ✅ Both |

---

## 🎨 Key Features Showcase

### Professional Toast Notifications
- ✅ Success, Error, Warning, Info types
- ✅ Auto-dismiss after 3 seconds
- ✅ Smooth slide-in animations
- ✅ Stack multiple notifications

### Custom Confirmation Modals
- ✅ Beautiful backdrop with blur effect
- ✅ Color-coded buttons (success/danger)
- ✅ Click outside to close
- ✅ Smooth slide-up animation

### "Already Proposed" System
- ✅ Green pulsing badges on job cards
- ✅ Automatic duplicate prevention
- ✅ Shows proposal status
- ✅ Auto-refresh on navigation

### Professional Loading States
- ✅ Animated spinners
- ✅ Context-specific messages
- ✅ Consistent across all pages
- ✅ Empty state cards with icons

---

## 🧪 Testing

### Seed Database
```bash
cd server
npm run seed
```

### Test Workflow

**As Freelancer:**
1. Login: `freelancer1@demo.com` / `password123`
2. Browse available jobs
3. See "Already Proposed" badges on applied jobs
4. Submit proposal with auto-filled skills and rating
5. View proposals in "My Proposals"
6. Track proposal status

**As Client:**
1. Login: `client1@demo.com` / `password123`
2. Post new job
3. View job proposals in "My Jobs"
4. Accept/Reject proposals with custom modal
5. View created contracts
6. Complete or cancel contracts

---

## 🐛 Troubleshooting

### MongoDB Connection Error
- Verify MongoDB Atlas connection string
- Check network access settings (allow your IP)
- Ensure database user has read/write permissions

### Port Already in Use
```bash
# Change PORT in server/.env
PORT=5001
```

### CORS Errors
- Ensure backend runs on port 5000
- Ensure frontend runs on port 3000
- Check CORS configuration in server.js

### More Help
📚 **[Complete Troubleshooting Guide](./SETUP_GUIDE.md#-troubleshooting)**

---

## 🤝 Contributing

Contributions are welcome! Here's how:

1. **Fork** the repository
2. **Create** a feature branch
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit** your changes
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. **Push** to the branch
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open** a Pull Request

### Coding Guidelines
- Follow existing code style
- Add comments for complex logic
- Test your changes thoroughly
- Update documentation if needed

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**BtalaFree Team**

---

## 🙏 Acknowledgments

- **MongoDB Atlas** for free cloud database hosting
- **React** team for the amazing UI library
- **Express.js** for the robust backend framework
- All contributors and testers

---

## 📞 Support

Need help? Here's how to get support:

1. 📚 Check the [Setup Guide](./SETUP_GUIDE.md)
2. 🐛 Review [Troubleshooting](#-troubleshooting)
3. 💬 Open an [Issue](https://github.com/YOUR_USERNAME/BtalaFree/issues)
4. 📧 Email: support@btalafree.com

---

## 🎯 Roadmap

### Upcoming Features
- [ ] Real-time messaging (Socket.io)
- [ ] File upload for portfolios
- [ ] Payment integration
- [ ] Rating and review system
- [ ] Advanced search filters
- [ ] Email notifications
- [ ] Admin analytics dashboard
- [ ] Mobile app (React Native)

---

## 📊 Stats

![GitHub stars](https://img.shields.io/github/stars/YOUR_USERNAME/BtalaFree?style=social)
![GitHub forks](https://img.shields.io/github/forks/YOUR_USERNAME/BtalaFree?style=social)
![GitHub issues](https://img.shields.io/github/issues/YOUR_USERNAME/BtalaFree)
![GitHub pull requests](https://img.shields.io/github/issues-pr/YOUR_USERNAME/BtalaFree)

---

<div align="center">

**Made with ❤️ using the MERN Stack**

⭐ **Star this repo if you find it helpful!** ⭐

[Report Bug](https://github.com/YOUR_USERNAME/BtalaFree/issues) • [Request Feature](https://github.com/YOUR_USERNAME/BtalaFree/issues) • [Documentation](./SETUP_GUIDE.md)

**Happy Freelancing! 🎉**

</div>
