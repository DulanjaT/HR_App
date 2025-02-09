import { useState } from "react";
import PropTypes from "prop-types"; // Import PropTypes
import "./Forms.css";

const Form = ({ role, department, salary, location, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    role: role || "",
    department: department || "",
    salary: salary || "",
    location: location || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    onSave(formData); // Pass updated data to parent
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Role:</label>
        <input name="role" value={formData.role} onChange={handleChange} />
        <label>Salary:</label>
        <input name="salary" value={formData.salary} onChange={handleChange} />
        <label>Department:</label>
        <input
          name="department"
          value={formData.department}
          onChange={handleChange}
        />
        <label>Location:</label>
        <input
          name="location"
          value={formData.location}
          onChange={handleChange}
        />
        <div className="formButtonRow">
          <button type="submit" className="button">
            Save
          </button>
          <button type="button" className="button" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

// **PropTypes Validation**
Form.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  department: PropTypes.string.isRequired,
  salary: PropTypes.number.isRequired,
  initialRole: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  location: PropTypes.string,
  startDate: PropTypes.string.isRequired, // Assuming date string format
  onSave: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default Form;
