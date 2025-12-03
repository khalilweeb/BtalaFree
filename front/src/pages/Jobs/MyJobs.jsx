import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { getClientJobs } from "../../api/jobs";
import Navbar from "../../components/Navbar";
import "../../assets/styles/jobs.css";

export default function MyJobs() {
  const { user } = useContext(AuthContext);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // all, pending, selected, done

  useEffect(() => {
    fetchMyJobs();
  }, []);

  const fetchMyJobs = async () => {
    try {
      setLoading(true);
      const data = await getClientJobs(user._id);
      setJobs(data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredJobs = jobs.filter((job) => {
    if (filter === "all") return true;
    return job.status === filter;
  });

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="jobs-container">
          <div className="loading-state">
            <div className="spinner-large"></div>
            <p>Loading your jobs...</p>
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
            <h1>My Posted Jobs</h1>
            <p className="subtitle">Manage and track your job postings</p>
          </div>
          <Link to="/jobs/create" className="btn-primary">
            Post New Job
          </Link>
        </div>

        {/* Statistics Cards */}
        <div className="stats-grid">
          <div className="stat-card-mini">
            <div className="stat-icon">📝</div>
            <div className="stat-content">
              <h3>{jobs.length}</h3>
              <p>Total Jobs</p>
            </div>
          </div>
          <div className="stat-card-mini">
            <div className="stat-icon">⏳</div>
            <div className="stat-content">
              <h3>{jobs.filter((j) => j.status === "pending").length}</h3>
              <p>Open</p>
            </div>
          </div>
          <div className="stat-card-mini">
            <div className="stat-icon">✅</div>
            <div className="stat-content">
              <h3>{jobs.filter((j) => j.status === "selected").length}</h3>
              <p>In Progress</p>
            </div>
          </div>
          <div className="stat-card-mini">
            <div className="stat-icon">🎉</div>
            <div className="stat-content">
              <h3>{jobs.filter((j) => j.status === "done").length}</h3>
              <p>Completed</p>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="filter-tabs">
          <button
            className={`filter-tab ${filter === "all" ? "active" : ""}`}
            onClick={() => setFilter("all")}
          >
            All Jobs ({jobs.length})
          </button>
          <button
            className={`filter-tab ${filter === "pending" ? "active" : ""}`}
            onClick={() => setFilter("pending")}
          >
            Open ({jobs.filter((j) => j.status === "pending").length})
          </button>
          <button
            className={`filter-tab ${filter === "selected" ? "active" : ""}`}
            onClick={() => setFilter("selected")}
          >
            In Progress ({jobs.filter((j) => j.status === "selected").length})
          </button>
          <button
            className={`filter-tab ${filter === "done" ? "active" : ""}`}
            onClick={() => setFilter("done")}
          >
            Completed ({jobs.filter((j) => j.status === "done").length})
          </button>
        </div>

        {/* Jobs List */}
        {filteredJobs.length === 0 ? (
          <div className="empty-state-card">
            <div className="empty-icon">📋</div>
            <h3>No Jobs Found</h3>
            <p>
              {filter === "all"
                ? "You haven't posted any jobs yet. Start by posting your first job!"
                : `No ${filter} jobs at the moment.`}
            </p>
            {filter === "all" && (
              <Link to="/jobs/create" className="btn-primary">
                Post Your First Job
              </Link>
            )}
          </div>
        ) : (
          <div className="jobs-grid">
            {filteredJobs.map((job) => (
              <div key={job._id} className="job-card">
                <div className="job-card-header">
                  <h3>{job.jobTitle}</h3>
                  <span className={`status-badge status-${job.status}`}>
                    {job.status}
                  </span>
                </div>

                <p className="job-description">
                  {job.description.substring(0, 150)}...
                </p>

                <div className="job-meta">
                  <div className="meta-item">
                    <span className="meta-label">💰 Budget:</span>
                    <span className="meta-value">${job.budget}</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">📅 Deadline:</span>
                    <span className="meta-value">
                      {new Date(job.deadline).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="job-stats">
                  <div className="stat-item">
                    <span className="stat-number">
                      {job.proposals?.length || 0}
                    </span>
                    <span className="stat-label">Proposals</span>
                  </div>
                  {job.freelancer && (
                    <div className="stat-item">
                      <span className="stat-icon">👤</span>
                      <span className="stat-label">
                        Assigned to {job.freelancer.firstName}
                      </span>
                    </div>
                  )}
                </div>

                <div className="job-actions">
                  <Link to={`/jobs/${job._id}`} className="btn-primary">
                    View Details
                  </Link>
                  {job.status === "pending" && (
                    <span className="action-hint">
                      {job.proposals?.length || 0} proposals waiting
                    </span>
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
