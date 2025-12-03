import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getJobById } from "../../api/jobs";
import { submitProposal, getProposalsByJob, acceptProposal, rejectProposal } from "../../api/proposals";
import { AuthContext } from "../../contexts/AuthContext";
import Navbar from "../../components/Navbar";
import Toast from "../../components/Toast";
import ConfirmModal from "../../components/ConfirmModal";
import useToast from "../../hooks/useToast";
import "../../assets/styles/jobDetails.css";

export default function JobDetails() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { toasts, success, error, removeToast } = useToast();
  const [job, setJob] = useState(null);
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showProposalForm, setShowProposalForm] = useState(false);
  const [confirmModal, setConfirmModal] = useState({ isOpen: false, type: '', proposalId: null });
  const [proposalData, setProposalData] = useState({
    coverLetter: "",
    proposedAmount: "",
    estimatedDuration: "",
    skills: user?.skills?.join(", ") || "",
    proposedRating: user?.rating || "",
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
    
    if (!proposalData.coverLetter || !proposalData.proposedAmount) {
      error("Please fill in all required fields");
      return;
    }
    
    setSubmitting(true);
    try {
      await submitProposal({
        job: id,
        coverLetter: proposalData.coverLetter,
        proposedAmount: parseFloat(proposalData.proposedAmount),
        estimatedDuration: proposalData.estimatedDuration || "Not specified",
        skills: proposalData.skills ? proposalData.skills.split(",").map(s => s.trim()) : [],
        proposedRating: proposalData.proposedRating ? parseFloat(proposalData.proposedRating) : null,
      });
      
      success("Proposal submitted successfully! 🎉");
      
      // Refresh job data to show "Already Proposed" status
      await fetchJobDetails();
      setShowProposalForm(false);
      
      // Navigate after a short delay
      setTimeout(() => navigate("/my-proposals"), 2000);
    } catch (err) {
      error(err.response?.data?.message || "Failed to submit proposal");
    } finally {
      setSubmitting(false);
    }
  };

  const handleAcceptProposal = async (proposalId) => {
    setConfirmModal({ 
      isOpen: true, 
      type: 'accept', 
      proposalId,
      title: 'Accept Proposal?',
      message: 'This will create a contract and mark the job as assigned. Other proposals will be automatically rejected.'
    });
  };

  const confirmAcceptProposal = async () => {
    try {
      await acceptProposal(confirmModal.proposalId);
      success("Proposal accepted! Contract created successfully. 🎉");
      await fetchJobDetails();
      setTimeout(() => navigate("/contracts"), 1500);
    } catch (err) {
      error(err.response?.data?.message || "Failed to accept proposal");
    }
  };

  const handleRejectProposal = async (proposalId) => {
    setConfirmModal({ 
      isOpen: true, 
      type: 'reject', 
      proposalId,
      title: 'Reject Proposal?',
      message: 'Are you sure you want to reject this proposal? This action cannot be undone.'
    });
  };

  const confirmRejectProposal = async () => {
    try {
      await rejectProposal(confirmModal.proposalId);
      success("Proposal rejected successfully.");
      await fetchJobDetails();
    } catch (err) {
      error(err.response?.data?.message || "Failed to reject proposal");
    }
  };

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="job-details-container">
          <div className="loading-state">
            <div className="spinner-large"></div>
            <p>Loading job details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div>
        <Navbar />
        <div className="job-details-container">
          <div className="empty-state-card">
            <div className="empty-icon">❌</div>
            <h3>Job Not Found</h3>
            <p>This job may have been removed or doesn't exist.</p>
            <Link to="/jobs" className="btn-primary">
              Browse Jobs
            </Link>
          </div>
        </div>
      </div>
    );
  }

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
              {job.hasProposed ? (
                <div className="already-proposed-card">
                  <div className="proposed-icon">✓</div>
                  <h3>You Already Submitted a Proposal</h3>
                  <p className="proposal-status-text">
                    Status: <span className={`status-badge status-${job.proposalStatus}`}>
                      {job.proposalStatus}
                    </span>
                  </p>
                  <p>You can view your proposal details in "My Proposals" page.</p>
                  <Link to="/my-proposals" className="btn-secondary">
                    View My Proposals
                  </Link>
                </div>
              ) : !showProposalForm ? (
                <div>
                  <div className="freelancer-info-card">
                    <h3>Your Profile</h3>
                    <div className="profile-stats">
                      <div className="profile-stat">
                        <span className="stat-label">Rating:</span>
                        <span className="stat-value">⭐ {user.rating || 'N/A'}/5</span>
                      </div>
                      <div className="profile-stat">
                        <span className="stat-label">Experience:</span>
                        <span className="stat-value">{user.experienceLevel || 'Not set'}</span>
                      </div>
                      <div className="profile-stat">
                        <span className="stat-label">Skills:</span>
                        <span className="stat-value">{user.skills?.length || 0} skills</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowProposalForm(true)}
                    className="btn-submit-proposal"
                  >
                    Submit Proposal
                  </button>
                </div>
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
                    <label>Estimated Duration (e.g., 2 weeks, 1 month)</label>
                    <input
                      type="text"
                      value={proposalData.estimatedDuration}
                      onChange={(e) =>
                        setProposalData({ ...proposalData, estimatedDuration: e.target.value })
                      }
                      placeholder="How long will this take?"
                    />
                  </div>

                  <div className="form-group">
                    <label>Your Skills * (comma-separated)</label>
                    <input
                      type="text"
                      value={proposalData.skills}
                      onChange={(e) =>
                        setProposalData({ ...proposalData, skills: e.target.value })
                      }
                      placeholder="e.g., React, Node.js, MongoDB"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Your Rating (0-5)</label>
                    <input
                      type="number"
                      value={proposalData.proposedRating}
                      onChange={(e) =>
                        setProposalData({ ...proposalData, proposedRating: e.target.value })
                      }
                      min="0"
                      max="5"
                      step="0.1"
                      placeholder="Your current rating"
                    />
                  </div>

                  <div className="form-group">
                    <label>Cover Letter *</label>
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
                    <button type="submit" className="btn-primary" disabled={submitting}>
                      {submitting ? "Submitting..." : "Submit Proposal"}
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
      
      {/* Toast Notifications */}
      <div className="toast-container">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>

      {/* Confirmation Modal */}
      <ConfirmModal
        isOpen={confirmModal.isOpen}
        onClose={() => setConfirmModal({ ...confirmModal, isOpen: false })}
        onConfirm={confirmModal.type === 'accept' ? confirmAcceptProposal : confirmRejectProposal}
        title={confirmModal.title}
        message={confirmModal.message}
        confirmText={confirmModal.type === 'accept' ? 'Accept' : 'Reject'}
        type={confirmModal.type === 'accept' ? 'success' : 'danger'}
      />
    </div>
  );
}
