import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { createJob } from "../../api/jobs";
import { AuthContext } from "../../contexts/AuthContext";
import Navbar from "../../components/Navbar";
import "../../assets/styles/form.css";

export default function CreateJob() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    jobTitle: "",
    description: "",
    budget: "",
    deadline: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await createJob({
        ...formData,
        client: user.id,
        budget: parseFloat(formData.budget),
      });
      
      alert("Job posted successfully!");
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create job");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="form-container">
        <div className="form-card">
          <h1>Post a New Job</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="jobTitle">Job Title *</label>
              <input
                type="text"
                id="jobTitle"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleChange}
                required
                placeholder="e.g., Build a responsive website"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description *</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows="6"
                placeholder="Describe the job requirements, skills needed, etc."
              />
            </div>

            <div className="form-group">
              <label htmlFor="budget">Budget ($) *</label>
              <input
                type="number"
                id="budget"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
                placeholder="Enter your budget"
              />
            </div>

            <div className="form-group">
              <label htmlFor="deadline">Deadline (Optional)</label>
              <input
                type="date"
                id="deadline"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
              />
            </div>

            {error && <p className="error-message">{error}</p>}

            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? "Posting..." : "Post Job"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
