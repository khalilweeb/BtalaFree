import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getContractById, completeContract, cancelContract } from "../../api/contracts";
import { AuthContext } from "../../contexts/AuthContext";
import Navbar from "../../components/Navbar";
import "../../assets/styles/contracts.css";

export default function ContractDetails() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [contract, setContract] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    fetchContract();
  }, [id]);

  const fetchContract = async () => {
    try {
      const data = await getContractById(id);
      setContract(data);
    } catch (error) {
      console.error("Error fetching contract:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleComplete = async () => {
    if (!window.confirm("Are you sure you want to mark this contract as completed?")) {
      return;
    }

    setActionLoading(true);
    try {
      await completeContract(id);
      alert("Contract completed successfully!");
      fetchContract();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to complete contract");
    } finally {
      setActionLoading(false);
    }
  };

  const handleCancel = async () => {
    if (!window.confirm("Are you sure you want to cancel this contract?")) {
      return;
    }

    setActionLoading(true);
    try {
      await cancelContract(id);
      alert("Contract cancelled");
      fetchContract();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to cancel contract");
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="contract-details-container">
          <div className="loading-state">
            <div className="spinner-large"></div>
            <p>Loading contract details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!contract) {
    return (
      <div>
        <Navbar />
        <div className="contract-details-container">
          <div className="empty-state-card">
            <div className="empty-icon">❌</div>
            <h3>Contract Not Found</h3>
            <p>This contract may have been removed or doesn't exist.</p>
            <Link to="/contracts" className="btn-primary">
              View All Contracts
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const isClient = contract.client._id === user.id;
  const isFreelancer = contract.freelancer._id === user.id;
  const canComplete = isClient && contract.etat === "active";
  const canCancel = (isClient || isFreelancer) && contract.etat === "active";

  return (
    <div>
      <Navbar />
      <div className="contract-details-container">
        <div className="contract-details-card">
          <div className="contract-header-detail">
            <h1>Contract Details</h1>
            <span className={`status-badge-large status-${contract.etat}`}>
              {contract.etat.toUpperCase()}
            </span>
          </div>

          <div className="contract-section">
            <h2>Job Information</h2>
            <div className="info-grid">
              <div className="info-item">
                <strong>Title:</strong>
                <p>{contract.job.jobTitle}</p>
              </div>
              <div className="info-item">
                <strong>Description:</strong>
                <p>{contract.job.description}</p>
              </div>
              <div className="info-item">
                <strong>Budget:</strong>
                <p>${contract.job.budget}</p>
              </div>
              <div className="info-item">
                <strong>Status:</strong>
                <p className={`job-status-${contract.job.status}`}>
                  {contract.job.status}
                </p>
              </div>
            </div>
          </div>

          <div className="contract-section">
            <h2>Parties Involved</h2>
            <div className="parties-grid">
              <div className="party-card">
                <h3>Client</h3>
                <p><strong>Name:</strong> {contract.client.firstName} {contract.client.lastName}</p>
                <p><strong>Email:</strong> {contract.client.email}</p>
                {contract.client.companyName && (
                  <p><strong>Company:</strong> {contract.client.companyName}</p>
                )}
              </div>

              <div className="party-card">
                <h3>Freelancer</h3>
                <p><strong>Name:</strong> {contract.freelancer.firstName} {contract.freelancer.lastName}</p>
                <p><strong>Email:</strong> {contract.freelancer.email}</p>
                {contract.freelancer.skills && contract.freelancer.skills.length > 0 && (
                  <p><strong>Skills:</strong> {contract.freelancer.skills.join(", ")}</p>
                )}
                <p><strong>Rating:</strong> ⭐ {contract.freelancer.rating}/5</p>
              </div>
            </div>
          </div>

          <div className="contract-section">
            <h2>Timeline</h2>
            <div className="timeline-info">
              <div className="timeline-item">
                <strong>Started:</strong>{" "}
                {new Date(contract.start_dt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
              {contract.end_dt && (
                <div className="timeline-item">
                  <strong>Ended:</strong>{" "}
                  {new Date(contract.end_dt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
              )}
              {!contract.end_dt && (
                <div className="timeline-item">
                  <strong>Duration:</strong>{" "}
                  {Math.floor((Date.now() - new Date(contract.start_dt)) / (1000 * 60 * 60 * 24))} days
                </div>
              )}
            </div>
          </div>

          {(canComplete || canCancel) && (
            <div className="contract-actions">
              {canComplete && (
                <button
                  onClick={handleComplete}
                  className="btn-complete"
                  disabled={actionLoading}
                >
                  {actionLoading ? "Processing..." : "Mark as Completed"}
                </button>
              )}
              {canCancel && (
                <button
                  onClick={handleCancel}
                  className="btn-cancel-contract"
                  disabled={actionLoading}
                >
                  {actionLoading ? "Processing..." : "Cancel Contract"}
                </button>
              )}
            </div>
          )}

          <button onClick={() => navigate("/contracts")} className="btn-back">
            Back to Contracts
          </button>
        </div>
      </div>
    </div>
  );
}
