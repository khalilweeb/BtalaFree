import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllJobs } from "../../api/jobs";
import { getProposalsByFreelancer } from "../../api/proposals";
import { getUserContracts } from "../../api/contracts";
import Navbar from "../../components/Navbar";
import "../../assets/styles/dashboard.css";

export default function FreelancerDashboard() {
  const [jobs, setJobs] = useState([]);
  const [proposals, setProposals] = useState([]);
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const [jobsData, proposalsData, contractsData] = await Promise.all([
        getAllJobs(),
        getProposalsByFreelancer(user.id),
        getUserContracts(),
      ]);
      
      // Filter only pending jobs
      const availableJobs = jobsData.filter(job => job.status === "pending");
      
      setJobs(availableJobs);
      setProposals(proposalsData);
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
        <h1>Freelancer Dashboard</h1>
        
        <div className="dashboard-stats">
          <div className="stat-card">
            <h3>{proposals.length}</h3>
            <p>Submitted Proposals</p>
          </div>
          <div className="stat-card">
            <h3>{proposals.filter(p => p.status === "accepted").length}</h3>
            <p>Accepted</p>
          </div>
          <div className="stat-card">
            <h3>{contracts.filter(c => c.etat === "active").length}</h3>
            <p>Active Contracts</p>
          </div>
        </div>

        <div className="dashboard-section">
          <div className="section-header">
            <h2>Available Jobs</h2>
            <Link to="/jobs" className="btn-primary">
              Browse All Jobs
            </Link>
          </div>
          
          <div className="jobs-list">
            {jobs.slice(0, 5).map((job) => (
              <div key={job._id} className="job-card">
                <h3>{job.jobTitle}</h3>
                <p>{job.description.substring(0, 100)}...</p>
                <div className="job-meta">
                  <span className="budget">${job.budget}</span>
                  <span className="client">
                    Posted by: {job.client.firstName} {job.client.lastName}
                  </span>
                </div>
                <Link to={`/jobs/${job._id}`} className="btn-secondary">
                  View & Apply
                </Link>
              </div>
            ))}
          </div>
          
          {jobs.length === 0 && (
            <div className="empty-state-card">
              <div className="empty-icon">💼</div>
              <h3>No Jobs Available</h3>
              <p>Check back soon for new opportunities!</p>
              <Link to="/jobs" className="btn-primary">
                Refresh Jobs
              </Link>
            </div>
          )}
        </div>

        <div className="dashboard-section">
          <h2>Recent Proposals</h2>
          <div className="proposals-list">
            {proposals.slice(0, 5).map((proposal) => (
              <div key={proposal._id} className="proposal-card">
                <h3>{proposal.job.jobTitle}</h3>
                <p>Your Bid: ${proposal.proposedAmount}</p>
                <span className={`status status-${proposal.status}`}>
                  {proposal.status}
                </span>
              </div>
            ))}
          </div>
          
          {proposals.length === 0 && (
            <div className="empty-state-card">
              <div className="empty-icon">📨</div>
              <h3>No Proposals Yet</h3>
              <p>Browse available jobs and submit your first proposal!</p>
              <Link to="/jobs" className="btn-primary">
                Find Jobs
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
                <p>Client: {contract.client.firstName} {contract.client.lastName}</p>
                <p>Started: {new Date(contract.start_dt).toLocaleDateString()}</p>
                <Link to={`/contracts/${contract._id}`} className="btn-secondary">
                  View Details
                </Link>
              </div>
            ))}
          </div>
          
          {contracts.filter(c => c.etat === "active").length === 0 && (
            <div className="empty-state-card">
              <div className="empty-icon">📄</div>
              <h3>No Active Contracts</h3>
              <p>Get hired by submitting winning proposals!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
