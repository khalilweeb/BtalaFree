import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import "../assets/styles/navbar.css";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/dashboard" className="nav-logo">
          BtalaFree
        </Link>
        
        <div className="nav-menu">
          {user && (
            <>
              <Link to="/dashboard" className="nav-link">
                Dashboard
              </Link>
              
              {user.role === "client" && (
                <>
                  <Link to="/jobs/create" className="nav-link">
                    Post Job
                  </Link>
                  <Link to="/my-jobs" className="nav-link">
                    My Jobs
                  </Link>
                </>
              )}
              
              {user.role === "freelancer" && (
                <>
                  <Link to="/jobs" className="nav-link">
                    Browse Jobs
                  </Link>
                  <Link to="/my-proposals" className="nav-link">
                    My Proposals
                  </Link>
                </>
              )}
              
              <Link to="/contracts" className="nav-link">
                Contracts
              </Link>
              
              {user.role === "admin" && (
                <Link to="/admin/dashboard" className="nav-link">
                  Admin Panel
                </Link>
              )}
              
              <div className="nav-user">
                <span className="user-name">{user.fullName}</span>
                <span className="user-role">({user.role})</span>
                <button onClick={handleLogout} className="btn-logout">
                  Logout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
