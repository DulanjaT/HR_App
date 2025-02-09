import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import navigate for redirection
import PropTypes from "prop-types"; // Import PropTypes
import "./NewHireForm.css";

const NewHireForm = ({ onAddEmployee }) => {
  const navigate = useNavigate(); // Initialize navigate
  const [formData, setFormData] = useState({
    name: "",
    department: "",
    salary: "",
    initialRole: "",
    location: "",
    startDate: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddEmployee(formData); // Submit form data
  };

  // Handle cancel button click
  const handleCancel = () => {
    navigate("/app/EmployeesPage"); // Redirect to EmployeePage when cancel is clicked
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="formContent">
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <label>Department:</label>
        <input
          type="text"
          name="department"
          value={formData.department}
          onChange={handleChange}
          required
        />
        <label>Salary:</label>
        <input
          type="number"
          name="salary"
          value={formData.salary}
          onChange={handleChange}
          required
        />
        <label>Initial Role:</label>
        <input
          type="text"
          name="initialRole"
          value={formData.initialRole}
          onChange={handleChange}
          required
        />
        <label>Location:</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
        />
        <label>Start Date:</label>
        <input
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
          required
        />
        <button type="submit">Save</button>
        <button type="button" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

NewHireForm.propTypes = {
  onAddEmployee: PropTypes.func.isRequired,
};

export default NewHireForm;
