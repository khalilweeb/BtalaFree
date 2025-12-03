import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { getFreelancerProposals } from "../../api/proposals";
import Navbar from "../../components/Navbar";
import "../../assets/styles/jobs.css";

export default function MyProposals() {
  const { user } = useContext(AuthContext);
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // all, pending, accepted, rejected

  useEffect(() => {
    fetchMyProposals();
  }, []);

  const fetchMyProposals = async () => {
    try {
      setLoading(true);
      const data = await getFreelancerProposals(user.id || user._id);
      console.log("Fetched proposals:", data);
      setProposals(data || []);
    } catch (error) {
      console.error("Error fetching proposals:", error);
      setProposals([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredProposals = proposals.filter((proposal) => {
    if (filter === "all") return true;
    return proposal.status === filter;
  });

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="jobs-container">
          <div className="loading-state">
            <div className="spinner-large"></div>
            <p>Loading your proposals...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="jobs-container">
        <div className="jobs-header">
          <div>
            <h1>My Proposals</h1>
            <p className="subtitle">Track all your submitted proposals</p>
          </div>
          <Link to="/jobs" className="btn-primary">
            Browse Jobs
          </Link>
        </div>

        {/* Statistics Cards */}
        <div className="stats-grid">
          <div className="stat-card-mini">
            <div className="stat-icon">📨</div>
            <div className="stat-content">
              <h3>{proposals.length}</h3>
              <p>Total Proposals</p>
            </div>
          </div>
          <div className="stat-card-mini">
            <div className="stat-icon">⏳</div>
            <div className="stat-content">
              <h3>{proposals.filter((p) => p.status === "pending").length}</h3>
              <p>Pending</p>
            </div>
          </div>
          <div className="stat-card-mini">
            <div className="stat-icon">✅</div>
            <div className="stat-content">
              <h3>{proposals.filter((p) => p.status === "accepted").length}</h3>
              <p>Accepted</p>
            </div>
          </div>
          <div className="stat-card-mini">
            <div className="stat-icon">❌</div>
            <div className="stat-content">
              <h3>{proposals.filter((p) => p.status === "rejected").length}</h3>
              <p>Rejected</p>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="filter-tabs">
          <button
            className={`filter-tab ${filter === "all" ? "active" : ""}`}
            onClick={() => setFilter("all")}
          >
            All ({proposals.length})
          </button>
          <button
            className={`filter-tab ${filter === "pending" ? "active" : ""}`}
            onClick={() => setFilter("pending")}
          >
            Pending ({proposals.filter((p) => p.status === "pending").length})
          </button>
          <button
            className={`filter-tab ${filter === "accepted" ? "active" : ""}`}
            onClick={() => setFilter("accepted")}
          >
            Accepted ({proposals.filter((p) => p.status === "accepted").length})
          </button>
          <button
            className={`filter-tab ${filter === "rejected" ? "active" : ""}`}
            onClick={() => setFilter("rejected")}
          >
            Rejected ({proposals.filter((p) => p.status === "rejected").length})
          </button>
        </div>

        {/* Proposals List */}
        {filteredProposals.length === 0 ? (
          <div className="empty-state-card">
            <div className="empty-icon">📨</div>
            <h3>No Proposals Found</h3>
            <p>
              {filter === "all"
                ? "You haven't submitted any proposals yet. Browse jobs and apply!"
                : `No ${filter} proposals at the moment.`}
            </p>
            {filter === "all" && (
              <Link to="/jobs" className="btn-primary">
                Browse Available Jobs
              </Link>
            )}
          </div>
        ) : (
          <div className="proposals-list">
            {filteredProposals.map((proposal) => (
              <div key={proposal._id} className="proposal-card-full">
                <div className="proposal-header">
                  <div className="proposal-job-info">
                    <h3>{proposal.job?.jobTitle || "Job Title"}</h3>
                    <p className="client-name">
                      Client: {proposal.client?.firstName}{" "}
                      {proposal.client?.lastName}
                      {proposal.client?.companyName &&
                        ` (${proposal.client.companyName})`}
                    </p>
                  </div>
                  <span className={`status-badge status-${proposal.status}`}>
                    {proposal.status}
                  </span>
                </div>

                <div className="proposal-content">
                  <div className="proposal-details">
                    <div className="detail-item">
                      <span className="detail-label">💰 Your Bid:</span>
                      <span className="detail-value">
                        ${proposal.proposedAmount}
                      </span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">💼 Job Budget:</span>
                      <span className="detail-value">${proposal.job?.budget}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">📅 Submitted:</span>
                      <span className="detail-value">
                        {new Date(proposal.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <div className="cover-letter">
                    <h4>Cover Letter:</h4>
                    <p>{proposal.coverLetter}</p>
                  </div>
                </div>

                <div className="proposal-actions">
                  <Link
                    to={`/jobs/${proposal.job?._id}`}
                    className="btn-secondary"
                  >
                    View Job Details
                  </Link>
                  {proposal.status === "accepted" && (
                    <Link to="/contracts" className="btn-primary">
                      View Contract
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
