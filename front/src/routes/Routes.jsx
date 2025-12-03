import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

// Auth Pages
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";

// Dashboard Pages
import ClientDashboard from "../pages/Dashboard/ClientDashboard";
import FreelancerDashboard from "../pages/Dashboard/FreelancerDashboard";

// Job Pages
import BrowseJobs from "../pages/Jobs/BrowseJobs";
import CreateJob from "../pages/Jobs/CreateJob";
import JobDetails from "../pages/Jobs/JobDetails";

// Contract Pages
import ContractsList from "../pages/Contracts/ContractsList";
import ContractDetails from "../pages/Contracts/ContractDetails";

// Placeholder for admin
const AdminDashboard = () => <h2>Admin Dashboard</h2>;

const ProtectedRoute = ({ children, role }) => {
  const { user } = useContext(AuthContext);
  if (!user) return <Navigate to="/login" />;
  if (role && user.role !== role) return <Navigate to="/dashboard" />;
  return children;
};

// Dashboard Router based on role
const DashboardRouter = () => {
  const { user } = useContext(AuthContext);
  
  if (!user) return <Navigate to="/login" />;
  
  if (user.role === "client") return <ClientDashboard />;
  if (user.role === "freelancer") return <FreelancerDashboard />;
  if (user.role === "admin") return <Navigate to="/admin/dashboard" />;
  
  return <Navigate to="/login" />;
};

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardRouter />
          </ProtectedRoute>
        }
      />

      {/* Job Routes */}
      <Route
        path="/jobs"
        element={
          <ProtectedRoute>
            <BrowseJobs />
          </ProtectedRoute>
        }
      />

      <Route
        path="/jobs/create"
        element={
          <ProtectedRoute role="client">
            <CreateJob />
          </ProtectedRoute>
        }
      />

      <Route
        path="/jobs/:id"
        element={
          <ProtectedRoute>
            <JobDetails />
          </ProtectedRoute>
        }
      />

      {/* Contract Routes */}
      <Route
        path="/contracts"
        element={
          <ProtectedRoute>
            <ContractsList />
          </ProtectedRoute>
        }
      />

      <Route
        path="/contracts/:id"
        element={
          <ProtectedRoute>
            <ContractDetails />
          </ProtectedRoute>
        }
      />

      {/* Admin Route */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute role="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      {/* Redirect root to dashboard */}
      <Route path="/" element={<Navigate to="/dashboard" />} />
      
      {/* Catch all */}
      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
}
