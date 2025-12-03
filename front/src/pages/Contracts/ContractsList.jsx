import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getUserContracts } from "../../api/contracts";
import Navbar from "../../components/Navbar";
import "../../assets/styles/contracts.css";

export default function ContractsList() {
  const [contracts, setContracts] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContracts();
  }, []);

  const fetchContracts = async () => {
    try {
      const data = await getUserContracts();
      setContracts(data);
    } catch (error) {
      console.error("Error fetching contracts:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredContracts = contracts.filter((contract) => {
    if (filter === "all") return true;
    return contract.etat === filter;
  });

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <Navbar />
      <div className="contracts-container">
        <div className="contracts-header">
          <h1>My Contracts</h1>
          <div className="filter-buttons">
            <button
              className={filter === "all" ? "active" : ""}
              onClick={() => setFilter("all")}
            >
              All ({contracts.length})
            </button>
            <button
              className={filter === "active" ? "active" : ""}
              onClick={() => setFilter("active")}
            >
              Active ({contracts.filter((c) => c.etat === "active").length})
            </button>
            <button
              className={filter === "completed" ? "active" : ""}
              onClick={() => setFilter("completed")}
            >
              Completed ({contracts.filter((c) => c.etat === "completed").length})
            </button>
            <button
              className={filter === "cancelled" ? "active" : ""}
              onClick={() => setFilter("cancelled")}
            >
              Cancelled ({contracts.filter((c) => c.etat === "cancelled").length})
            </button>
          </div>
        </div>

        <div className="contracts-grid">
          {filteredContracts.map((contract) => (
            <div key={contract._id} className="contract-card-item">
              <div className="contract-header">
                <h3>{contract.job.jobTitle}</h3>
                <span className={`status-badge status-${contract.etat}`}>
                  {contract.etat}
                </span>
              </div>

              <div className="contract-details">
                <p>
                  <strong>Client:</strong> {contract.client.firstName}{" "}
                  {contract.client.lastName}
                </p>
                <p>
                  <strong>Freelancer:</strong> {contract.freelancer.firstName}{" "}
                  {contract.freelancer.lastName}
                </p>
                <p>
                  <strong>Budget:</strong> ${contract.job.budget}
                </p>
                <p>
                  <strong>Started:</strong>{" "}
                  {new Date(contract.start_dt).toLocaleDateString()}
                </p>
                {contract.end_dt && (
                  <p>
                    <strong>Ended:</strong>{" "}
                    {new Date(contract.end_dt).toLocaleDateString()}
                  </p>
                )}
              </div>

              <Link to={`/contracts/${contract._id}`} className="btn-view-contract">
                View Details
              </Link>
            </div>
          ))}
        </div>

        {filteredContracts.length === 0 && (
          <p className="empty-state">No contracts found for this filter</p>
        )}
      </div>
    </div>
  );
}
