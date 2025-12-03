import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllJobs } from "../../api/jobs";
import { getUserContracts } from "../../api/contracts";
import Navbar from "../../components/Navbar";
import "../../assets/styles/dashboard.css";

export default function ClientDashboard() {
  const [jobs, setJobs] = useState([]);
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [jobsData, contractsData] = await Promise.all([
        getAllJobs(),
        getUserContracts(),
      ]);
      
      // Filter jobs posted by current user
      const user = JSON.parse(localStorage.getItem("user"));
      const myJobs = jobsData.filter(job => job.client._id === user.id);
      
      setJobs(myJobs);
      setContracts(contractsData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="dashboard-container">
          <div className="loading-state">
            <div className="spinner-large"></div>
            <p>Loading your dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="dashboard-container">
        <h1>Client Dashboard</h1>
        
        <div className="dashboard-stats">
          <div className="stat-card">
            <h3>{jobs.length}</h3>
            <p>Posted Jobs</p>
          </div>
          <div className="stat-card">
            <h3>{contracts.filter(c => c.etat === "active").length}</h3>
            <p>Active Contracts</p>
          </div>
          <div className="stat-card">
            <h3>{contracts.filter(c => c.etat === "completed").length}</h3>
            <p>Completed</p>
          </div>
        </div>

        <div className="dashboard-section">
          <div className="section-header">
            <h2>Recent Jobs</h2>
            <Link to="/jobs/create" className="btn-primary">
              Post New Job
            </Link>
          </div>
          
          <div className="jobs-list">
            {jobs.slice(0, 5).map((job) => (
              <div key={job._id} className="job-card">
                <h3>{job.jobTitle}</h3>
                <p>{job.description.substring(0, 100)}...</p>
                <div className="job-meta">
                  <span className="budget">${job.budget}</span>
                  <span className={`status status-${job.status}`}>
                    {job.status}
                  </span>
                </div>
                <Link to={`/jobs/${job._id}`} className="btn-secondary">
                  View Details
                </Link>
              </div>
            ))}
          </div>
          
          {jobs.length === 0 && (
            <div className="empty-state-card">
              <div className="empty-icon">📝</div>
              <h3>No Jobs Posted Yet</h3>
              <p>Start by posting your first job and connect with talented freelancers!</p>
              <Link to="/jobs/create" className="btn-primary">
                Post Your First Job
              </Link>
            </div>
          )}
        </div>

        <div className="dashboard-section">
          <h2>Active Contracts</h2>
          <div className="contracts-list">
            {contracts.filter(c => c.etat === "active").map((contract) => (
              <div key={contract._id} className="contract-card">
                <h3>{contract.job.jobTitle}</h3>
                <p>Freelancer: {contract.freelancer.firstName} {contract.freelancer.lastName}</p>
                <p>Started: {new Date(contract.start_dt).toLocaleDateString()}</p>
                <Link to={`/contracts/${contract._id}`} className="btn-secondary">
                  Manage
                </Link>
              </div>
            ))}
          </div>
          
          {contracts.filter(c => c.etat === "active").length === 0 && (
            <div className="empty-state-card">
              <div className="empty-icon">📄</div>
              <h3>No Active Contracts</h3>
              <p>Accept proposals from freelancers to create contracts</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
