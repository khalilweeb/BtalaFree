import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllJobs } from "../../api/jobs";
import Navbar from "../../components/Navbar";
import "../../assets/styles/jobs.css";

export default function BrowseJobs() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const data = await getAllJobs();
      // Filter only pending jobs for freelancers
      const pendingJobs = data.filter(job => job.status === "pending");
      setJobs(pendingJobs);
      setFilteredJobs(pendingJobs);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    
    const filtered = jobs.filter(job =>
      job.jobTitle.toLowerCase().includes(term) ||
      job.description.toLowerCase().includes(term)
    );
    setFilteredJobs(filtered);
  };

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="jobs-container">
          <div className="loading-state">
            <div className="spinner-large"></div>
            <p>Loading available jobs...</p>
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
          <h1>Browse Available Jobs</h1>
          <input
            type="text"
            placeholder="Search jobs..."
            value={searchTerm}
            onChange={handleSearch}
            className="search-input"
          />
        </div>

        <div className="jobs-grid">
          {filteredJobs.map((job) => (
            <div key={job._id} className="job-card-full">
              <div className="job-card-title-row">
                <h2>{job.jobTitle}</h2>
                {job.hasProposed && (
                  <span className="proposed-badge">
                    ✓ Already Proposed
                  </span>
                )}
              </div>
              <p className="job-description">{job.description}</p>
              
              <div className="job-details">
                <div className="detail-item">
                  <strong>Budget:</strong> ${job.budget}
                </div>
                <div className="detail-item">
                  <strong>Posted by:</strong> {job.client.firstName} {job.client.lastName}
                </div>
                {job.deadline && (
                  <div className="detail-item">
                    <strong>Deadline:</strong> {new Date(job.deadline).toLocaleDateString()}
                  </div>
                )}
              </div>

              <Link to={`/jobs/${job._id}`} className={`btn-apply ${job.hasProposed ? 'btn-proposed' : ''}`}>
                {job.hasProposed ? '✓ View Your Proposal' : 'View Details & Apply'}
              </Link>
            </div>
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <div className="empty-state-card">
            <div className="empty-icon">🔍</div>
            <h3>No Jobs Found</h3>
            <p>
              {searchTerm 
                ? `No jobs match your search for "${searchTerm}"`
                : "No available jobs at the moment. Check back soon!"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
