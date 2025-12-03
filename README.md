# 🚀 BtalaFree - Professional Freelance Marketplace

<div align="center">

![BtalaFree](https://img.shields.io/badge/BtalaFree-Freelance%20Platform-blue)
![MERN Stack](https://img.shields.io/badge/Stack-MERN-green)
![MongoDB](https://img.shields.io/badge/Database-MongoDB%20Atlas-brightgreen)
![License](https://img.shields.io/badge/License-MIT-yellow)

**A modern, full-featured freelance marketplace built with the MERN stack**

Connect clients with talented freelancers • Manage proposals • Track contracts

[Features](#features) • [Installation](#installation) • [Usage](#usage) • [Demo](#demo-accounts)

</div>

---

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [MongoDB Atlas Setup](#mongodb-atlas-setup)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [Demo Accounts](#demo-accounts)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

---

## ✨ Features

### 🔐 Authentication & Authorization
- User registration and login with JWT authentication
- Password hashing with bcryptjs
- Role-based access control (Admin, Client, Freelancer)
- Protected routes on both frontend and backend

### 👔 For Clients
- Post job opportunities with title, description, budget, and deadline
- View all posted jobs with status tracking
- Receive and review proposals from freelancers
- Accept/reject proposals
- Create and manage contracts
- Mark contracts as completed
- View freelancer profiles with ratings and skills

### 💼 For Freelancers
- Browse available job listings
- Submit proposals with cover letter and bid amount
- Track proposal status (pending, accepted, rejected)
- View active contracts
- Complete portfolio with skills and experience level
- Build rating through completed projects

### 📊 Contract Management
- Automatic contract creation upon proposal acceptance
- Contract status tracking (active, completed, cancelled)
- Timeline tracking with start and end dates
- Cancel contracts (both parties)
- Complete contracts (client only)

### 🎫 Token System (Ready for Implementation)
- Token-based payment system
- Token packs for purchase
- Frozen tokens mechanism
- User balance tracking

### 👨‍💼 Admin Features
- View all users
- Update user roles
- Delete users
- Manage token packs

---

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** v5.1.0 - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** v8.19.1 - ODM for MongoDB
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **Socket.io** v4.8.1 - Real-time communication (ready for implementation)
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

### Frontend
- **React** v19.1.1 - UI library
- **Vite** v7.1.7 - Build tool and dev server
- **React Router DOM** v7.9.6 - Routing
- **Axios** v1.13.2 - HTTP client
- **Socket.io-client** v4.8.1 - Real-time client (ready for implementation)

---

## 📁 Project Structure

```
BtalaFree/
├── server/                     # Backend application
│   ├── config/
│   │   └── db.js              # MongoDB connection
│   ├── controllers/           # Request handlers
│   │   ├── adminController.js
│   │   ├── contractController.js
│   │   ├── jobController.js
│   │   ├── proposalController.js
│   │   ├── tokenPackController.js
│   │   └── userController.js
│   ├── middleware/            # Custom middleware
│   │   ├── authMiddleware.js
│   │   └── adminMiddleware.js
│   ├── models/                # Mongoose schemas
│   │   ├── Contract.js
│   │   ├── Job.js
│   │   ├── Proposel.js
│   │   ├── TokenPack.js
│   │   └── User.js
│   ├── routes/                # API routes
│   │   ├── adminRoutes.js
│   │   ├── contractRoutes.js
│   │   ├── jobRoutes.js
│   │   ├── proposalRoutes.js
│   │   ├── tokenPackRoutes.js
│   │   └── user.js
│   ├── .env                   # Environment variables
│   ├── package.json
│   └── server.js              # Entry point
│
├── front/                     # Frontend application
│   ├── public/
│   ├── src/
│   │   ├── api/               # API service layer
│   │   │   ├── axios.js
│   │   │   ├── auth.js
│   │   │   ├── contracts.js
│   │   │   ├── jobs.js
│   │   │   ├── proposals.js
│   │   │   └── users.js
│   │   ├── assets/
│   │   │   └── styles/        # CSS files
│   │   ├── components/        # Reusable components
│   │   │   ├── Button.jsx
│   │   │   └── Navbar.jsx
│   │   ├── contexts/          # React Context
│   │   │   └── AuthContext.jsx
│   │   ├── pages/             # Page components
│   │   │   ├── Auth/
│   │   │   │   ├── Login.jsx
│   │   │   │   └── Register.jsx
│   │   │   ├── Contracts/
│   │   │   │   ├── ContractDetails.jsx
│   │   │   │   └── ContractsList.jsx
│   │   │   ├── Dashboard/
│   │   │   │   ├── ClientDashboard.jsx
│   │   │   │   └── FreelancerDashboard.jsx
│   │   │   └── Jobs/
│   │   │       ├── BrowseJobs.jsx
│   │   │       ├── CreateJob.jsx
│   │   │       └── JobDetails.jsx
│   │   ├── routes/
│   │   │   └── Routes.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
└── README.md                  # This file
```

---

## 📦 Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (v4.4 or higher) - [Download](https://www.mongodb.com/try/download/community)
- **npm** or **yarn** - Package manager (comes with Node.js)
- **Git** - Version control

---

## 🔧 Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
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

### 4. Configure Environment Variables

The `.env` file already exists in the `server` directory with the following configuration:

```env
MONGO_URI=mongodb://localhost:27017/btalafree
PORT=5000
JWT_SECRET=2c3cd82e9178f409bd9108b6bf5192788eec5621930f33f5f87f7932c06a6af8
```

**Note:** For production, generate a new JWT_SECRET using:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## 🚀 Running the Application

### Start MongoDB

Make sure MongoDB is running on your system:

**Windows:**
```bash
# Start MongoDB service
net start MongoDB
# OR if running manually
mongod
```

**macOS/Linux:**
```bash
sudo systemctl start mongod
# OR
brew services start mongodb-community
```

### Start the Backend Server

Open a terminal in the `server` directory:

```bash
cd server

# Development mode with auto-restart
npm run dev

# OR Production mode
npm start
```

The server will start on `http://localhost:5000`

### Start the Frontend Development Server

Open a **new terminal** in the `front` directory:

```bash
cd front
npm run dev
```

The frontend will start on `http://localhost:5173`

### Access the Application

Open your browser and navigate to:
```
http://localhost:5173
```

---

## 🔌 API Endpoints

### Authentication (`/api/user`)
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/signup` | Register new user | No |
| POST | `/login` | Login user | No |
| GET | `/profile` | Get user profile | Yes |
| PUT | `/profile` | Update user profile | Yes |
| GET | `/freelancers` | Get all freelancers | No |
| GET | `/freelancers/:id` | Get freelancer by ID | No |
| PUT | `/portfolio` | Update freelancer portfolio | Yes (Freelancer) |

### Jobs (`/api/jobs`)
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/` | Get all jobs | No |
| POST | `/` | Create new job | Yes (Client) |
| GET | `/:id` | Get job by ID | No |
| PUT | `/:id` | Update job | Yes (Owner) |
| DELETE | `/:id` | Delete job | Yes (Owner) |

### Proposals (`/api/proposals`)
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/` | Submit proposal | Yes (Freelancer) |
| GET | `/job/:jobId` | Get proposals for job | Yes (Client) |
| GET | `/freelancer/:id` | Get freelancer proposals | Yes |
| PUT | `/:id/accept` | Accept proposal | Yes (Client) |
| PUT | `/:id/reject` | Reject proposal | Yes (Client) |

### Contracts (`/api/contracts`)
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/` | Create contract | Yes (Client) |
| GET | `/` | Get user contracts | Yes |
| GET | `/:id` | Get contract by ID | Yes |
| PUT | `/:id/complete` | Complete contract | Yes (Client) |
| PUT | `/:id/cancel` | Cancel contract | Yes (Both parties) |

### Admin (`/api/admin`)
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/users` | Get all users | Yes (Admin) |
| PUT | `/users/:id/role` | Update user role | Yes (Admin) |
| DELETE | `/users/:id` | Delete user | Yes (Admin) |

### Token Packs (`/api/tokenpack`)
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/` | Get all token packs | No |
| POST | `/` | Create token pack | Yes (Admin) |
| PUT | `/:id` | Update token pack | Yes (Admin) |
| DELETE | `/:id` | Delete token pack | Yes (Admin) |

---

## 👥 User Roles

### 🔹 Client
- Post jobs
- Review proposals
- Accept/reject proposals
- Create contracts
- Mark contracts as completed

### 🔹 Freelancer
- Browse jobs
- Submit proposals
- Manage portfolio
- Track contracts
- Build rating

### 🔹 Admin
- Manage users
- Update user roles
- Delete users
- Manage token packs
- System oversight

---

## 📸 Screenshots

### Login Page
Users can login with their email and password.

### Client Dashboard
- View posted jobs statistics
- Quick access to job posting
- Active contracts overview

### Freelancer Dashboard
- Available jobs
- Submitted proposals tracking
- Active contracts

### Job Details
- Full job description
- Proposal submission form (for freelancers)
- Received proposals (for clients)

### Contract Management
- Contract details
- Timeline tracking
- Action buttons (complete/cancel)

---

## 🎯 Future Enhancements

- [ ] Real-time messaging between clients and freelancers (Socket.io)
- [ ] Payment integration
- [ ] Token purchase and spending system
- [ ] File upload for portfolios and deliverables
- [ ] Rating and review system
- [ ] Advanced search and filtering
- [ ] Email notifications
- [ ] Admin analytics dashboard
- [ ] Dispute resolution system
- [ ] Mobile responsive design improvements

---

## 🐛 Known Issues

None at the moment. Please report any issues you encounter!

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the MIT License.

---

## 👨‍💻 Author

**Adnene's Project - BtalaFree**

---

## 📞 Support

For support, email support@btalafree.com or open an issue in the repository.

---

## 🙏 Acknowledgments

- Inspired by Upwork
- Built with the MERN stack
- Icons and styling inspired by modern web design practices

---

**Happy Freelancing! 🎉**
