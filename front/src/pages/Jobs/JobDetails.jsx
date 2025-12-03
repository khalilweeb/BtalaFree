import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getJobById } from "../../api/jobs";
import { submitProposal, getProposalsByJob, acceptProposal, rejectProposal } from "../../api/proposals";
import { AuthContext } from "../../contexts/AuthContext";
import Navbar from "../../components/Navbar";
import "../../assets/styles/jobDetails.css";

export default function JobDetails() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showProposalForm, setShowProposalForm] = useState(false);
  const [proposalData, setProposalData] = useState({
    coverLetter: "",
    proposedAmount: "",
  });

  useEffect(() => {
    fetchJobDetails();
  }, [id]);

  const fetchJobDetails = async () => {
    try {
      const jobData = await getJobById(id);
      setJob(jobData);
      
      // If client, fetch proposals for this job
      if (user.role === "client" && jobData.client._id === user.id) {
        const proposalsData = await getProposalsByJob(id);
        setProposals(proposalsData);
      }
    } catch (error) {
      console.error("Error fetching job:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleProposalSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await submitProposal({
        job: id,
        ...proposalData,
        proposedAmount: parseFloat(proposalData.proposedAmount),
      });
      
      alert("Proposal submitted successfully!");
      navigate("/my-proposals");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to submit proposal");
    }
  };

  const handleAcceptProposal = async (proposalId) => {
    if (!window.confirm("Are you sure you want to accept this proposal? This will create a contract and mark the job as assigned.")) {
      return;
    }

    try {
      await acceptProposal(proposalId);
      alert("Proposal accepted! Contract created successfully.");
      fetchJobDetails(); // Refresh data
      navigate("/contracts");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to accept proposal");
    }
  };

  const handleRejectProposal = async (proposalId) => {
    if (!window.confirm("Are you sure you want to reject this proposal?")) {
      return;
    }

    try {
      await rejectProposal(proposalId);
      alert("Proposal rejected successfully.");
      fetchJobDetails(); // Refresh data
    } catch (error) {
      alert(error.response?.data?.message || "Failed to reject proposal");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!job) return <div>Job not found</div>;

  const isClient = user.role === "client";
  const isFreelancer = user.role === "freelancer";
  const isMyJob = isClient && job.client._id === user.id;

  return (
    <div>
      <Navbar />
      <div className="job-details-container">
        <div className="job-details-card">
          <div className="job-header">
            <h1>{job.jobTitle}</h1>
            <span className={`status-badge status-${job.status}`}>
              {job.status}
            </span>
          </div>

          <div className="job-info">
            <div className="info-item">
              <strong>Budget:</strong> ${job.budget}
            </div>
            <div className="info-item">
              <strong>Posted by:</strong> {job.client.firstName} {job.client.lastName}
            </div>
            {job.deadline && (
              <div className="info-item">
                <strong>Deadline:</strong> {new Date(job.deadline).toLocaleDateString()}
              </div>
            )}
            <div className="info-item">
              <strong>Posted on:</strong> {new Date(job.createdAt).toLocaleDateString()}
            </div>
          </div>

          <div className="job-description">
            <h2>Description</h2>
            <p>{job.description}</p>
          </div>

          {isFreelancer && job.status === "pending" && (
            <div className="proposal-section">
              {!showProposalForm ? (
                <button
                  onClick={() => setShowProposalForm(true)}
                  className="btn-submit-proposal"
                >
                  Submit Proposal
                </button>
              ) : (
                <form onSubmit={handleProposalSubmit} className="proposal-form">
                  <h3>Submit Your Proposal</h3>
                  
                  <div className="form-group">
                    <label>Your Bid Amount ($)</label>
                    <input
                      type="number"
                      value={proposalData.proposedAmount}
                      onChange={(e) =>
                        setProposalData({ ...proposalData, proposedAmount: e.target.value })
                      }
                      required
                      min="0"
                      step="0.01"
                    />
                  </div>

                  <div className="form-group">
                    <label>Cover Letter</label>
                    <textarea
                      value={proposalData.coverLetter}
                      onChange={(e) =>
                        setProposalData({ ...proposalData, coverLetter: e.target.value })
                      }
                      required
                      rows="6"
                      placeholder="Explain why you're the best fit for this job..."
                    />
                  </div>

                  <div className="form-actions">
                    <button type="submit" className="btn-primary">
                      Submit Proposal
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowProposalForm(false)}
                      className="btn-cancel"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {isMyJob && (
            <div className="proposals-section">
              <h2>Proposals Received ({proposals.length})</h2>
              {proposals.length > 0 ? (
                <div className="proposals-list">
                  {proposals.map((proposal) => (
                    <div key={proposal._id} className="proposal-item">
                      <div className="proposal-header">
                        <h4>
                          {proposal.freelancer.firstName} {proposal.freelancer.lastName}
                        </h4>
                        <span className={`status-badge status-${proposal.status}`}>
                          {proposal.status}
                        </span>
                      </div>
                      <p><strong>Bid:</strong> ${proposal.proposedAmount}</p>
                      <p><strong>Cover Letter:</strong> {proposal.coverLetter}</p>
                      <p><strong>Experience:</strong> {proposal.freelancer.experienceLevel}</p>
                      <p><strong>Skills:</strong> {proposal.freelancer.skills.join(", ")}</p>
                      <p><strong>Rating:</strong> ⭐ {proposal.freelancer.rating}/5</p>
                      
                      {proposal.status === "pending" && job.status === "pending" && (
                        <div className="proposal-actions">
                          <button
                            onClick={() => handleAcceptProposal(proposal._id)}
                            className="btn-accept"
                          >
                            ✓ Accept Proposal
                          </button>
                          <button
                            onClick={() => handleRejectProposal(proposal._id)}
                            className="btn-reject"
                          >
                            ✗ Reject
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="empty-state">No proposals received yet</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
